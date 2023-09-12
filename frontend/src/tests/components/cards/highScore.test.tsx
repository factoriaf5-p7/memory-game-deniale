import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HighScore } from '../../../components/cards/HighScore';

describe('Best score component', () => {
  test('renders "-" when bestScore is null', () => {
    const providedBestScore = null; // Change this to null
    render(<HighScore bestScore={providedBestScore} />);
    
    const bestScoreElement = screen.getByTestId('best-score') as HTMLElement;
    expect(bestScoreElement.textContent).toBe('Best Score: -');
    
    screen.debug();
  });

  test('renders the provided bestScore when not null', () => {
    const providedBestScore = '42';
    render(<HighScore bestScore={providedBestScore} />);

    const bestScoreElement = screen.getByTestId('best-score') as HTMLElement;
    expect(bestScoreElement.textContent).toBe(`Best Score: ${providedBestScore}`);
    
    screen.debug();
  });
});