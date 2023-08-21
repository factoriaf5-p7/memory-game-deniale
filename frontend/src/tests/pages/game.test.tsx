import { describe, it, } from 'vitest';
import {Game} from '../../pages/Game'
import { render, screen } from '@testing-library/react';


describe('Game', () => {
  it('renders game cards', () => {
    render(<Game/>);
    const cardComponent = screen.getByTestId('card'); 
    expect(cardComponent).toBeInTheDocument();
    screen.debug();

  });
});