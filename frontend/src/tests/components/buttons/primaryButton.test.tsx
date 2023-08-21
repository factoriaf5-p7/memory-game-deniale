import { describe, expect,test } from 'vitest';
import { render, screen } from '@testing-library/react';
import {PrimaryButton} from '../../../components/buttons/PrimaryButton'


describe('Theme button', () => {
    test('renders a button', () => {
      render(<PrimaryButton/>);
  
      
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
      screen.debug()
    });
  });
