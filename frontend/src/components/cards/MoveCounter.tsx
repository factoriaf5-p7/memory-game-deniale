interface MoveCounterProps {
    moves: number;
  }
  
 export const MoveCounter = ({ moves }:  MoveCounterProps) => {
    return <p className="text-center">Moves: {moves}</p>;
  };
  