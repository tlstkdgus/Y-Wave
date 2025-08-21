import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Navigation from "../Components/Navigation";

interface MobileProps {
  children: React.ReactNode;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100svh;
  background-color: #f5f5f5;
  padding: env(safe-area-inset-top) 0 env(safe-area-inset-bottom) 0;
  overflow-y: hidden;
`;

const Content = styled.div`
  width: 100%;
  max-width: 375px;
  min-width: 320px;
  height: 100svh;
  min-height: 100svh;
  max-height: 100svh;
  margin: 0 auto;
  background-color: var(--neutral-100);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  box-shadow: none;
  border-radius: 0;

  &::-webkit-scrollbar { display: none; }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (min-width: 1024px) {
    height: auto;
    min-height: calc(100vh - 40px);
    max-height: calc(100vh - 40px);
    overflow-y: auto;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
  }
`;

const Contents = styled.main`
  display: flex;
  flex-direction: column;   
  flex: 1 1 auto;
  width: 100%;
  overflow: visible;
  outline: none;
  padding: 0;
`;

export default function Mobile({ children }: MobileProps): React.JSX.Element {
  const location = useLocation();
  const currentPath = location.pathname;
  const noNavigationPath = ["/login", "/signup", "/category"];
  const showNavigation = !(currentPath === "/" || noNavigationPath.some(prefix => currentPath.startsWith(prefix)));

  return (
    <Container>
      <Content>
        <Contents 
          id="main-content" 
          tabIndex={-1}
          role="main"
          aria-label="메인 콘텐츠"
        >
          {children}
        </Contents>
        {showNavigation && <Navigation />}
      </Content>
    </Container>
  );
}
