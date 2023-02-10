import React from "react";

import { Box, CardContent, Card } from "@mui/material";

import UserPageLeftSide from "src/layouts/MyPage/MyPageLeftSide";
import Gifts from "../Gifts";

import Typography from "@mui/material/Typography";

import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function MyPageOrderInquiry() {
    const [orderList, setOrderList] = useState<any[]>([]);
    const [cookies, setCookies] = useCookies();

    const [orderNumber, setOrderNumber] = useState<number>(100);
    const [orderUserWhether, setOrderUserWhether] = useState<string>("");
    const [orderGuestPassword, setOrderGuestPassword] = useState<string>("");
    const [orderUserId, setOrderUserId] = useState<string>("");
    const [giftCode, setGiftCode] = useState<string>("");
    const [orderUserName, setOrderUserName] = useState<string>("");
    const [orderUserPhone, setOrderUserPhone] = useState<string>("");
    const [orderShipAddressDetail, setOrderUseOrderShipAddressDetail] =
        useState<string>("");
    const [orderTotalPrice, setOrderTotalPrice] = useState<number>(0);
    const [orderStatus, setOrderStatus] = useState<number>(0);
    const [orderShipCompany, setOrderShipCompany] = useState<string>("");
    const [orderShipNumber, setOrderShipNumber] = useState<number>(0);
    const [orderShipMessage, setOrderShipMessage] = useState<string>("");

    const [orderDetailSeq, setOrderDetailSeq] = useState<number>(0);
    const [orderNumberDetail, setOrderNumberDetail] = useState<string>("");
    const [productId, setProductId] = useState<string>("");
    const [productPrice, setProductPrice] = useState<number>(0);
    const [orderCount, setOrderCount] = useState<number>(0);

    const checkDelivery = () => {
        // http://info.sweettracker.co.kr/tracking/5
        const data = {
            t_key: "Oyt51qx1lWG5SXgScZol8w",
            t_code: "04",
            t_invoice: "1234567890",
        };
        axios
            .get(
                `http://info.sweettracker.co.kr/api/v1/trackingInfo?t_code=${data.t_code}&t_invoice=${data.t_invoice}&t_key=${data.t_key}`
            )
            .then((response) => {
                const data = response.data.trackingDetails;
                console.log(data);
            });
    };

    const getOrderList = async () => {
        axios
            .get(`http://localhost:4080/api/order/list`, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`,
                },
            })
            .then((response) => {
                setOrderList(response.data.data);
            })
            .catch((error) => {
                alert("Failed");
            });
    };

    useEffect(() => {
        getOrderList();
        axios
            .get(`http://localhost:4080/api/order/list`, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`,
                },
            })
            .then((response) => {
                const data = response.data;
                const result = data.result;
                setOrderList(response.data.data);
            });
    }, []);

    return (
        <>
            <Box
                sx={{ flexGrow: 1 }}
                display={"flex"}
                style={{ padding: "3vw" }}
            >
                <UserPageLeftSide />
                <Box>
                    <Box display={"flex"} justifyContent={"center"}>
                        <Typography>마이페이지</Typography>
                        <br />
                        {/* <form
                            action='http://info.sweettracker.co.kr/tracking/5'
                            method='post'
                        >
                            <input
                                type='hidden'
                                id='t_key'
                                name='t_key'
                                value='Oyt51qx1lWG5SXgScZol8w'
                            />
                            <input
                                type='hidden'
                                id='t_code'
                                name='t_code'
                                value='04'
                            />
                            <input
                                type='hidden'
                                id='t_invoice'
                                name='t_invoice'
                                value='1234567890'
                            /> */}
                            <button>주문 / 배송내역 조회</button>
                            {/* <Typography onClick={() => checkDelivery()}>
                                주문 / 배송내역 조회
                            </Typography> */}
                        {/* </form> */}
                    </Box>
                    {orderList.map((order) => (
                        <Box display={"flex"} justifyContent={"center"}>
                            <Card>
                                <CardContent>
                                    <Box>
                                        <Box component='img' />
                                        <Typography padding={1}>
                                            {order.orderUserId}
                                        </Typography>
                                        <Box borderBottom={1} padding={1}>
                                            <Typography padding={1}>
                                                책 이름
                                            </Typography>
                                            <Typography padding={1}>
                                                주문상태
                                            </Typography>
                                            <Typography padding={1}>
                                                주문수량
                                            </Typography>
                                            <Typography padding={1}>
                                                주문일자
                                            </Typography>
                                            <Typography>
                                                {order.orderUserId}
                                            </Typography>
                                            <Typography>
                                                {order.orderUserPhone}
                                            </Typography>
                                            <Typography>
                                                {order.orderTotalPrice}
                                            </Typography>
                                            <Typography>
                                                {order.orderShipCompany}
                                            </Typography>
                                            <Typography>
                                                {order.orderNumber}
                                            </Typography>
                                        </Box>
                                        <Box
                                            display={"flex"}
                                            justifyContent={"space-between"}
                                            borderBottom={1}
                                            padding={1}
                                        >
                                            <Typography padding={1}>
                                                상품가격
                                            </Typography>
                                            <Typography padding={1}>
                                                {}원
                                            </Typography>
                                        </Box>
                                        <Box
                                            display={"flex"}
                                            justifyContent={"space-between"}
                                            borderBottom={1}
                                            padding={1}
                                        >
                                            <Typography padding={1}>
                                                책 가격
                                            </Typography>
                                            <Typography padding={1}>
                                                {}원
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Gifts orderNumber={order.orderNumber} />
                                        </Box>
                                        <Box>
                                            <form
                                                action='http://info.sweettracker.co.kr/tracking/5'
                                                method='post'
                                            >
                                                <input
                                                    type='hidden'
                                                    id='t_key'
                                                    name='t_key'
                                                    value='Oyt51qx1lWG5SXgScZol8w'
                                                />
                                                <input
                                                    type='hidden'
                                                    id='t_code'
                                                    name='t_code'
                                                    value='04'
                                                />
                                                <input
                                                    type='hidden'
                                                    id='t_invoice'
                                                    name='t_invoice'
                                                    value={
                                                        order.orderShipNumber
                                                    }
                                                />
                                                <button>
                                                    주문 / 배송내역 조회
                                                </button>
                                            </form>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Box>
            </Box>
        </>
    );
}
