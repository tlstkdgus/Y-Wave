import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import LargeButton from "../Components/LargeButton";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  box-sizing: border-box;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  margin-top: 44px;
  gap: 60px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: var(--spacing-3xl);
`;

const BackIcon = styled(BiArrowBack)`
  color: var(--neutral-1000);
  width: 32px;
  height: 32px;
`;

const Title = styled.h1`
  color: var(--neutral-1000);

  & > span {
    color: var(--primary-blue-500);
  }
`;

const ButtonContainer = styled.div`
  margin: var(--spacing-3xl) 0px var(--spacing-xl) 0px;
  width: 100%;
`;

export default function CategoryResult(): React.JSX.Element {
  const navigate = useNavigate();

  const regions = ["용인시 처인구 모현읍", "창원시 마산회원구 양덕 2동"];
  const industries = ["음식점", "카페", "생활편의"];

  return (
    <PageContainer>
      <ContentContainer>
        <BackIcon onClick={() => navigate("/category/industry")} />
        <TitleContainer>
          <Title className="Title__H1">
            주로 <br />
            {regions.map((region, index) => (
              <span key={index}>
                #{region}
                <br />
              </span>
            ))}
            지역에 위치한
          </Title>
          <Title className="Title__H1">
            {industries.map((industry, index) => (
              <span key={index}>
                #{industry}
                <br />
              </span>
            ))}
            가맹점을 방문하시네요!
          </Title>
          <Title className="Title__H1">그럼 Y:Wave를 시작해볼까요?</Title>
        </TitleContainer>
      </ContentContainer>
      <ButtonContainer>
        <LargeButton buttonText="시작하기" onClick={() => navigate("/main")} />
      </ButtonContainer>
    </PageContainer>
  );
}
