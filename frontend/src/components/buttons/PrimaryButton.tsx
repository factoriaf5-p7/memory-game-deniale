import React from 'react';
import { Button } from 'react-bootstrap';

interface ButtonProps {
  children: string;
  onClick?: () => void;
}

export const PrimaryButton: React.FC<ButtonProps> = ({ children,onClick }) => {
  return (
    <Button variant="primary" className="button " onClick={onClick}>
      {children}
    </Button>
  );
};
