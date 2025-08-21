import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BiArrowBack, BiSolidUserCircle, BiSolidPencil } from "react-icons/bi";
import PublicInput from "../Components/PublicInput";
import MediumButton from "../Components/MediumButton";
import LargeButton from "../Components/LargeButton";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100svh;
  box-sizing: border-box;
  margin-top: 24px;
  width: 100%;
  gap: 64px;
  padding: 0 16px;
`;

const BackIcon = styled(BiArrowBack)`
  color: var(--neutral-1000);
  align-self: flex-start;
  width: 32px;
  height: 32px;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  width: 80px;
  height: 80px;
  position: relative;

  & > svg {
    width: 100%;
    height: 100%;
    color: var(--neutral-200);
  }
`;

const ImageEditButton = styled.div`
  width: 24px;
  height: 24px;
  background-color: var(--neutral-alpha-50);
  border-radius: 100px;
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  & > svg {
    width: 60%;
    height: 60%;
    color: var(--neutral-200);
  }
`;

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2xl);
`;

const InfoRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.div`
  flex: 1;
`;

const DataContainer = styled.div`
  flex: 3.5;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function MypageProfile(): React.JSX.Element {
  const navigate = useNavigate();
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [nick, setNick] = useState<string>("");
  const [isPwEdit, setIsPwEdit] = useState<boolean>(false);
  const [isNickEdit, setIsNickEdit] = useState<boolean>(false);

  useEffect(() => {
    setId("nickname@gmail.com");
    setPw("abc123");
    setNick("닉네임");
  }, []);

  const handleImageEdit = () => {
    alert("이미지 변경 기능 추가 예정");
  };

  const handlePwEdit = () => {
    setIsPwEdit(true);
    setPw("");
  };

  const handleNickEdit = () => {
    setIsNickEdit(true);
    setNick("");
  };

  const handleSave = () => {
    if (isPwEdit && pw === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    if (isNickEdit && nick === "") {
      alert("닉네임을 입력해주세요.");
      return;
    }

    setIsPwEdit(false);
    setIsNickEdit(false);
  };

  return (
    <PageContainer>
      <BackIcon onClick={() => navigate("/mypage")} />
      <ImageContainer>
        <BiSolidUserCircle />
        <ImageEditButton onClick={handleImageEdit}>
          <BiSolidPencil />
        </ImageEditButton>
      </ImageContainer>
      <InfoContainer>
        <InfoRow>
          <Label className="Title__H4">아이디</Label>
          <DataContainer className="Body__Large">{id}</DataContainer>
        </InfoRow>
        <InfoRow>
          <Label className="Title__H4">비밀번호</Label>
          {isPwEdit ? (
            <DataContainer>
              <PublicInput
                type="password"
                id="user-pw"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="새로운 비밀번호를 입력해주세요."
              />
            </DataContainer>
          ) : (
            <DataContainer className="Body__Large">
              {pw.replace(/./g, "ㆍ")}
              <MediumButton buttonText="변경" onClick={handlePwEdit} />
            </DataContainer>
          )}
        </InfoRow>
        <InfoRow>
          <Label className="Title__H4">닉네임</Label>
          {isNickEdit ? (
            <DataContainer>
              <PublicInput
                type="text"
                id="user-nick"
                value={nick}
                onChange={(e) => setNick(e.target.value)}
                placeholder="새로운 닉네임을 입력해주세요."
              />
            </DataContainer>
          ) : (
            <DataContainer className="Body__Large">
              {nick}
              <MediumButton buttonText="변경" onClick={handleNickEdit} />
            </DataContainer>
          )}
        </InfoRow>
      </InfoContainer>
      <LargeButton buttonText="저장하기" onClick={handleSave} />
    </PageContainer>
  );
}
