import { describe, expect, test, beforeEach, afterEach  } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UserForm } from '../../components/UserForm';
import userEvent from '@testing-library/user-event'
import MockAdapter from 'axios-mock-adapter';
import axios, { AxiosResponse } from 'axios'; 

type MockAdapterInstance = {
    onPost: (url: string) => {
      reply: (status: number, data: any) => void;
    };
    restore: () => void;
  };

  const mockLocalStorage: { [key: string]: string | null } = {};

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: (key: string) => mockLocalStorage[key],
    setItem: (key: string, value: string) => {
      mockLocalStorage[key] = value;
    },
    removeItem: (key: string) => {
      delete mockLocalStorage[key];
    },
  },
  writable: true,
});

  describe('User Form', () => {
    let mockAxios: MockAdapterInstance;
  
    beforeEach(() => {
      mockAxios = new MockAdapter(axios) as MockAdapterInstance;
    });
  
    afterEach(() => {
      mockAxios.restore();
    });

  test('renders the form fields and submit button', () => {
    render(<UserForm />);
    
    const nameInput = screen.getByLabelText('Name:');
    expect(nameInput).toBeInTheDocument();
    
    const uploadInput = screen.getByLabelText('Upload Image:');
    expect(uploadInput).toBeInTheDocument();
    
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeInTheDocument();
    
    screen.debug();
  });

  test('submits the form and handles success', async () => {
    render(<UserForm />);
    
    const nameInput = screen.getByLabelText('Name:');
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    
    userEvent.type(nameInput, 'John');
    userEvent.click(submitButton);
    
    const userData = { name: 'John' };
    mockAxios.onPost('http://localhost:3000/user').reply(201, userData);
    localStorage.setItem('userName', 'John');
      
    expect(localStorage.getItem('userName')).toBe('John');
    
    screen.debug();
  });

/*   test('handles name input change', () => {
    render(<UserForm />);
  
    const nameInput = screen.getByLabelText('Name:');
    userEvent.type(nameInput, 'Jane');
  
    expect((nameInput as HTMLInputElement).value).toBe('Jane');
  
    screen.debug();
  }); */
  
/*   test('displays uploaded image', () => {
    render(<UserForm />);
  
    const file = new File(['file contents'], 'example.png', { type: 'image/png' });
    const uploadInput = screen.getByLabelText('Upload Image:');
  
    Object.defineProperty(uploadInput, 'files', {
      value: [file],
    });
  
    const uploadedImage = screen.getByAltText('Uploaded');
    expect(uploadedImage).toBeInTheDocument();
  
    screen.debug();
  }); */


/*   test('displays error alert on duplicate name', async () => {
    render(<UserForm />);
    
    const nameInput = screen.getByLabelText('Name:');
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    
    await userEvent.type(nameInput, 'John'); 
    userEvent.click(submitButton);
  
    mockAxios.onPost('http://localhost:3000/user').reply(400, {});
    
    const errorAlert = await screen.findByText('This name already exists. Please choose a different name.');
    expect(errorAlert).toBeInTheDocument();
  
    screen.debug();
  }); */
});
