import React from "react";

import {Card, CardContent,TextField, CardActions, Button, Box, Typography, ButtonGroup } from '@mui/material';

import UserPageLeftSide from "src/layouts/MyPage/MyPageLeftSide";
import Gifts from "../Gifts";

import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function MyPageOrderInquiry() {
    const [orderList, setOrderList] = useState<any[]>([]);
    const [orderDetailList, setOrderDetailList] = useState<any[]>([]);
    const [productEntityList, setProductEntityList] = useState<any[]>([]);
    const [cookies, setCookies] = useCookies();

    const [orderNumber, setOrderNumber] = useState<number>(100);
    const [orderUserWhether, setOrderUserWhether] = useState<string>("");
    const [orderGuestPassword, setOrderGuestPassword] = useState<string>("");
    const [orderUserId, setOrderUserId] = useState<string>("");
    const [giftCode, setGiftCode] = useState<string>("");
    const [orderUserName, setOrderUserName] = useState<string>("");
    const [orderUserPhone, setOrderUserPhone] = useState<string>("");
    const [orderUserDate, setOrderUserDate] = useState<string>("");
    const [orderShipAddressDetail, setOrderUseOrderShipAddressDetail] = useState<string>("");
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
    
    const [productSeq, setProductSeq] = useState<number>(0);

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

    const getOrderList = () => {
        axios.get(`http://localhost:4080/api/order/list`, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`,
                },
            })
            .then((response) => {
                setOrderList(response.data.data);
            })
            .catch((error) => {
                alert("Get OrderList Failed");
            });
    };

    const getOrderDetailList = async () => {
      axios
          .get(`http://localhost:4080/api/order/orderInquiryPage/${orderNumber}/${productSeq}`, {
              headers: {
                  Authorization: `Bearer ${cookies.token}`,
              },
          })
          .then((response) => {
              setOrderDetailList(response.data.data);
              // setProductEntityList(response.data.data);
          })
          .catch((error) => {
              alert("Failed");
          });
  };

    useEffect(() => {
        getOrderList();
        getOrderDetailList();
    }, []);

    return (
      <>
        <Box
          // sx={{ flexGrow: 1 }}
          display={"flex"}
          style={{ padding: "3vw" }}
        >
          <UserPageLeftSide />
          <Box marginLeft={"10vw"}>
            <Box>
              <Box>
                <Typography paddingBottom={"2vw"} textAlign={"center"}>
                  마이페이지
                </Typography>
                <Typography paddingBottom={"1vw"} textAlign={"center"}>
                  주문 / 배송내역 조회
                </Typography>
              </Box>

              {/* <Typography onClick={() => checkDelivery()}>
                    주문 / 배송내역 조회
                  </Typography> */}
              <Box
                display={"flex"}
                justifyContent={"center"}
                style={{
                  padding: "1vw",
                  // margin: "auto",
                }}
                sx={{ maxWidth: "60vw" }}
                borderBottom={1}
                borderTop={1}
              >
                <Card
                  style={{ paddingTop: "1vw" }}
                  sx={{ m: 1, minWidth: "55vw" }}
                >
                  <Box display={"flex"}>
                    <CardContent>
                      {orderList.map((order) => (
                        <>
                          <Box>
                            <Typography padding={1}>
                              {order.orderNumber}
                            </Typography>
                            <Box
                              display={"flex"}
                              justifyContent={"space-between"}
                              borderBottom={1}
                              padding={1}
                              marginBottom={1}
                            >
                              <Typography padding={1} flexGrow={1}>
                                <Box component="img" />
                              </Typography>
                              <Box flexGrow={7} padding={1}>
                                <Typography>책 이름</Typography>
                                <Typography>{order.orderStatus}</Typography>
                                <Typography>주문수량</Typography>
                                <Typography>{order.orderDatetime}</Typography>
                              </Box>
                              <Box display={"flex"} flexGrow={1} padding={1}>
                                <Typography>{order.orderTotalPrice}</Typography>
                                <Typography>
                                  {order.orderShipCompany}
                                </Typography>
                              </Box>
                            </Box>
                            <Box>
                              <Gifts orderNumber={order.orderNumber} />
                            </Box>
                            {/* <Box>
                              <form
                                action="http://info.sweettracker.co.kr/tracking/5"
                                method="post"
                              >
                                <input
                                  type="hidden"
                                  id="t_key"
                                  name="t_key"
                                  value="Oyt51qx1lWG5SXgScZol8w"
                                />
                                <input
                                  type="hidden"
                                  id="t_code"
                                  name="t_code"
                                  value="04"
                                />
                                <input
                                  type="hidden"
                                  id="t_invoice"
                                  name="t_invoice"
                                  value={order.orderShipNumber}
                                />
                              </form>
                            </Box> */}
                          </Box>
                        </>
                      ))}
                    </CardContent>
                  </Box>
                </Card>
              </Box>
            </Box>
          </Box>
        </Box>
      </>
    );
}
