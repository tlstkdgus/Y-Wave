import React from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
`;

const Title = styled.h1`
  color: var(--primary-green-600);
  margin-bottom: 30px;
  text-align: center;
  font-size: var(--title-h1);
  font-weight: var(--font-weight-semibold);
`;

const Content = styled.div`
  text-align: center;
  max-width: 400px;
  width: 100%;
`;

export default function Main(): React.JSX.Element {
  return (
    <PageContainer>
      <Content>
        <Title>메인 페이지</Title>
        <p className="Body__Default" style={{ color: 'var(--neutral-600)' }}>
          메인 페이지입니다.
        </p>
      </Content>
    </PageContainer>
  );
}
