import React from 'react'

import {Card, CardContent,TextField, CardActions, Button, Box, Typography, ButtonGroup } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// import { Dayjs } from 'dayjs';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"; 
import { Link } from 'react-router-dom';
import axios from "axios";

export default function UserAskList() {

  const [cookies, setCookies] = useCookies();
  // const [value, setValue] = React.useState<Dayjs | null>(null);
  const [askList, setAskList] = useState<any[]>([]);

  const [askId, setAskId] = useState<number>(0);
  const [askWriter, setAskWriter] = useState<string>('');
  const [askSort, setAskSort] = useState<string>('');
  const [askContent, setAskContent] = useState<string>('');
  const [askDatetime, setAskDatetime] = useState<string>('');
  const [askStatus, setAskStatus] = useState<number>(0); //[-1: 삭제, 0: 문의 접수, 1: 답변완료 상태]
  const [askReply, setAskReply] = useState<string>('');

  const getAskList = async () => {

    axios
      .get(`http://localhost:4080/api/ask/askList`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((response) => {
        setAskList(response.data.data);
        alert("1 : 1 접수를 정상적으로 완료하였습니다.");
      })
      .catch((error) => {
        alert("Failed");
      });
  }

  useEffect(() => {
    getAskList();
    axios
      .get(`http://localhost:4080/api/ask/askList`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        const result = data.result;
        setAskList(response.data.data);
      });
  }, []);

  return (
    <>
      <Box style={{ paddingTop: "2vw" }}>
        <Typography align="center" fontSize={"30px"}>
          마이페이지
        </Typography>
        <Typography align="center" fontSize={"25px"}>
          1 : 1 문의
        </Typography>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"center"}
        style={{
          padding: "1vw",
          borderWidth: 2,
          borderRadius: 4,
          borderStyle: "solid",
          margin: "auto",
        }}
        sx={{ maxWidth: "50vw" }}
      >
        <Card style={{ paddingTop: "1vw" }} sx={{ m: 1, minWidth: "45vw" }}>
          <Box style={{ paddingTop: "1vw" }}>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button>전체</Button>
              <Button>1개월</Button>
              <Button>3개월</Button>
              <Button>6개월</Button>
            </ButtonGroup>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Basic example"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider> */}
            <Box display={"flex"}>
              <CardContent sx={{ maxWidth: "40vw" }}>
                <FormControl sx={{ minWidth: "20vw", maxWidth: "20vw" }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    답변 상태
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    // value={orderShipMessage}
                    // label="Select gift"
                    // onChange={handleChangeMessage}
                  >
                    <MenuItem>
                      <em>답변상태</em>
                    </MenuItem>
                    <MenuItem value={10}>답변 완료</MenuItem>
                    <MenuItem value={20}>문의 접수</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
              <CardContent sx={{ maxWidth: "40vw" }}>
                <FormControl sx={{ minWidth: "20vw", maxWidth: "20vw" }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    문의 종류
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    // value={orderShipMessage}
                    // label="Select gift"
                    // onChange={handleChangeMessage}
                  >
                    <MenuItem>
                      <em>문의 종류</em>
                    </MenuItem>
                    <MenuItem value={10}>제품 문의</MenuItem>
                    <MenuItem value={20}>주문/결제 문의</MenuItem>
                    <MenuItem value={30}>교환/취소 문의</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <CardActions
              sx={{ minWidth: "30vw" }}
              // style={{ paddingTop: "1vw" }}
            >
              <Button fullWidth>조회하기</Button>
            </CardActions>
          </Box>
        </Card>
      </Box>
      <Box display={"flex"} justifyContent={"center"}>
        <CardActions sx={{ minWidth: "30vw" }} style={{ paddingTop: "1vw" }}>
          <Link to={"/userAskWrite"}>
            <Button>문의 작성하기</Button>
          </Link>
        </CardActions>
      </Box>

      <Box
        display={"flex"}
        justifyContent={"center"}
        style={{
          padding: "1vw",
          margin: "auto",
        }}
        sx={{ maxWidth: "70vw" }}
        borderBottom={1}
        borderTop={1}
      >
        <Card style={{ paddingTop: "1vw" }} sx={{ m: 1, minWidth: "65vw" }}>
          <Box display={"flex"} justifyContent={"center"}>
            <CardContent>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                borderBottom={1}
                padding={1}
                margin={1}
                sx={{ minWidth: "60vw" }}
              >
                <Typography padding={1}>NO.</Typography>
                <Typography padding={1}>문의 유형</Typography>
                <Typography padding={1}>문의 내용</Typography>
                <Typography padding={1}>문의 상태</Typography>
                <Typography padding={1}>작성일</Typography>
              </Box>
              {askList.map((ask) => (
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  borderBottom={1}
                  padding={1}
                  margin={1}
                >
                  <Typography padding={1}>{ask.askId}</Typography>
                  <Typography padding={1}>{ask.askSort}</Typography>
                  <Typography padding={1}>{ask.askContent}</Typography>
                  <Typography padding={1}>{ask.askStatus}</Typography>
                  <Typography padding={1}>{ask.askDatetime}</Typography>
                </Box>
              ))}
            </CardContent>
          </Box>
        </Card>
      </Box>
    </>
  );
}