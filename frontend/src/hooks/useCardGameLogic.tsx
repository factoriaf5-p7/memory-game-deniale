import axios from "axios";
import { useState, useEffect } from "react";
import { Card, CardData } from "../components/CardGame";
import { useLocalStorage } from "./useLocalStorage";

export const useCardGameLogic = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [showCongratulationsModal, setShowCongratulationsModal] =
    useState(false);
  const [bestScore, setBestScore] = useLocalStorage("best-score");
  const [pairsFound, setPairsFound] = useState(0);
  const [currentTheme, setCurrentTheme] = useState<string>("superhero");
  const [currentDifficulty, setCurrentDifficulty] = useState<string>("easy");

  const difficultyLevels = [
    { level: "easy", pairs: 6 },
    { level: "medium", pairs: 9 },
    { level: "hard", pairs: 12 },
  ];
  const themeOptions = ["superhero", "programming"];

  const duplicateCards = (array: CardData[]) => {
    return array.flatMap((card) => [
      { ...card, _id: card._id + "-original", flipped: false, matched: false },
      { ...card, _id: card._id + "-copy", flipped: false, matched: false },
    ]);
  };

  /********SHUFFLING CARDS *********/

  const shuffleCards = (array: Card[]) => {
    const shuffledArray = [...array];
    let currentIndex = shuffledArray.length,
      temporaryValue,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      temporaryValue = shuffledArray[currentIndex];
      shuffledArray[currentIndex] = shuffledArray[randomIndex];
      shuffledArray[randomIndex] = temporaryValue;
    }

    return shuffledArray;
  };

  /********STARTING NEW GAME*********/

  const startNewGame = (difficulty: string) => {
    const selectedDifficulty = difficultyLevels.find(
      (level) => level.level === difficulty
    );

    if (selectedDifficulty) {
      const selectedPairs = selectedDifficulty.pairs;

      axios
        .get(`http://localhost:3000/game?category=${currentTheme}`)
        .then((response) => {
          const fetchedCards: Card[] = response.data;
          const shuffledFetchedCards = shuffleCards(fetchedCards);
          const duplicatedCards = duplicateCards(shuffledFetchedCards).slice(
            0,
            selectedPairs * 2
          );
          const shuffledAndDuplicatedCards = shuffleCards(duplicatedCards);
          setCards(shuffledAndDuplicatedCards);
        });
    }

    setFlippedCards([]);
    setGameOver(false);
  };

  /********RESET GAME AT THE END*********/

  const resetGame = () => {
    const shuffledAndDuplicatedCards = shuffleCards(cards).map((card) => ({
      ...card,
      flipped: false,
      matched: false,
    }));
    setCards(shuffledAndDuplicatedCards);
    setFlippedCards([]);
    setGameOver(false);
  };

  /******** HANDLE CARD CLICK *********/

  const handleClick = (index: number) => {
    if (flippedCards.length < 2 && !cards[index].matched) {
      const updatedCards = cards.map((card, i) => {
        if (i === index) {
          return { ...card, flipped: true };
        }
        return card;
      });

      setCards(updatedCards);

      const updatedFlippedCards = [...flippedCards, index];
      setFlippedCards(updatedFlippedCards);

      if (updatedFlippedCards.length === 2) {
        setTimeout(() => {
          checkMatch(updatedFlippedCards);
        }, 750);
      }
    }
  };

  /********SAVING BEST SCORE*********/

  const handleBestScore = (pairsGuessed: number) => {
    if (pairsGuessed > Number(bestScore)) {
      setBestScore(pairsGuessed.toString());
      localStorage.setItem("best-score", pairsGuessed.toString());
    }
  };

  /********COMPARE CARDS *********/

  const checkMatch = (flippedCards: number[]) => {
    const [firstIndex, secondIndex] = flippedCards;
    const firstCardName = cards[firstIndex].name;
    const secondCardName = cards[secondIndex].name;

    if (firstCardName === secondCardName) {
      const updatedCards = cards.map((card, index) => {
        if (index === firstIndex || index === secondIndex) {
          return { ...card, matched: true, flipped: true };
        }
        return card;
      });

      setCards(updatedCards);

      setFlippedCards([]);
      const newPairsFound =
        updatedCards.filter((card) => card.matched).length / 2;
      setPairsFound(newPairsFound);

      if (newPairsFound === cards.length / 2 - 1) {
        setGameOver(true);
        setShowCongratulationsModal(true);

        if (newPairsFound + 1 > Number(bestScore)) {
          handleBestScore(newPairsFound + 1);
        }
      }
    } else {
      const updatedCards = cards.map((card, index) => {
        if (index === firstIndex || index === secondIndex) {
          return { ...card, flipped: false };
        }
        return card;
      });

      setCards(updatedCards);
      setFlippedCards([]);
    }
  };
  useEffect(() => {
    startNewGame(currentDifficulty);
  }, [currentTheme, currentDifficulty]);

  return {
    cards,
    flippedCards,
    gameOver,
    showCongratulationsModal,
    bestScore,
    currentTheme,
    setCurrentTheme,
    currentDifficulty,
    setCurrentDifficulty,
    handleClick,
    resetGame,
    themeOptions,
    difficultyLevels,
    restartGame: startNewGame,
  };
};
