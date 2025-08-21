import React from "react";
import {
  BiSolidBowlRice,
  BiSolidCoffeeAlt,
  BiSolidCameraMovie,
  BiPlusMedical,
  BiSolidCart,
  BiSolidPencil,
  BiSolidBed,
  BiSolidTime,
  BiSolidShoppingBagAlt,
  BiDumbbell,
  BiSolidGasPump,
} from "react-icons/bi";

interface Industry {
  id: string;
  icon: () => React.ReactElement;
  name: string;
}

const RestaurantIcon = () => <BiSolidBowlRice />;
const CafeIcon = () => <BiSolidCoffeeAlt />;
const MovieIcon = () => <BiSolidCameraMovie />;
const HospitalIcon = () => <BiPlusMedical />;
const MartIcon = () => <BiSolidCart />;
const StationeryIcon = () => <BiSolidPencil />;
const HotelIcon = () => <BiSolidBed />;
const ConvenienceIcon = () => <BiSolidTime />;
const ClothingIcon = () => <BiSolidShoppingBagAlt />;
const GymIcon = () => <BiDumbbell />;
const GasIcon = () => <BiSolidGasPump />;

export const industries: Industry[] = [
  { id: "restaurant", icon: RestaurantIcon, name: "음식점" },
  { id: "cafe", icon: CafeIcon, name: "카페" },
  { id: "movie", icon: MovieIcon, name: "영화공연" },
  { id: "mart", icon: MartIcon, name: "마트슈퍼" },
  { id: "clothing", icon: ClothingIcon, name: "의류잡화" },
  { id: "gas", icon: GasIcon, name: "주유소" },
  { id: "convenience", icon: ConvenienceIcon, name: "생활편의" },
  { id: "hospital", icon: HospitalIcon, name: "의료" },
  { id: "stationery", icon: StationeryIcon, name: "교육문구" },
  { id: "hotel", icon: HotelIcon, name: "숙박" },
  { id: "gym", icon: GymIcon, name: "체육시설" },
];
