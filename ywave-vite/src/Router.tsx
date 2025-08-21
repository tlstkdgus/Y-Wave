import React from "react";
import { Routes, Route } from "react-router-dom";
import Setting from "./Pages/Setting";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Main from "./Pages/Main";
import Map from "./Pages/Map";
import Mypage from "./Pages/Mypage";
import BookMark from "./Pages/BookMark";
import SignUpComplete from "./Pages/SignUpComplete";
import CategoryRegion from "./Pages/CategoryRegion";
import CategoryIndustry from "./Pages/CategoryIndustry";
import CategoryResult from "./Pages/CategoryResult";
import MypageProfile from "./Pages/MypageProfile";
import MypageReview from "./Pages/MypageReview";

export default function RouterComponent(): React.JSX.Element {
    return(
        <Routes>
            {/*셋팅 페이지 라우팅*/}
            <Route path="/" element={<Setting />} />
            {/*로그인 페이지 라우팅*/}
            <Route path="/login" element={<Login />} />
            {/*회원가입 페이지 라우팅*/}
            <Route path="/signup" element={<SignUp />} />
            {/*회원가입 완료 페이지 라우팅*/}
            <Route path="/signup/complete" element={<SignUpComplete />} />
            {/*선호 카테고리 지역 페이지 라우팅*/}
            <Route path="/category/region" element={<CategoryRegion />} />
            {/*선호 카테고리 업종 페이지 라우팅*/}
            <Route path="/category/industry" element={<CategoryIndustry />} />
            {/*선호 카테고리 결과 페이지 라우팅*/}
            <Route path="/category/result" element={<CategoryResult />} />
            {/*메인 페이지 라우팅*/}
            <Route path="/main" element={<Main />} />
            {/*지도 페이지 라우팅*/}
            <Route path="/map" element={<Map />} />
            {/*마이페이지 페이지 라우팅*/}
            <Route path="/mypage" element={<Mypage />} />
            {/*마이페이지 프로필 편집 페이지 라우팅*/}
            <Route path="/mypage/profile" element={<MypageProfile />} />
            {/*마이페이지 리뷰 수정 페이지 라우팅*/}
            <Route path="/mypage/review" element={<MypageReview />} />
            {/*즐겨찾기 페이지 라우팅*/}
            <Route path="/bookmark" element={<BookMark />} />
        </Routes>
    );
}
