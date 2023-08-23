import { describe, expect,test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import {PrimaryButton} from '../../../components/buttons/PrimaryButton'


describe('Primary button', () => {
    test('renders a button which has a children text and an onClick function', () => {
      const onClickMock = jest.fn(); 
      render(<PrimaryButton onClick={onClickMock}> Reset</PrimaryButton>);
      const buttonElement = screen.getByRole('button', { name: 'Reset' })
      expect(buttonElement).toBeInTheDocument();
      fireEvent.click(buttonElement);
      expect(onClickMock).toHaveBeenCalled();
      screen.debug()
    });
    
  });
