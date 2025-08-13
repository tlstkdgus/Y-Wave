import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Logo from "../Images/Logo.svg";
import PublicInput from "../Components/PublicInput";
import PublicButton from "../Components/PublicButton";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  box-sizing: border-box;
  max-width: 400px;
  width: 100%;
  gap: 60px;
  color: var(--primary-blue-1000);
  cursor: default;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--spacing-4xl);
  width: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--spacing-xs);
  width: 100%;
`;

const TitleLogoImage = styled.img`
  width: 40px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 28px;
`;

const InputRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: var(--spacing-xs);
  width: 100%;
`;

const InputTitle = styled.label`
  & > span {
    color: var(--error-300);
  }
`;

const IdInputRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  width: 100%;
`;

const IdCheckButton = styled.button`
  min-width: 83px;
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

const InputCaption = styled.div`
  color: var(--neutral-500);
`;

export default function SignUp() {
  const navigate = useNavigate();
  const [idInput, setIdInput] = useState("");
  const [pwInput, setPwInput] = useState("");
  const [nickInput, setNickInput] = useState("");

  const handleIdCheck = () => {};

  const handleSignUp = () => {
    navigate("/signup/complete");
  };

  return (
    <PageContainer>
      <ContentContainer>
        <TitleContainer>
          <TitleLogoImage src={Logo} />
          <div className="Title__H1">회원가입</div>
        </TitleContainer>
        <InputContainer>
          <InputRow>
            <InputTitle className="Body__XLarge" htmlFor="user-id">
              ID(이메일) <span>*</span>
            </InputTitle>
            <IdInputRow>
              <PublicInput
                type="email"
                id="user-id"
                value={idInput}
                onChange={(e) => {
                  setIdInput(e.target.value);
                }}
                placeholder="아이디를 입력해주세요"
              />
              <IdCheckButton className="Title__H6" onClick={handleIdCheck}>
                중복확인
              </IdCheckButton>
            </IdInputRow>
          </InputRow>
          <InputRow>
            <InputTitle className="Body__XLarge" htmlFor="user-pw">
              PW <span>*</span>
            </InputTitle>
            <PublicInput
              type="password"
              id="user-pw"
              value={pwInput}
              onChange={(e) => {
                setPwInput(e.target.value);
              }}
              placeholder="비밀번호를 입력해주세요"
            />
            <InputCaption className="Body__Small">
              * 최소 8자 이상 (영문, 숫자, 특수문자 포함)
            </InputCaption>
          </InputRow>
          <InputRow>
            <InputTitle className="Body__XLarge" htmlFor="user-nick">
              닉네임 <span>*</span>
            </InputTitle>
            <PublicInput
              type="text"
              id="user-nick"
              value={nickInput}
              onChange={(e) => {
                setNickInput(e.target.value);
              }}
              placeholder="닉네임을 입력해주세요"
            />
          </InputRow>
        </InputContainer>
      </ContentContainer>
      <PublicButton buttonText="회원가입 완료" onClick={handleSignUp} />
    </PageContainer>
  );
}
