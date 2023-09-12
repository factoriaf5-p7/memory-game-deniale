import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PairsCounter } from '../../../components/cards/PairsCounter'; 

describe('Pairs counter component', () => {
  test('renders how many times a pair is guessed', () => {
    const providedPairsGuessed = 5; 
    render(<PairsCounter pairsGuessed={providedPairsGuessed} />);
    
    const pairsCounterElement = screen.getByTestId('moves') as HTMLElement; 
    expect(pairsCounterElement.textContent).toBe('Pairs: 5'); 
    
    screen.debug();
  });
});