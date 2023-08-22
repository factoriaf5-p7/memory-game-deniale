//opcional timer
//grid level
//logic, compair if there is a match and identify when there is only a pair missing to finish it
import { useState } from "react";
import {useGame} from "../hooks/useGame";
import {CardContainer} from "../components/cards/CardContainer";

export const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, cards, clickCard, reset, bestScore] = useGame();
  const startGame = () => {
    setGameStarted(true);
  };
  const stopGame = () => {
    setGameStarted(false);
    reset();
  };

 return (
    <div>
      <h1>Game Cards</h1>
      {/* Display game or play button */}
      {gameStarted ? (
        <>
          <div className="relative">
            <p className="score">Score: {score}</p>
          </div>
          <CardContainer
            cards={cards}
            onCardClicked={clickCard}
          />
          <div className="center">
            <button onClick={() => stopGame()}>Stop</button>
          </div>
        </>
      ) : (
        <button onClick={() => startGame()}>Play</button>
      )}
      <p className="best-score">Best score: {bestScore}</p>
    </div>
  );
};
