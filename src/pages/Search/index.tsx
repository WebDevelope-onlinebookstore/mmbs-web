import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import "./style.css";
import axios from "axios";

function SearchAdd() {
    const [bookList, setBookList] = useState<any[]>([]);

    // '/search/:productTitle'
    // url 에서 productTitle 위치의 값을 productTitle이라는 상태로 받아옴

    // 얘는 어디서 받아온건가? 
    // 만약에 스토어에서 받아온거면 왜? setBookList에 이미 product 값이 다들어가있는데
    const { productTitle } = useParams();

    // productTitle 상태가 바뀔때 마다 실행되는 코드 작성
    useEffect(() => {
        // productTitle 값을 기준으로 backend에 요청
        const data = {
            productTitle
        }
        axios.post(`http://localhost:4080/api/serch`,data)
        // 얘네는 백에서 리턴값을 받아오는건가?
        .then((response)=>{
            // 결과 값을 받아서 bookList 상태에 저장
            const data = response.data;
            if(data){
                setBookList(data.data);
            }
        })
    }, [productTitle]);

    return (
        <div>
            <div className='container'>
                <div className='list-wrapper'>
                    {bookList.map((item) => (
                        <div className='list-container'>
                            <div className='list-img'>
                                <div className='imgtle'>
                                    <Link to={`/dtlPage/${item.productSeq}`}>
                                        <img
                                            className='book-img'
                                            src={item.productImageUrl}
                                        />
                                    </Link>
                                </div>
                                <div className='book-name'>
                                    {item.productTitle}
                                </div>
                                <div className='price'>
                                    <b>{item.productPrice}</b>원
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SearchAdd;
