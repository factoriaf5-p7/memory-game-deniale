import { describe, expect,test } from 'vitest';
import { render, screen } from '@testing-library/react';
import {NavbarComponent} from '../../components/NavbarComponent';


describe('Navbar', () => {
  const mockLocalStorage: { [key: string]: string | null } = {};


  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: (key: string) => mockLocalStorage[key],
    },
    writable: true,
  });

    test('renders a Navbar', () => {
      render(<NavbarComponent/>);
       
      const navbarElement = screen.getByTestId('navbar');    
      expect(navbarElement).toBeInTheDocument();
     
      screen.debug()
    });

  test('renders a Navbar with user image and name', () => {
    // Set mock values for user data
    mockLocalStorage['userName'] = 'John';
    mockLocalStorage['userImage'] = 'mock_image_url';
  
    render(<NavbarComponent />);
  
    // Verify the presence of user image and name
    const userImage = screen.getByAltText('User');
    const userName = screen.getByText('John');
  
    expect(userImage).toBeInTheDocument();
    expect(userName).toBeInTheDocument();
  
    screen.debug();
  });
  
  test('renders a Navbar without user image and name', () => {
    mockLocalStorage['userName'] = null;
    mockLocalStorage['userImage'] = null;
    render(<NavbarComponent />);
    const userImage = screen.queryByAltText('User');
    const userName = screen.queryByText('John');
    expect(userImage).not.toBeInTheDocument();
    expect(userName).not.toBeInTheDocument();
    screen.debug();
  });
}); 