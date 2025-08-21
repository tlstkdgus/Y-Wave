import React from "react";
import styled from "styled-components";

interface PublicInputProps {
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input = styled.input`
  width: 100%;
  min-width: 200px;
  height: 44px;
  border: 1px solid var(--neutral-200);
  border-radius: 10px;
  color: var(--neutral-500);
  cursor: pointer;
  padding: 12px;

  &:hover {
    border-color: var(--neutral-500);
  }

  &:active {
    border-color: var(--neutral-500);
  }

  &:complete {
    border-color: var(--neutral-1000);
    color: var(--neutral-1000);
  }

  &:disabled {
    background-color: var(--neutral-200);
    color: var(--neutral-500);
    cursor: default;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    height: 42px;
    min-width: 180px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
    height: 40px;
    min-width: 160px;
  }
`;

export default function PublicInput({
  type,
  id,
  value,
  onChange,
  placeholder,
}: PublicInputProps): React.JSX.Element {
  return (
    <Input
      className="Body__Default"
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
