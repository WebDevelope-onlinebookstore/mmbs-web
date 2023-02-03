import React from 'react'

import {Box, Paper, Button, ButtonGroup, CardActions, TextField, CardContent, Card} from '@mui/material';

import UserPageLeftSide from 'src/layouts/UserPageLeftSide';
import Gifts from '../Gifts';

import Typography from '@mui/material/Typography';
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";

import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie"; 

export default function MyPageOrderInquiry() {
  const [orderInquiry, setOrderInquiry] = React.useState('1');
  const [cookies, setCookies] = useCookies();

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setOrderInquiry(newValue);
    };

    const [orderNumber, setOrderNumber] = useState<number>(100);
    const [orderUserWhether, setOrderUserWhether] = useState<string>('');
    const [orderGuestPassword, setOrderGuestPassword] = useState<string>('');
    const [orderUserId, setOrderUserId] = useState<string>('');
    const [giftCode, setGiftCode] = useState<string>('');
    const [orderUserName, setOrderUserName] = useState<string>('');
    const [orderUserPhone, setOrderUserPhone] = useState<string>('');
    const [orderShipAddressDetail, setOrderUseOrderShipAddressDetail] = useState<string>('');
    const [orderTotalPrice, setOrderTotalPrice] = useState<number>(0);
    const [orderStatus, setOrderStatus] = useState<number>(0);
    const [orderShipCompany, setOrderShipCompany] = useState<string>('');
    const [orderShipNumber, setOrderShipNumber] = useState<number>(0);
    const [orderShipMessage, setOrderShipMessage] = useState<string>('');

    const orderNumberId = 1;

    const getOrder = async () => {
      await axios
        .get(`http://localhost:4080/api/orderInquiryPage/${orderNumberId}`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((response) => {
          const data = response.data;
          const result = data.result;
          if (!result) alert(data.message);
          else {
            setOrderNumber(data.data.orderNumber);
            setOrderUserWhether(data.data.orderUserWhether);
            setOrderGuestPassword(data.data.orderGuestPassword);
            setOrderUserId(data.data.orderUserId);
            setGiftCode(data.data.giftCode);
            setOrderUserName(data.data.orderUserName);
            setOrderUserPhone(data.data.orderUserPhone);
            setOrderUseOrderShipAddressDetail(data.data.orderShipAddressDetail);
            setOrderTotalPrice(data.data.orderTotalPrice);
            setOrderStatus(data.data.orderStatus);
            setOrderShipCompany(data.data.orderShipCompany);
            setOrderShipNumber(data.data.orderShipNumber);
            setOrderShipMessage(data.data.orderShipMessage);
          }
        })
        .catch((error) => {
          alert("Failed");
        });
    }

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <Box display={"flex"} style={{ padding: "5vw" }}>
      <UserPageLeftSide />
      <Box>
        <Paper elevation={3}>
          <Box display={"flex"} justifyContent={"center"}>
            <Box border={1}>
              <Box />
            </Box>
            <Box border={1}>
              <Box borderBottom={1} padding={1}>
                <Typography>{orderUserId}</Typography>
                <Typography>{orderUserPhone}</Typography>
                <Typography>{orderTotalPrice}</Typography>
                <Typography>{orderShipCompany}</Typography>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                borderBottom={1}
                padding={1}
              >
                <Box>
                  <Typography>{orderNumber}</Typography>
                  <Typography>{orderNumber}</Typography>
                </Box>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                borderBottom={1}
                padding={1}
              >
                <Box>
                  <Typography>{orderNumber}</Typography>
                </Box>
                <Box>
                  <Typography>{orderNumber}</Typography>
                </Box>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                padding={1}
              >
                <Box>
                  <Typography>{orderNumber}</Typography>
                </Box>
                <Box>
                  <Box
                    sx={{
                      color: "action.active",
                      display: "flex",
                      flexDirection: "column",
                      "& > *": {
                        marginBottom: 2,
                      },
                      "& .MuiBadge-root": {
                        marginRight: 4,
                      },
                    }}
                  >
                    <div>
                      <ButtonGroup>
                        <Box border={1} display={"flex"}></Box>
                      </ButtonGroup>
                    </div>
                  </Box>
                </Box>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                padding={1}
              >
                <Box>
                  <Typography>{orderNumber}</Typography>
                </Box>
                <Box>
                  <Typography>{orderNumber}</Typography>
                </Box>
              </Box>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Box border={1} ml={3}>
                  <Button>{orderNumber}</Button>
                </Box>
                <Box border={1}>
                  <Button>{orderNumber}</Button>
                </Box>
                <Box border={1} mr={3}>
                  <Button>{orderNumber}</Button>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={orderInquiry}>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  sx={{ borderBottom: 1, borderColor: "divider" }}
                >
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      style={{ fontSize: "25px" }}
                      label="배송조회"
                      value="1"
                    />
                    <Tab
                      style={{ fontSize: "25px" }}
                      label="주문취소"
                      value="2"
                    />
                    <Tab style={{ fontSize: "25px" }} label="^ㅡ^" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Box>
                    <Typography>배송조회</Typography>
                  </Box>
                </TabPanel>
                <TabPanel value="2">
                  <Box>주문취소</Box>
                </TabPanel>
                <TabPanel value="3">
                  <Box>^ㅡ^</Box>
                </TabPanel>
              </TabContext>
            </Box>
          </Box>
        </Paper>
          <Box>
            <Gifts />
          </Box>
      </Box>
    </Box>
  );
}
