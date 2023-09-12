import { render, screen } from '@testing-library/react';
import { ModalEnding } from '../../components/ModalEnding';
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest';

describe('ModalEnding Component', () => {
  test('should render congratulations text', () => {
    const { getByText } = render(
      <ModalEnding show={true} onClose={jest.fn()} pairsGuessed={0} />
    );
    const congratulationsText = getByText('Congratulations, you win!');
    expect(congratulationsText).toBeInTheDocument();
  });

  test('should render close button', () => {
    const { getByText } = render(
      <ModalEnding show={true} onClose={jest.fn()} pairsGuessed={0} />
    );
    const closeButton = getByText('Close');
    expect(closeButton).toBeInTheDocument();
  });

  test('should call the onClose handler when close button is clicked', () => {
    test('should call the onClose handler when close button is clicked', () => {
      const handleClose = jest.fn();
      render(
        <ModalEnding show={true} onClose={handleClose} pairsGuessed={0} />
      );
      
      const closeButton = screen.getByRole('button', { name: /close/i });
      userEvent.click(closeButton);
  
      expect(handleClose).toHaveBeenCalled();
    });
  });
});