import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import {Card, CardContent,TextField, CardActions, Button, Box, Typography} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import axios from 'axios';
import { useUserStore } from 'src/stores';

export default function UserOrderPage() {

  const [order, setOrder] = useState<any>(null);
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [orderUserWhether, setOrderUserWhether] = useState<string>('');
  const [orderGuestPassword, setOrderGuestPassword] = useState<string>('');
  const [orderUserId, setOrderUserId] = useState<string>('');
  const [giftCode, setGiftCode] = useState<string>('');
  const [orderUserName, setOrderUserName] = useState<string>('');
  const [orderUserPhone, setOrderUserPhone] = useState<string>('');
  const [orderUserEmail, setOrderUserEmail] = useState<string>('');
  const [orderDatetime, setOrderDatetime] = useState<string>('');
  const [orderRecieptName, setOrderRecieptName] = useState<string>('');
  const [orderRecieptPhone, setOrderRecieptPhone] = useState<string>('');
  const [orderShipAddress, setOrderShipAddress] = useState<string>('');
  const [orderShipAddressDetail, setOrderShipAddressDetail] = useState<string>('');
  const [orderTotalPrice, setOrderTotalPrice] = useState<number>(0);
  const [orderStatus, setOrderStatus] = useState<Number>(0);
  const [orderShipCompany, setOrderShipCompany] = useState<string>('');
  const [orderShipNumber, setOrderShipNumber] = useState<number>(0);
  const [orderShipMessage, setOrderShipMessage] = useState<string>('');

  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPhone, setUserPhone] = useState<string>('');
  const [userAddress, setUserAddress] = useState<string>('');
  const [userAddressDetail, setUserAddressDetail] = useState<string>('');

  const { user } = useUserStore();

  const handleChange1 = (event: SelectChangeEvent) => {
    setOrderShipMessage(event.target.value);
  };

  const handleChange2 = (event: SelectChangeEvent) => {
    setGiftCode(event.target.value);
  };
  
  const paymentFinishHandler = async () => {

    const body = {
      orderNumber: uuidv4(),
      orderUserWhether: user !== null,
      orderGuestPassword,
      orderUserId,
      giftCode,
      orderUserName,
      orderUserPhone,
      orderUserEmail,
      orderDatetime,
      orderRecieptName,
      orderRecieptPhone,
      orderShipAddress,
      orderShipAddressDetail,
      // orderTotalPrice,
      // orderStatus,
      // orderShipCompany,
      // orderShipNumber,
      orderShipMessage
    };

    axios
      .post("http://localhost:4080/api/orderInfo", body)
      .then((response) => {
        const data = response.data;
        const result = data.result;
        console.log(result);
        if (!result) alert(data.message);
      })
      .catch((error) => {
        console.log(error)
        alert(error.message);
      });
  }

  const onPaymentHandler = () => {};
  
  useEffect(() => {
    if (user) {
      setOrderUserName(user.userName);
      setOrderUserPhone(user.userPhone);
      setOrderUserEmail(user.userEmail);

      setOrderRecieptName(user.userName);
      setOrderRecieptPhone(user.userPhone);

      setOrderShipAddress(user.userAddress);
      setOrderShipAddressDetail(user.userAddressDetail);
    }
  }, [])

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"center"}
        style={{ paddingTop: "2vw" }}
      >
        <Card
          sx={{ minWidth: 275, maxWidth: "40vw" }}
          style={{ paddingTop: "2vw" }}
        >
          <CardContent>
            <Box
              display={"flex"}
              borderBottom={1}
              padding={1}
            >
              <Typography padding={1}>성명</Typography>
              <Typography padding={1}>{orderUserName} 님</Typography>
            </Box>
            <TextField
              fullWidth
              label="주문자이름"
              type="name"
              variant="standard"
              value={orderUserName}
            />
            <TextField
              fullWidth
              label="주문자 전화번호"
              type="phone"
              variant="standard"
              value={orderUserPhone}
              onChange={(e) => setOrderUserPhone(e.target.value)}
            />
            <TextField
              fullWidth
              label="주문자 이메일"
              type="email"
              variant="standard"
              value={orderUserEmail}
              onChange={(e) => setOrderUserEmail(e.target.value)}
            />
          </CardContent>
        </Card>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"center"}
        style={{ paddingTop: "2vw" }}
      >
        <Card
          sx={{ minWidth: 275, maxWidth: "40vw" }}
          style={{ paddingTop: "2vw" }}
        >
          <CardContent>
            <Typography> 배송지 정보 </Typography>
            <TextField
              fullWidth
              label="수령인 이름"
              type="name"
              variant="standard"
              value={orderRecieptName}
              onChange={(e) => setOrderRecieptName(e.target.value)}
            />
            <TextField
              fullWidth
              label="수령인 전화번호"
              type="phone"
              variant="standard"
              value={orderRecieptPhone}
              onChange={(e) => setOrderRecieptPhone(e.target.value)}
            />
            <TextField
              fullWidth
              label="수령인 주소"
              type="address"
              variant="standard"
              value={orderShipAddress}
              onChange={(e) => setOrderShipAddress(e.target.value)}
            />
            <TextField
              fullWidth
              label="수령인 상세주소"
              type="address"
              variant="standard"
              value={orderShipAddressDetail}
              onChange={(e) => setOrderShipAddressDetail(e.target.value)}
            />
          </CardContent>
          <CardContent>
            <FormControl sx={{ m: 1, minWidth: 120 }} style={{ width: 600 }}>
              <InputLabel id="demo-simple-select-helper-label">
                배송 메시지
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={orderShipMessage}
                label="Ship Message"
                onChange={handleChange1}
              >
                <MenuItem value="">
                  <em>메시지를 선택해주세요.</em>
                </MenuItem>
                <MenuItem value={'경비실에 맡겨주세요'}>경비실에 맡겨주세요</MenuItem>
                <MenuItem value={'배송전 연락주세요'}>배송전 연락주세요</MenuItem>
                <MenuItem value={'안전하게 와주세요'}>안전하게 와주세요</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} style={{ width: 600 }}>
              <InputLabel id="demo-simple-select-helper-label">
                사은품 선택 (회원만 가능)
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={giftCode}
                label="Select gift"
                onChange={handleChange2}
              >
                <MenuItem value="">
                  <em>사은품을 선택해주세요</em>
                </MenuItem>
                <MenuItem value={'고래밥'}>고래밥</MenuItem>
                <MenuItem value={'꼬깔콘'}>꼬깔콘</MenuItem>
                <MenuItem value={'칙촉'}>칙촉</MenuItem>
                <MenuItem value={'빼빼로'}>빼빼로</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
        </Card>
      </Box>
      <CardActions>
        <Button
          fullWidth
          onClick={() => paymentFinishHandler()}
          variant="contained"
        >
          결제하기
        </Button>
      </CardActions>
    </>
  );
}
