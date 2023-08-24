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
/*   const [moves, setMoves] = useState(0);
 */  const [bestScore, setBestScore] = useLocalStorage("best-score");

  /********DUPLICATING CARDS *********/

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

  const startNewGame = (theme:string) => {
    axios.get(`http://localhost:3000/game?category=${theme}`).then((response) => {
      const fetchedCards: CardData[] = response.data;
      const duplicatedCards = duplicateCards(fetchedCards);
      const shuffledAndDuplicatedCards = shuffleCards(duplicatedCards);
      setCards(shuffledAndDuplicatedCards);
    });

    setFlippedCards([]);
    setGameOver(false);
/*     setMoves(0);
 */
  };

  useEffect(() => {
    startNewGame('programming'); // Automatically start a new game when the component mounts
  }, []);

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
/*     setMoves(0);
 */  };
  
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
/*         setMoves((prevMoves) => prevMoves + 1);
 */        setTimeout(() => {
          checkMatch(updatedFlippedCards);
        }, 750);
      } }     
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

      if (updatedCards.every((card) => card.matched)) {
        setGameOver(true);
        setShowCongratulationsModal(true);
        handleBestScore(updatedCards.length / 2);
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

  return {
    cards,
    flippedCards,
    gameOver,
    showCongratulationsModal,
/*     moves,
 */    bestScore,
    handleClick,
    resetGame,
    restartGame: startNewGame,
  };
};
