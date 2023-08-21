import { describe, expect,test } from 'vitest';
import { render, screen } from '@testing-library/react';
import {ModalSettings} from '../../components/ModalSettings';


describe('Modal Settings', () => {
    test('renders a modal', () => {
      render(<ModalSettings/>);
       
      const modalElement = screen.getByTestId('modal-settings');    
      expect(modalElement).toBeInTheDocument();
     
      screen.debug()
    });
  });
