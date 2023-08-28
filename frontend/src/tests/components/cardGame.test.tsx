import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import {CardGame} from '../../components/CardGame';
import userEvent from '@testing-library/user-event'

describe('Card Game', () => {
    test('renders a card', () => {
      render(<CardGame/>);
       
      const cardElement = screen.getByTestId('card');    
      expect(cardElement).toBeInTheDocument();
     
      screen.debug()
    });

    test('renders the theme and difficulty dropdowns', () => {
      render(<CardGame />);
    
      const themeDropdown = screen.getByRole('button', { name: /Theme:/i });
      expect(themeDropdown).toBeInTheDocument();
  
      const difficultyDropdown = screen.getByRole('button', { name: /Difficulty:/i });
      expect(difficultyDropdown).toBeInTheDocument();
  
      screen.debug();
    });
    test('handles card clicks and updates game state', () => {
      render(<CardGame />);
      
      const cardElement = screen.getByTestId('card');
      expect(cardElement).toBeInTheDocument();
      
      userEvent.click(cardElement); 
    });
    
    test('resets the game state when Reset button is clicked', () => {
      render(<CardGame />);
      
      const resetButton = screen.getByText('Reset');
      expect(resetButton).toBeInTheDocument();
      
      userEvent.click(resetButton); 
  });
 test('handles theme change through dropdown', () => {
    render(<CardGame />);
  
    const themeDropdown = screen.getByRole('button', { name: /Theme:/i });
    userEvent.click(themeDropdown);

    const themeOption = screen.getByText((content, element) =>
      content.startsWith('Theme:') && element.tagName.toLowerCase() === 'button'
    );
    userEvent.click(themeOption);

  });

  test('handles difficulty change through dropdown', () => {
    render(<CardGame />);
  
    const difficultyDropdown = screen.getByRole('button', { name: /Difficulty:/i });
    userEvent.click(difficultyDropdown);

    const difficultyOption = screen.getByText((content, element) =>
      content.startsWith('Difficulty:') && element.tagName.toLowerCase() === 'button'
    );
    userEvent.click(difficultyOption);

  });
});