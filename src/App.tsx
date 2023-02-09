import React, { useState } from "react";
import "./App.css";

import { Routes, Route, Outlet, Link } from "react-router-dom";
import { useEffect } from "react";

import Header from "./layouts/header";
import Main from "./layouts/main";
import Navigation from "./layouts/navigation";
import Footer from "./layouts/footer";
import axios from "axios";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import DtlPage from "./pages/DetailPage";
import UserUpdate from "./pages/UserUpdate";
import MyPageOrderInquiry from "./pages/MyPageOrderInquiry";
import 국내도서 from "./pages/bookList/category/국내도서";
import OrderPage from "./pages/Payment";
import FindId from "./pages/FindId";
import Cart from "./pages/Cart";
import Review from "./pages/Review";
import Gifts from "./pages/Gifts";
import FindPassword from "./pages/FindPassword/idex";
import SearchAdd from "./pages/Search";

// component : Main Component //+
// descriptiong : 전체 루트 컴포넌트 //
function App() {
    const [connection, setConnection] = useState<string>("");
    const connectionTest = () => {
        axios
            .get("http://localhost:4080/")
            .then((response) => {
                setConnection(response.data);
            })
            .catch((error) => {
                setConnection(error.message);
            });
    };

    useEffect(() => {
        connectionTest();
    }, []);

    const [tmp, setTmp] = useState<number>(0);
    return (
        <>
            <Header />
            <Navigation />
            <Routes>
                {/* // component : Main 화면 */}
                <Route path='/' element={<Main />} />
                {/* // component : 회원가입 화면 */}
                <Route path='/dtlpage/:productSeq' element={<DtlPage />} />
                <Route path='/signIn' element={<SignIn />} />
                {/* // component : 로그인 화면 */}
                <Route path='/signup' element={<SignUp />} />
                {/* // component : 마이페이지 화면 */}
                <Route
                    path='/orderInquiryPage'
                    element={<MyPageOrderInquiry />}
                />
                {/* // component : 회원정보수정 화면 */}
                <Route path='/userUpdate' element={<UserUpdate />} />
                {/* // component : 도서 목록 화면 */}
                <Route
                    path='/bookList/:productGenre/:productSubGenre'
                    element={<국내도서 />}
                />
                {/* // component : 주문 결제 화면 */}
                <Route path='/orderPayment' element={<OrderPage />} />

                <Route path='/cart' element={<Cart />} />
                <Route path='/findId' element={<FindId />} />
                <Route path='/findPassword' element={<FindPassword />} />
                <Route path='/review' element={<Review />} />
                <Route path='/search/:productTitle' element={<SearchAdd />} />
            </Routes>
            {/* // component : 마이페이지 화면 */}
            {/* // component : ?? 화면 */}
            <Footer />
        </>
    );
}
export default App;
