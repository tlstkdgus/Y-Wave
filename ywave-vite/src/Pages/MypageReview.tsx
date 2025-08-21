import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { BiX, BiImageAdd } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import LargeButton from "../Components/LargeButton";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  box-sizing: border-box;
  width: 100%;
  gap: 64px;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2xl);
`;

const CancelIcon = styled(BiX)`
  color: var(--neutral-1000);
  align-self: flex-end;
  width: 32px;
  height: 32px;
  cursor: pointer;
`;

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  color: var(--neutral-1000);
`;

const StarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Star = styled(AiFillStar)<{ isFill: boolean }>`
  width: 24px;
  height: 24px;
  color: ${({ isFill }) =>
    isFill ? "var(--success-100)" : "var(--neutral-200)"};
`;

const RatingInput = styled.input`
  width: 70px;
  border: 1px solid var(--neutral-200);
  border-radius: 10px;
  box-sizing: border-box;
  text-align: center;

  &:focus {
    border-color: var(--primary-blue-500);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--neutral-200);
  padding: 36px 55px;

  & > svg {
    width: 80px;
    height: 80px;
    color: var(--neutral-1000);
  }
`;

const ReviewText = styled.textarea`
  width: 100%;
  height: 160px;
  border: 1px solid var(--neutral-200);
  border-radius: 10px;
  color: var(--neutral-1000);
  padding: 16px;
  box-sizing: border-box;
`;

export default function MypageReview(): React.JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, rating, reviewText } = location.state;

  const [ratingInput, setRatingInput] = useState<number>(0.0);
  const [images, setImages] = useState<File[]>([]);
  const [review, setReview] = useState<string>("");


  useEffect(() => {
    setRatingInput(rating > 0 ? Number(rating.toFixed(1)) : 0.0);
    setReview(reviewText);
  }, []);

  const handleRatingInputChange = (value: number) => {
    if (!isNaN(value) && value >= 0 && value <= 5) {
      const roundValue = Math.round(value * 10) / 10;
      setRatingInput(roundValue);
    }
  };

  const renderStars = (rating: number) => {
    const roundRating = Math.round(rating);
    const stars: React.ReactElement[] = [];

    for (let i = 0; i < roundRating; i++) {
      stars.push(<Star key={`filled-${i}`} isFill={true} />);
    }
    for (let i = 0; i < 5 - roundRating; i++) {
      stars.push(<Star key={`empty-${i}`} isFill={false} />);
    }

    return stars;
  };

  const handleEdit = () => {
    navigate("/mypage");
  };

  return (
    <PageContainer>
      <Content>
        <CancelIcon onClick={() => navigate("/mypage")} />
        <div className="Title__H3">{name}</div>
        <RatingContainer>
          <StarContainer>{renderStars(ratingInput)}</StarContainer>
          <RatingInput
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={ratingInput}
            onChange={(e) => handleRatingInputChange(Number(e.target.value))}
            className="Body__XLarge"
          />
        </RatingContainer>
        <ImageContainer>
          <BiImageAdd />
        </ImageContainer>
        <ReviewText
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </Content>
      <LargeButton buttonText="수정하기" onClick={handleEdit} />
    </PageContainer>
  );
}
