import { describe, expect,test } from 'vitest';
import { render, screen } from '@testing-library/react';
import {ThemeButton} from '../../../components/buttons/ThemeButton'


describe('Theme button', () => {
    test('renders a button', () => {
      render(<ThemeButton/>);
  
      
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
      screen.debug()
    });
  });


