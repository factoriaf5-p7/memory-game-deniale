interface PairsCounterProps {
    pairsGuessed: number;
  }
  
 export const PairsCounter = ({ pairsGuessed }:  PairsCounterProps) => {
    return <p className="text-center" data-testid="moves">Pairs: {pairsGuessed}</p>;
  };
  