import React, { ReactNode } from 'react';
import './styles.scss';

type ButtonPropsType = {
  type: 'button' | 'submit' | 'reset' | undefined;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: ReactNode;
};

export default function CustomButton({
  type = 'button',
  onClick,
  children,
}: ButtonPropsType) {
  return (
    <button type={type} className="CustomButton" onClick={onClick}>
      {children}
    </button>
  );
}
