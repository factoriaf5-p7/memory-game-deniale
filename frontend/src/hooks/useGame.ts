import { useEffect, useState } from "react";
import { CardType } from "../components/cards/CardGame";
import {useLocalStorage} from "./useLocalStorage";
import axios from "axios";
import arrayShuffle from 'array-shuffle'


type useGameType = [
  number,
  CardType[],
  (index: number) => void,
  () => void,
  number
];


/**
 * Get score, cards, bestScore, click card
 */
export const useGame = function (): useGameType {
  // States
  const [cardsClicked, setCardsClicked] = useState([] as number[]);
  const [score, setScore] = useState(0);
  const [games, setGames] = useState<CardType[]>([]);
  const [bestScore, setBestScore] = useLocalStorage("best-score");

  

  useEffect(() => {
    axios
      .get("http://localhost:3000/game")
      .then((response) => {
        const fetchedGames = response.data;
        const duplicatedGames = [...fetchedGames, ...fetchedGames]
            .map((card)=> ({...card, index : Math.random() })) //;
        const shuffledGames = arrayShuffle(duplicatedGames);
        setGames(shuffledGames );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  

  /**
   * This function returns the cards in a random order
   */


  const clickCard = function (index: number) {
    if (cardsClicked.includes(index)) {
      reset();
      return;
    }
    setCardsClicked((prev) => [...prev, index]);
    setScore((prev) => prev + 1);
   
  };

  const reset = () => {
    if (score > Number(bestScore)) {
      setBestScore(`${score}`);
    }
    setScore(0);
    setCardsClicked([]);
    
  };

  return [score, games, clickCard, reset, Number(bestScore)];
};
