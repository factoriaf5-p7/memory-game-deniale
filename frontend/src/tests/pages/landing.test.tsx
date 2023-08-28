import { describe, it, } from 'vitest';
import {Landing} from '../../pages/Landing'
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import { expect } from 'vitest';

describe('Landing', () => {
  it('renders the landing button', () => {
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );

    const buttons = screen.getAllByRole('button');
    const goToGameButton = buttons.find(button => button.textContent === 'Go to Game');
    expect(goToGameButton).toBeInTheDocument();
    screen.debug();
  });

  it('renders the landing form', () => {
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );
    const formComponent = screen.getByTestId('form');
    expect(formComponent).toBeInTheDocument();
    screen.debug();
  });

  it('renders the hero image', () => {
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );

    const heroImage = screen.getByTestId('hero-image');
    expect(heroImage).toBeInTheDocument();
    screen.debug();
  });
});