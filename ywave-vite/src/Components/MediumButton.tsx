import React from "react";
import styled from "styled-components";

interface MediumButtonProps {
  buttonText: string;
  onClick: () => void;
}

const Button = styled.button`
  min-width: auto;
  min-height: auto;
  background-color: var(--primary-blue-500);
  border: none;
  border-radius: 10px;
  color: var(--neutral-100);
  cursor: pointer;
  padding: 12px 16px;
  text-align: center;
  white-space: nowrap;

  &:hover {
    background-color: var(--primary-blue-600);
  }

  &:active {
    background-color: var(--primary-blue-700);
  }
`;

export default function MediumButton({
  buttonText,
  onClick,
}: MediumButtonProps): React.JSX.Element {
  return (
    <Button className="Title__H6" onClick={onClick}>
      {buttonText}
    </Button>
  );
}
