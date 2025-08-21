import React from "react";
import styled from "styled-components";

interface LargeButtonProps {
  buttonText: string;
  onClick: () => void;
}

const Button = styled.button`
  width: 100%;
  min-width: 200px;
  min-height: auto;
  background-color: var(--primary-blue-500);
  border: none;
  border-radius: 10px;
  color: var(--neutral-100);
  cursor: pointer;
  padding: 12px 0px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background-color: var(--primary-blue-600);
  }

  &:active {
    background-color: var(--primary-blue-700);
  }

  @media (max-width: 768px) {
    font-size: 16px;
    height: 47px;
    min-width: 180px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    height: 45px;
    min-width: 160px;
  }
`;

export default function LargeButton({
  buttonText,
  onClick,
}: LargeButtonProps): React.JSX.Element {
  return (
    <Button className="Title__H4" onClick={onClick}>
      {buttonText}
    </Button>
  );
}
