import { describe, expect,test } from 'vitest';
import { render, screen } from '@testing-library/react';
import {ModalAvatar} from '../../components/ModalAvatar';


describe('Modal Avatar', () => {
    test('renders a modal', () => {
      render(<ModalAvatar/>);
       
      const modalElement = screen.getByTestId('modal-avatar');    
      expect(modalElement).toBeInTheDocument();
     
      screen.debug()
    });
  });
