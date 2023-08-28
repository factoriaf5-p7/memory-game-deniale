interface HighScoreProps {
    bestScore: string | null;
  }
  
  export const HighScore = ({ bestScore }: HighScoreProps) => {
    return (
      <p className="text-center best-score" data-testid="best-score">Best Score: {bestScore !== null ? bestScore : '-'}
      </p>
    );
  };