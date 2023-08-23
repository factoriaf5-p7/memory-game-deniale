//animacion al darle click
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import { PrimaryButton } from "./buttons/PrimaryButton";
import { ModalEnding } from "./ModalEnding";
import Col from "react-bootstrap/Col";
import { MoveCounter } from "./cards/MoveCounter";
import { HighScore } from "./cards/HighScore";
import { useCardGameLogic } from "../hooks/useCardGameLogic";

export interface CardData {
  _id: string;
  name: string;
  url: string;
  category: string;
}

export interface Card extends CardData {
  flipped: boolean;
  matched: boolean;
}

export const CardGame = () => {
const {
    cards,
    gameOver,
    showCongratulationsModal,
    moves,
    bestScore,
    handleClick,
    restartGame,
    resetGame
  } = useCardGameLogic();


  
  return (
    <Container className="mt-4">
      <h1 className="text-center">Memory Card Game</h1>
      <PrimaryButton onClick={restartGame}>Start</PrimaryButton>
      <MoveCounter moves={moves} />
      <HighScore bestScore={bestScore} />
      <Row xs={2} md={4} className="g-4">
        {cards.map((card, index) => (
          <Col key={index}>
            <Card
              className={`game-card ${card.flipped ? "flipped" : ""}`}
              onClick={() => handleClick(index)}
            >
              <Card.Body className="d-flex justify-content-center align-items-center">
                <div
                  className={`card-content ${card.flipped ? "flipped" : ""} `}
                >
                  {card.flipped ? (
                    <Image src={card.url} className="card-image" />
                  ) : (
                    <div className="card-back">?</div>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {gameOver && (
        <div className="text-center mt-4">
          <ModalEnding show={showCongratulationsModal} onClose={() => resetGame()} />
        </div>
      )}
    </Container>
  );
};