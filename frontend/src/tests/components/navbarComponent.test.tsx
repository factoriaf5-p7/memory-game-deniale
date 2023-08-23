import { describe, expect,test } from 'vitest';
import { render, screen } from '@testing-library/react';
import {NavbarComponent} from '../../components/NavbarComponent';


describe('Navbar', () => {
    test('renders a Navbar', () => {
      render(<NavbarComponent/>);
       
      const modalElement = screen.getByTestId('navbar');    
      expect(modalElement).toBeInTheDocument();
     
      screen.debug()
    });
  });
