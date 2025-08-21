import React from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

interface DeleteTagProps {
  content: React.ReactElement;
  color: string;
  isFix?: boolean;
  onClick: () => void;
}

const Tag = styled.div<{ color: string; isFix: boolean }>`
  width: ${(props) => (props.isFix ? "auto" : "100%")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(props) => props.color};
  border: 1px solid ${(props) => props.color};
  border-radius: 10px;
  padding: 12px 16px;
  white-space: nowrap;
  gap: 5px;
`;

const DeleteIcon = styled(AiOutlineClose)`
  width: 12px;
  height: 12px;
  cursor: pointer;
`;

export default function DeleteTag({
  content,
  color,
  isFix = false,
  onClick,
}: DeleteTagProps): React.JSX.Element {
  return (
    <Tag color={color} isFix={isFix}>
      <div className="Body__Small">{content}</div>
      <DeleteIcon onClick={onClick} />
    </Tag>
  );
}
