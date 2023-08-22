import React from 'react';
import { Button } from 'react-bootstrap';

interface ButtonProps {
  children: string;
}

export const PrimaryButton: React.FC<ButtonProps> = ({ children }) => {
  return (
    <Button variant="primary">
      {children}
    </Button>
  );
};
