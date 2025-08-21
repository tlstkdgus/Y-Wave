import React from "react";

interface ReviewData {
  id: string;
  name: string;
  bookmark: boolean;
  rating: number;
  createdAt: string;
  industry: string;
  address: string;
  images?: string[];
  reviewText: string;
}

export const reviewDatas: ReviewData[] = [
  {
    id: "review_001",
    name: "미팅 족산불 도소매",
    bookmark: false,
    rating: 4.7,
    createdAt: "2025.05.16",
    industry: "식당",
    address: "경기도 용인시 처인구 모현읍",
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=300&fit=crop",
    ],
    reviewText:
      "너무 맛있습니다! 족발이 정말 부드럽고 양념이 깔끔해요. 다음에 또 올 예정입니다.",
  },
  {
    id: "review_002",
    name: "이탈리안 파스타, 피자를 파는 너무너무 맛있는 식당",
    bookmark: false,
    rating: 4.5,
    createdAt: "2025.05.12",
    industry: "식당",
    address: "서울특별시 강남구 신사동",
    images: [],
    reviewText:
      "정통 이탈리안 파스타를 맛볼 수 있어요. 면도 쫄깃하고 소스가 진짜 맛있습니다. 가격은 좀 비싸지만 그만한 값어치는 해요.",
  },
  {
    id: "review_003",
    name: "홍대 맛집 카페",
    bookmark: true,
    rating: 4.2,
    createdAt: "2025.05.15",
    industry: "카페",
    address: "서울특별시 마포구 홍익로",
    images: [
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop",
    ],
    reviewText:
      "분위기 좋은 카페에요. 커피도 맛있고 디저트도 괜찮습니다. 데이트 코스로 추천!",
  },
  {
    id: "review_004",
    name: "바다횟집",
    bookmark: false,
    rating: 4.8,
    createdAt: "2025.05.14",
    industry: "식당",
    address: "부산광역시 해운대구 해운대해변로",
    images: [
      "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
    ],
    reviewText:
      "신선한 회와 친절한 서비스! 부산 여행 왔을 때 꼭 들러야 할 맛집입니다. 가성비도 좋아요.",
  },
  {
    id: "review_005",
    name: "엄마손 떡볶이",
    bookmark: true,
    rating: 3.9,
    createdAt: "2025.05.13",
    industry: "식당",
    address: "경기도 성남시 분당구 정자동",
    images: [
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=300&fit=crop",
    ],
    reviewText:
      "옛날 떡볶이 맛이에요. 달달하고 쫄깃한 떡이 일품입니다. 어릴 때 생각나는 맛!",
  },
];
