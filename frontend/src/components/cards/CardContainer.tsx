import { CardGame, CardType } from "./CardGame";

type CardsContainerProps = {
    cards: CardType[];
    onCardClicked: (index: number) => void;
  };

  export const CardContainer = ({ cards, onCardClicked }: CardsContainerProps) => (
    <div className="cards-container">
      {cards.map((card) => (
        <CardGame
          onCardClicked={onCardClicked}
          card={card}
        />
      ))}
    </div>
  );