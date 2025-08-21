import React from "react";
import styled from "styled-components";
import TitleLogo from "../Images/TitleLogo.svg";
import { useNavigate } from "react-router-dom";
import LargeButton from "../Components/LargeButton";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  box-sizing: border-box;
  max-width: 400px;
  width: 100%;
  gap: 120px;
  cursor: default;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-l);
`;

const TitleLogoImage = styled.img`
  width: 189px;
`;

const Title = styled.div`
  color: var(--primary-blue-1000);
  text-align: center;
`;

export default function SignUpComplete(): React.JSX.Element {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <TitleContainer>
        <TitleLogoImage src={TitleLogo} alt="Title Logo" />
        <Title className="Body__XLarge">
          회원가입이 완료되었습니다! <br />
          Y:Wave가 새로운 경험을 <br />
          제공할게요!
        </Title>
      </TitleContainer>
      <LargeButton
        buttonText="로그인하기"
        onClick={() => {
          navigate("/login");
        }}
      />
    </PageContainer>
  );
}
