//animacion al darle click
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import { PrimaryButton } from "./buttons/PrimaryButton";
import { ModalEnding } from "./ModalEnding";
import Col from "react-bootstrap/Col";
import { PairsCounter } from "./cards/PairsCounter";
import { HighScore } from "./cards/HighScore";
import { useCardGameLogic } from "../hooks/useCardGameLogic";
import "../styles/CardGame.css"

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
/*     moves,
 */    bestScore,
    handleClick,
    restartGame,
    resetGame
  } = useCardGameLogic();

  const pairsGuessed = cards.filter((card) => card.matched).length / 2;
  
  return (
    <Container className="mt-4" style={({marginBottom: "4rem"})}>
      <h1 className="text-center">Memory Card Game</h1>
      <PrimaryButton onClick={resetGame}>Reset</PrimaryButton>
      <Row className="justify-content-around custom-row mt-4 mb-4" >
        <Col sm={4} md={6} >
          <PairsCounter pairsGuessed={pairsGuessed} />
        </Col>
        <Col sm={4} md={6}>
          <HighScore bestScore={bestScore} />
        </Col>
      </Row>
      <Row sm={3} md={4} lg={6} className="g-4" data-testid="card">
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
                    <Image src="https://res.cloudinary.com/dqlu4lleo/image/upload/v1692801956/superhero-game/zyxcxdkdmiixeydwlpf1.png" alt="Memory icon by Icons8

                    "className="card-back"/>
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