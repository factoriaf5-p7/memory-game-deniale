import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MoveCounter } from '../../../components/cards/PairsCounter';

describe('Moves counter component', () => {
  test('renders how many times a pair is guessed', () => {
    const providedBestScore = 5; 
    render(<MoveCounter moves={providedBestScore} />);
    
    const bestScoreElement = screen.getByTestId('moves') as HTMLElement;
    expect(bestScoreElement.textContent).toBe('Moves: 5');
    
    screen.debug();
  });


});