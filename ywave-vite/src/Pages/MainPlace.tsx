import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { placeDatas } from "../Data/PlaceDatas";
import { PiBookmarkSimple, PiBookmarkSimpleFill } from "react-icons/pi";
import { AiFillStar } from "react-icons/ai";
import ImageGallery from "../Components/ImageComponent/ImageGallery";
import ReviewSection from "../Components/ReviewSection";
import { useStoreApi } from "../hooks/useApi";
import { calculateDistance, formatDistance } from "../utils/distance";

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 16px;
  box-sizing: border-box;
  gap: var(--spacing-m);
  user-select: none;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 24px;
  margin-bottom: 16px;
`;

const BackIcon = styled(BiArrowBack)`
  color: var(--neutral-1000);
  width: 32px;
  height: 32px;
  cursor: pointer;
`;

const PlaceContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: var(--spacing-xs);
  margin-top: 0;
`;

const NameContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--neutral-1000);

  & > svg {
    min-width: 24px;
    min-height: 24px;
    cursor: pointer;
  }
`;

const Name = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2xs);
  color: var(--neutral-800);
`;

const StarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Star = styled(AiFillStar)<{ isFill: boolean }>`
  width: 16px;
  height: 16px;
  color: ${({ isFill }) =>
    isFill ? "var(--primary-blue-500)" : "var(--neutral-200)"};
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: var(--spacing-2xs);
  color: var(--neutral-800);
`;

const LargeDivider = styled.div`
  width: calc(100% + 32px);
  height: 5px;
  background: var(--neutral-200);
`;

interface MainPlaceProps {
  userLocation?: { lat: number; lng: number } | null;
}

export default function MainPlace({ userLocation: propUserLocation }: MainPlaceProps): React.JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  // API 연동
  const { getStoreDetails } = useStoreApi();

  const [name, setName] = useState<string>("");
  const [isBookmark, setIsBookmark] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const [distance, setDistance] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  
  const [userReviews, setUserReviews] = useState<any[]>([]);
  const [googleReviews, setGoogleReviews] = useState<any[]>([]);
  
  // 사용자 위치 상태 (props가 없을 때 사용)
  const [localUserLocation, setLocalUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // props로 받은 userLocation이 있으면 사용, 없으면 localUserLocation 사용
  const userLocation = propUserLocation || localUserLocation;

  // 사용자 현재 위치 가져오기 (Google Geolocation API 사용) - props가 없을 때만 실행
  const getUserLocation = async () => {
    if (propUserLocation) return; // props로 받은 위치가 있으면 실행하지 않음
    
    try {
      // Google Geolocation API 사용
      const response = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          considerIp: true,
          wifiAccessPoints: [],
          cellTowers: []
        })
      });

      if (response.ok) {
        const data = await response.json();
        const { lat, lng } = data.location;
        setLocalUserLocation({ lat, lng });
      } else {
        // Google API 실패 시 브라우저 geolocation으로 대체
        requestBrowserLocation();
      }
    } catch (error) {
      // Google API 에러 시 브라우저 geolocation으로 대체
      requestBrowserLocation();
    }
  };

  // 브라우저 geolocation으로 위치 요청 (백업) - props가 없을 때만 실행
  const requestBrowserLocation = () => {
    if (propUserLocation) return; // props로 받은 위치가 있으면 실행하지 않음
    
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5분
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocalUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.log('📍 위치 정보를 가져올 수 없습니다:', error.message);
        },
        options
      );
    }
  };

  useEffect(() => {
    // props로 userLocation이 없을 때만 자체적으로 위치 가져오기
    if (!propUserLocation) {
      getUserLocation();
    }
  }, [propUserLocation]);

  useEffect(() => {
    if (id) {
      // API로 가맹점 상세 정보 조회
      const fetchPlaceDetails = async () => {
        try {
          const placeDetails = await getStoreDetails(parseInt(id));
          if (placeDetails) {
            setName(placeDetails.name || "");
            setRating(placeDetails.rating || 0);
            setDistance(""); // API에서 거리 정보가 없음
            setIndustry(""); // API에서 산업 정보가 없음
            setAddress(placeDetails.formattedAddress || "");
            setImages(placeDetails.photos ? placeDetails.photos.map(photo => photo.url) : []);
            
            // 사용자 위치가 있으면 거리 계산
            if (userLocation && placeDetails.lat && placeDetails.lng) {
              const distanceInMeters = calculateDistance(
                userLocation.lat,
                userLocation.lng,
                placeDetails.lat,
                placeDetails.lng
              );
              setDistance(formatDistance(distanceInMeters));
            }
            
            // 사용자 리뷰와 Google 리뷰를 구분해서 설정
            setUserReviews([]); // 현재는 사용자 리뷰가 없음
            setGoogleReviews(placeDetails.reviews ? placeDetails.reviews.map((review: any) => {
              let formattedDate = "날짜 없음";
              if (review.time) {
                try {
                  const date = new Date(review.time * 1000);
                  if (!isNaN(date.getTime())) {
                    formattedDate = date.toLocaleDateString('ko-KR');
                  }
                } catch (error) {
                  console.log('🔍 날짜 변환 에러:', error);
                }
              }
              
              return {
                id: review.id || "",
                nick: review.authorName || "익명",
                rating: review.rating || 0,
                reviewText: review.text || "",
                createdAt: formattedDate,
                images: review.photos ? review.photos.map((photo: any) => photo.url) : []
              };
            }) : []);
          }
        } catch (error) {
          console.error('가맹점 상세 정보 조회 실패:', error);
          // API 실패 시 기존 데이터 사용
          const place = placeDatas.find((place) => place.id === id);
          if (place) {
            setName(place.name);
            setIsBookmark(place.bookmark);
            setRating(place.rating);
            setDistance(place.distance);
            setIndustry(place.industry);
            setAddress(place.address);
            setImages(place.images ?? []);
            // 리뷰는 API로만 가져옴
          }
        }
      };
      
      fetchPlaceDetails();
    }
  }, [id, getStoreDetails, userLocation]);

  const handleBookmarkClick = (): void => {
    setIsBookmark((prev) => !prev);
  };

  const handleReviewWrite = (): void => {
    navigate("/mypage/review", {
      state: {
        name,
        rating: 0.0,
        reviewText: "",
      },
    });
  };

  const renderStars = () => {
    const stars: React.ReactElement[] = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= Math.round(rating) ? (
          <Star key={`filled-${i}`} isFill={true} />
        ) : (
          <Star key={`empty-${i}`} isFill={false} />
        )
      );
    }
    return stars;
  };

  return (
    <PageContainer>
      <HeaderContainer>
        <BackIcon onClick={() => navigate(-1)} />
      </HeaderContainer>
      
      <PlaceContainer>
        <NameContainer>
          <Name className="Title__H3">{name}</Name>
          {isBookmark ? (
            <PiBookmarkSimpleFill onClick={handleBookmarkClick} />
          ) : (
            <PiBookmarkSimple onClick={handleBookmarkClick} />
          )}
        </NameContainer>

        <RatingContainer>
          <div className="Body__Default">{rating}</div>
          <StarContainer>{renderStars()}</StarContainer>
        </RatingContainer>

        <InfoContainer className="Body__Default">
          {distance && <div>{distance}</div>}
          {distance && <div>|</div>}
          {industry && <div>{industry}</div>}
          {industry && <div>|</div>}
          <div>{address}</div>
        </InfoContainer>

        <ImageGallery images={images} altText="가게 이미지" />
      </PlaceContainer>

      <LargeDivider />
      
      {/* 방문자 리뷰 섹션 */}
      <ReviewSection
        title="방문자 리뷰"
        description={
          <>
            해당 장소를 방문하셨나요?<br />
            방문인증을 통해 리뷰를 작성하세요!
          </>
        }
        reviews={userReviews}
        showWriteButton={true}
        onWriteClick={handleReviewWrite}
      />

      <LargeDivider />
      
      {/* 구글 방문자 리뷰 섹션 */}
      <ReviewSection
        title="구글 방문자 리뷰"
        description="조금 더 많은 리뷰가 보고 싶으시다면?"
        reviews={googleReviews}
      />
    </PageContainer>
  );
}
