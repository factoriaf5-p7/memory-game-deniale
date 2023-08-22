import { fireEvent, render } from '@testing-library/react';
import { ModalEnding } from '../../components/ModalEnding';
import { beforeEach, describe, expect, it, vi } from 'vitest'


describe('ModalEnding Component', () => {
    it('should render congratulations text', () => {
      const { getByText } = render(<ModalEnding show={true} onClose={jest.fn()} />);
      const congratulationsText = getByText('Congratulations, you win!');
      expect(congratulationsText).toBeInTheDocument();
    });
  
    it('should render close button', () => {
      const { getByText } = render(<ModalEnding show={true} onClose={jest.fn()} />);
      const closeButton = getByText('Close');
      expect(closeButton).toBeInTheDocument();
    });
  
    it('should call the onClose handler when close button is clicked', () => {
      const handleClose = jest.fn();
      const { getByText } = render(<ModalEnding show={true} onClose={handleClose} />);
      const closeButton = getByText('Close');
  
      fireEvent.click(closeButton);
      expect(handleClose).toHaveBeenCalled();
    });
  });