import { Col, Row } from "react-bootstrap";
import { CardGame, CardType } from "./CardGame";

type CardsContainerProps = {
    cards: CardType[];
    onCardClicked: (index: number) => void;
  };

  export const CardContainer = ({ cards, onCardClicked }: CardsContainerProps) => (
            
    <Row xs={1} md={6} className="g-4">
      {cards.map((card) => (
        <Col key={card.index}>
                <CardGame
                onCardClicked={onCardClicked}
                card={card}
                />
        </Col>
      ))}
    </Row>
  );