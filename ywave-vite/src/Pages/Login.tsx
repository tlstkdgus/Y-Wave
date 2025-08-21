import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PublicInput from "../Components/PublicInput";
import LargeButton from "../Components/LargeButton";
import TitleLogo from "../Images/TitleLogo.svg";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  box-sizing: border-box;
  max-width: 400px;
  width: 100%;
  gap: var(--spacing-4xl);
  color: var(--primary-blue-1000);
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
  text-align: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: var(--spacing-xl);
`;

const InputRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: var(--spacing-xs);
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xl);
  width: 100%;
`;

const SignUpContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-s);
`;

const SignUp = styled.a`
  color: var(--primary-blue-500);
  cursor: pointer;
`;

export default function Login(): React.JSX.Element {
  const navigate = useNavigate();
  const [idInput, setIdInput] = useState<string>("");
  const [pwInput, setPwInput] = useState<string>("");

  const handleLogin = (): void => {
    // navigate("/main");
    navigate("/category/region");
  };

  return (
    <PageContainer>
      <TitleContainer>
        <TitleLogoImage src={TitleLogo} alt="Title Logo" />
        <Title className="Body__XLarge">
          서비스 이용을 위해 <br />
          로그인을 진행해주세요
        </Title>
      </TitleContainer>
      <InputContainer>
        <InputRow>
          <label className="Body__XLarge" htmlFor="user-id">
            ID
          </label>
          <PublicInput
            type="email"
            id="user-id"
            value={idInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setIdInput(e.target.value);
            }}
            placeholder="아이디를 입력해주세요"
          />
        </InputRow>
        <InputRow>
          <label className="Body__XLarge" htmlFor="user-pw">
            PW
          </label>
          <PublicInput
            type="password"
            id="user-pw"
            value={pwInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPwInput(e.target.value);
            }}
            placeholder="비밀번호를 입력해주세요"
          />
        </InputRow>
      </InputContainer>
      <ButtonContainer>
        <LargeButton buttonText="로그인" onClick={handleLogin} />
        <SignUpContainer>
          <div className="Body__Large">아직 가입하지 않으셨나요?</div>
          <SignUp
            className="Title__H5"
            onClick={() => {
              navigate("/signup");
            }}
          >
            회원가입하기
          </SignUp>
        </SignUpContainer>
      </ButtonContainer>
    </PageContainer>
  );
}
