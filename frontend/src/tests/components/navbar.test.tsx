import { describe, expect,test } from 'vitest';
import { render, screen } from '@testing-library/react';
import {Navbar} from '../../components/NavbarComponent';


describe('Navbar', () => {
    test('renders a Navbar', () => {
      render(<Navbar/>);
       
      const modalElement = screen.getByTestId('navbar');    
      expect(modalElement).toBeInTheDocument();
     
      screen.debug()
    });
  });
