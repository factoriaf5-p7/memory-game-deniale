import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import {CardGame} from '../../components/CardGame';



describe('Card Game', () => {
    test('renders a card', () => {
      render(<CardGame/>);
       
      const cardElement = screen.getByTestId('card');    
      expect(cardElement).toBeInTheDocument();
     
      screen.debug()
    });

    test('Fetch the images array', () => {
      render(<CardGame/>);
       
      const cardElement = screen.getByTestId('card');    
      expect(cardElement).toBeInTheDocument();
     
      screen.debug()
    });

    test('handles card clicks and updates game state', () => {
      render(<CardGame />);
      
      const cardElement = screen.getByTestId('card');
      expect(cardElement).toBeInTheDocument();
      
      fireEvent.click(cardElement); // Click on a card
      // Assert that the game state has been updated as expected
    });
    
    test('resets the game state when Reset button is clicked', () => {
      render(<CardGame />);
      
      const resetButton = screen.getByText('Reset');
      expect(resetButton).toBeInTheDocument();
      
      fireEvent.click(resetButton); // Click the Reset button
      // Assert that the game state has been properly reset
  });
})