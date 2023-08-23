import { describe, expect,test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Game } from '../../pages/Game';

describe('Game Component', () => {
  test('renders a button Reset ', () => {
    render(<Game />);
    const buttonElement = screen.getByRole('button', { name: 'Reset' });
    expect(buttonElement).toBeInTheDocument();
    screen.debug();
  });

  test('renders a card', () => {
    render(<Game />);

    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
    screen.debug();
    })

    test('renders a moves counter', () => {
      render(<Game />);
      const movesCounter = screen.getByTestId('moves');
      expect(movesCounter).toBeInTheDocument();
      screen.debug();
    })
    test('renders a high score', () => {
      render(<Game />);
      const bestScore = screen.getByTestId('best-score');
      expect(bestScore).toBeInTheDocument();
      screen.debug();
    })
  });

