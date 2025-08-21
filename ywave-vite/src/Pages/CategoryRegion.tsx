import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import PublicDropdown from "../Components/PublicDropdown";
import LargeButton from "../Components/LargeButton";
import DeleteTag from "../Components/DeleteTag";

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
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: var(--spacing-3xl);
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  margin-top: 44px;
  gap: 60px;
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

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: var(--spacing-m);
`;

const RegionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: var(--spacing-m);
  color: var(--primary-blue-600);
`;

const Region = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--primary-blue-600);
  border-radius: 10px;
  padding: 12px 16px;
`;

const DeleteIcon = styled(AiOutlineClose)`
  width: 12px;
  height: 12px;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  margin: var(--spacing-3xl) 0px var(--spacing-xl) 0px;
  width: 100%;
`;

interface Option {
  index: number;
  value: string;
}

interface RegionData {
  id: number;
  value: string;
}

export default function CategoryRegion(): React.JSX.Element {
  const navigate = useNavigate();
  const [selectCity, setSelectCity] = useState<Option | null>(null);
  const [selectGu, setSelectGu] = useState<Option | null>(null);
  const [selectDong, setSelectDong] = useState<Option | null>(null);
  const [selectRegions, setSelectRegions] = useState<RegionData[]>([]);

  const nickname = "상현";
  const cityOptions: Option[] = [
    { index: 0, value: "서울특별시" },
    { index: 1, value: "부산광역시" },
    { index: 2, value: "인천광역시" },
    { index: 3, value: "대구광역시" },
    { index: 4, value: "광주광역시" },
    { index: 5, value: "대전광역시" },
    { index: 6, value: "울산광역시" },
  ];

  useEffect(() => {
    if (selectCity && selectGu && selectDong) {
      const newRegion: RegionData = {
        id: Date.now(),
        value: `${selectCity.value} ${selectGu.value} ${selectDong.value}`,
      };

      setSelectRegions((prevRegions) => [...prevRegions, newRegion]);

      setSelectCity(null);
      setSelectGu(null);
      setSelectDong(null);
    }
  }, [selectDong]);

  const handleDeleteRegion = (clickId: number): void => {
    setSelectRegions(selectRegions.filter((region) => region.id !== clickId));
  };

  return (
    <PageContainer>
      <ContentContainer>
        <TitleContainer>
          <BackIcon onClick={() => navigate("/login")} />
          <Title className="Title__H1">
            반갑습니다 {nickname}님! <br />
            주로 <span>어느 위치</span>의 <br />
            지역 화폐 가맹점을 <br />
            방문하시나요?
          </Title>
        </TitleContainer>
        <DropdownContainer>
          <PublicDropdown
            options={cityOptions}
            placeholder="시/도"
            value={selectCity}
            onChange={setSelectCity}
          />
          <PublicDropdown
            options={cityOptions}
            placeholder="시/구/군"
            value={selectGu}
            onChange={setSelectGu}
          />
          <PublicDropdown
            options={cityOptions}
            placeholder="동/읍/면"
            value={selectDong}
            onChange={setSelectDong}
          />
        </DropdownContainer>
        <RegionContainer>
          {selectRegions.map((region) => (
            <DeleteTag
              key={region.id}
              content={<>{region.value}</>}
              color={"var(--primary-blue-600)"}
              onClick={() => handleDeleteRegion(region.id)}
            />
          ))}
        </RegionContainer>
      </ContentContainer>
      <ButtonContainer>
        <LargeButton
          buttonText="다음"
          onClick={() => navigate("/category/industry")}
        />
      </ButtonContainer>
    </PageContainer>
  );
}
