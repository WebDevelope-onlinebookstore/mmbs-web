import React,  { useState } from 'react'
import {Card, CardContent,TextField, CardActions,Button,Box} from '@mui/material';
import axios from 'axios';
export default function SignUp() {

  const [userId, setUserId] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [userPasswordCheck, setUserPasswordCheck] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userPhone, setUserPhone] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userAddress, setUserAddress] = useState<string>('');
  const [userAddressDetail, setUserAddressDetail] = useState<string>('');
  const [userKidBirth, setUserKidBirth] = useState<string>('');
  const [recommendedUserId, setRecommendedUserId] = useState<string>('');

  const signUpHandler = () => {
    const data = {
      userId,
      userPassword,
      userPasswordCheck,
      userName,
      userPhone,
      userEmail,
      userAddress,
      userAddressDetail,
      userKidBirth,
      recommendedUserId,
    };
    axios
    .post("http://localhost:4080/api/auth/signUp", data)
    .then((response) => {})
    .catch((error) => {});
  };
  
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      style={{ paddingTop: "5vw" }}
    >
      <Card sx={{ minWidth: 275, maxWidth: "40vw" }}>
        <CardContent>
          <TextField
            fullWidth
            label="아이디"
            type="id"
            variant="standard"
            onChange={(e) => setUserId(e.target.value)}
          />
          <TextField
            fullWidth
            label="비밀번호"
            type="password"
            variant="standard"
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <TextField
            fullWidth
            label="비밀번호 체크"
            type="password"
            variant="standard"
            onChange={(e) => setUserPasswordCheck(e.target.value)}
          />
          <TextField
            fullWidth
            label="이름"
            type="name"
            variant="standard"
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            fullWidth
            label="전화번호"
            type="phone"
            variant="standard"
            onChange={(e) => setUserPhone(e.target.value)}
          />
          <TextField
            fullWidth
            label="이메일"
            type="email"
            variant="standard"
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="주소"
            type="address"
            variant="standard"
            onChange={(e) => setUserAddress(e.target.value)}
          />
          <TextField
            fullWidth
            label="상세주소"
            type="address"
            variant="standard"
            onChange={(e) => setUserAddressDetail(e.target.value)}
          />
          <TextField
            fullWidth
            label="자녀 생년월일"
            type="kidBirth"
            variant="standard"
            onChange={(e) => setUserKidBirth(e.target.value)}
          />
          <TextField
            fullWidth
            label="추천인 아이디"
            type="recommendedUserId"
            variant="standard"
            onChange={(e) => setRecommendedUserId(e.target.value)}
          />
        </CardContent>
        <CardActions>
          <Button fullWidth onClick={() => signUpHandler()} variant="contained">
            회원가입
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
