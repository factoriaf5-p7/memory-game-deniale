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
import Dropdown from "react-bootstrap/Dropdown";

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
    bestScore,
    handleClick,
    resetGame,
    currentTheme,
    setCurrentTheme,
    currentDifficulty,
    setCurrentDifficulty,
    restartGame,
    themeOptions,
    difficultyLevels,
  } = useCardGameLogic();

  const pairsGuessed = cards.filter((card) => card.matched).length / 2;

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
    restartGame(theme);
  };

  const handleDifficultyChange = (difficulty: string) => {
    setCurrentDifficulty(difficulty);
    restartGame(difficulty);
  };
  return (
    <Container className="mt-4" style={({marginBottom: "4rem"})}>
     
     <Row className="justify-content-between align-items-center mb-4">
        <Col sm={12} md={6} lg={4} className="text-start mb-2 mb-md-0">
          <PrimaryButton onClick={resetGame}>Reset</PrimaryButton>
        </Col>
        <Col sm={12} md={6} lg={4} className="d-flex justify-content-center">
          <Dropdown>
            <Dropdown.Toggle  style={({backgroundColor: "var(--bs-warning)", borderColor:"var(--bs-warning)"})} id="dropdown-theme">
              Theme: {currentTheme}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {themeOptions.map((theme) => (
                <Dropdown.Item key={theme} onClick={() => handleThemeChange(theme)}>
                  {theme}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="ms-3">
            <Dropdown.Toggle style={({backgroundColor: "var(--bs-warning)", borderColor:"var(--bs-warning)"})} id="dropdown-difficulty">
              Difficulty: {currentDifficulty}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {difficultyLevels.map((level) => (
                <Dropdown.Item key={level.level} onClick={() => handleDifficultyChange(level.level)}>
                  {level.level}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
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
          <ModalEnding show={showCongratulationsModal}pairsGuessed={pairsGuessed} onClose={() => resetGame()} />
        </div>
      )} <div className="text-center mt-4">
   
    </div>
    </Container>
  );
};