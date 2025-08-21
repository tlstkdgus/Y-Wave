import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BiHomeAlt, BiMap, BiBookmark, BiUser } from "react-icons/bi";

const NavigationContainer = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--neutral-200);
  background-color: var(--neutral-100);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

const NavigationItem = styled.div<{ isActive: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--neutral-300);
  gap: var(--spacing-2xs);
  padding: 11.5px 0;
  cursor: pointer;

  &:hover {
    color: var(--primary-blue-600);
    background-color: var(--primary-blue-alpha-10);
  }

  &:active {
    color: var(--primary-blue-700);
    background-color: var(--primary-blue-alpha-10);
  }

  ${(props) =>
    props.isActive &&
    `
    color: var(--primary-blue-500);
  `}
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    width: 24px;
    height: 24px;
  }
`;

export default function Navigation(): React.JSX.Element {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const isActive = (path: string) => {
    return currentPath.startsWith(path);
  };

  return (
    <NavigationContainer>
      <NavigationItem
        isActive={isActive("/main")}
        onClick={() => navigate("/main")}
      >
        <IconWrapper>
          <BiHomeAlt />
        </IconWrapper>
        <div className="Body__MediumSmall">홈</div>
      </NavigationItem>
      <NavigationItem
        isActive={isActive("/map")}
        onClick={() => navigate("/map")}
      >
        <IconWrapper>
          <BiMap />
        </IconWrapper>
        <div className="Body__MediumSmall">지도</div>
      </NavigationItem>
      <NavigationItem
        isActive={isActive("/bookmark")}
        onClick={() => navigate("/bookmark")}
      >
        <IconWrapper>
          <BiBookmark />
        </IconWrapper>
        <div className="Body__MediumSmall">즐겨찾기</div>
      </NavigationItem>
      <NavigationItem
        isActive={isActive("/mypage")}
        onClick={() => navigate("/mypage")}
      >
        <IconWrapper>
          <BiUser />
        </IconWrapper>
        <div className="Body__MediumSmall">마이페이지</div>
      </NavigationItem>
    </NavigationContainer>
  );
}
