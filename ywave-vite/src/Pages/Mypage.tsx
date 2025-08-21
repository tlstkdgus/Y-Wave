import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BiSolidUserCircle, BiSolidPencil } from "react-icons/bi";
import { industries } from "../Data/Industries";
import LargeButton from "../Components/LargeButton";
import DeleteTag from "../Components/DeleteTag";
import ReviewBox from "../Components/ReviewBox";
import { reviewDatas } from "../Data/ReviewDatas";

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  gap: var(--spacing-l);
`;

const UserContainer = styled.div`
  align-self: flex-start;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  margin-top: 24px;
`;

const ImageContainer = styled.div`
  width: 48px;
  height: 48px;

  & > svg {
    width: 100%;
    height: 100%;
    color: var(--neutral-200);
  }
`;

const ProfileEditButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0px;
  gap: var(--spacing-2xs);
  background-color: var(--primary-blue-500);
  border: none;
  border-radius: 10px;
  color: var(--neutral-100);
  cursor: pointer;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);
`;

const TabContainer = styled.div`
  width: 100%;
  display: flex;
`;

const Tab = styled.button<{ isActive: boolean }>`
  flex: 1;
  height: 48px;
  border: none;
  cursor: pointer;
  position: relative;
  color: ${(props) =>
    props.isActive ? "var(--primary-blue-500)" : "var(--neutral-300)"};

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${(props) =>
      props.isActive ? "var(--primary-blue-500)" : "transparent"};
  }
`;

const TabContent = styled.div`
  width: 100%;
`;

const CategoryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 64px;
`;

const Category = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2xl);
`;

const CategorySection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-m);
`;

const SectionTitle = styled.div`
  align-self: flex-start;
`;

const IndustryList = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: var(--spacing-m);
  flex-wrap: wrap;
`;

const Industry = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const ReviewContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-m);
`;

interface IndustryData {
  id: string;
  icon: () => React.ReactElement;
  name: string;
}

export default function Mypage(): React.JSX.Element {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"preferences" | "reviews">(
    "preferences"
  );
  const [selectRegions, setSelectRegions] = useState<string[]>([]);
  const [selectIndustries, setSelectIndustries] = useState<IndustryData[]>([]);

  const nick = "닉네임";
  const RegionDatas = [
    "용인시 처인구 모현읍",
    "창원시 마산회구 양덕2동",
    "서울특별시 동대문구 휘경1동",
  ];
  const IndustryDatas = ["restaurant", "cafe", "convenience"];

  useEffect(() => {
    setSelectRegions(RegionDatas);
    setSelectIndustries(
      industries.filter((industry) =>
        IndustryDatas.some((industryId) => industryId === industry.id)
      )
    );
  }, []);

  const handleDeleteRegion = (deleteRegion: string): void => {
    setSelectRegions((prev) =>
      prev.filter((region) => region !== deleteRegion)
    );
  };

  const handleDeleteIndustry = (deleteIndustry: string): void => {
    setSelectIndustries((prev) =>
      prev.filter((industry) => industry.id !== deleteIndustry)
    );
  };

  const handleCategoryChange = () => {};

  return (
    <PageContainer>
      <UserContainer className="Title__H4">
        <ImageContainer>
          <BiSolidUserCircle />
        </ImageContainer>
        {nick}님
      </UserContainer>
      <ProfileEditButton onClick={() => navigate("/mypage/profile")}>
        <BiSolidPencil />
        <div className="Body__MediumSmall">프로필 편집하기</div>
      </ProfileEditButton>
      <Content>
        <TabContainer>
          <Tab
            className="Title__H6"
            isActive={activeTab === "preferences"}
            onClick={() => setActiveTab("preferences")}
          >
            선호 카테고리
          </Tab>
          <Tab
            className="Title__H6"
            isActive={activeTab === "reviews"}
            onClick={() => setActiveTab("reviews")}
          >
            리뷰
          </Tab>
        </TabContainer>
        <TabContent>
          {activeTab === "preferences" && (
            <CategoryContainer>
              <Category>
                <CategorySection>
                  <SectionTitle className="Title__H5">위치</SectionTitle>
                  {selectRegions.map((region, index) => (
                    <DeleteTag
                      key={index}
                      content={<>{region}</>}
                      color={"var(--neutral-1000)"}
                      onClick={() => handleDeleteRegion(region)}
                    />
                  ))}
                </CategorySection>
                <CategorySection>
                  <SectionTitle className="Title__H5">업종</SectionTitle>
                  <IndustryList>
                    {selectIndustries.map((industry) => (
                      <DeleteTag
                        key={industry.id}
                        content={
                          <Industry key={industry.id}>
                            {industry.icon()}
                            {industry.name}
                          </Industry>
                        }
                        color={"var(--neutral-1000)"}
                        isFix={true}
                        onClick={() => handleDeleteIndustry(industry.id)}
                      />
                    ))}
                  </IndustryList>
                </CategorySection>
              </Category>
              <LargeButton
                buttonText="변경하기"
                onClick={handleCategoryChange}
              />
            </CategoryContainer>
          )}
          {activeTab === "reviews" && (
            <ReviewContainer>
              {reviewDatas.map((review) => (
                <ReviewBox
                  key={review.id}
                  name={review.name}
                  bookmark={review.bookmark}
                  rating={review.rating}
                  createdAt={review.createdAt}
                  industry={review.industry}
                  address={review.address}
                  images={review.images}
                  reviewText={review.reviewText}
                />
              ))}
            </ReviewContainer>
          )}
        </TabContent>
      </Content>
    </PageContainer>
  );
}
