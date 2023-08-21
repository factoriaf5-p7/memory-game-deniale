import { describe, it, } from 'vitest';
import {Landing} from '../../pages/Landing'
import { render, screen } from '@testing-library/react';


describe('Landing', () => {
  it('renders the landing button', () => {
    render(<Landing/>);
    const buttonComponent = screen.getByRole('button'); 
    expect(buttonComponent).toBeInTheDocument();
    screen.debug();

  });
  
  it('renders the landing form', () => {
    render(<Landing/>);
    const formComponent = screen.getByTestId('form'); 
    expect(formComponent).toBeInTheDocument();
    screen.debug();

  });
});