import { useEffect, useState } from 'react'
import { Card, CardContent, TextField, CardActions, Button, Box, ButtonBase } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

// interface Props {
//     orderNumber: number;
// }


export default function Gifts() {
    // export default function Gifts({orderNumber}: Props) {

    const [giftList, setGiftList] = useState<any[]>([]);
    const [giftNameList, setGiftNameList] = useState<string[]>([]);
    const [gift, setGift] = useState<any>(null);
    const [giftCodes, setGiftCodes] = useState<number>(0);

    // 변경하기 클릭하면 db에 giftcode에 들어가게하는방법
    // const abs = () => {
    //     const data = {
    //         orderNumber,
    //         giftCode: gift.giftCode,
    //     }
    //     axios.post(`http://localhost:4080/api/auth/giftorder`, data);
    // }
    
    const selectGiftHandler = (giftName: string | null) => {
        giftList.forEach((item) => {
            if (item.giftName === giftName) setGift(item);
        })
    }
 
  useEffect(()=>{
    axios.get(`http://localhost:4080/api/auth/gift`)
    .then((response)=>{
        const data = response.data;
        const result = data.result;
        if(!result) alert("실패")
        else {
            setGiftList(data.data);
            // tmp를 스트링 배열로 만들어준거?
            const tmp: string[] = [];
            data.data.forEach((item: any) => {
                tmp.push(item.giftName);
            });
            // ??
            setGiftNameList(tmp);
        }
    })
    .catch((error)=>{'에러'});
  },[])
  const giftAdd = () =>{
    const data = {
        selectGiftHandler
    }
      axios.post(`http://localhost:4080/api/auth/giftorder`,data)
    


  }

  return (
    <>
<<<<<<< HEAD
      <Box>
        <Accordion>
          <Box padding={1}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>사은품 변경</Typography>
            </AccordionSummary>
          </Box>
          <AccordionDetails>
            <Box display={"flex"}>
              <Box
                width={250}
                height={200}
                component="img"
                src={gift && gift.giftImage}
              />
              <Box ml={7}>
                <Box display={"flex"} justifyContent={"center"}>
                  사은품 변경하기
=======
    <Box>
        <Accordion >
            <Box padding={1} >
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography >사은품 변경</Typography>
                </AccordionSummary>
            </Box>
        
            <AccordionDetails>
                <Box display={'flex'}>
                    
                    <Box width={250} height={200} component="img" src={gift && gift.giftImage}>
                    
                    </Box>
                <Box ml={7}>
                    <Box display={'flex'} justifyContent={'center'}>사은품 변경하기</Box>
                    <br />
                    <Autocomplete
                        onChange={(event: any, newValue: string | null) => {
                            selectGiftHandler(newValue);
                        }}
                        onInputChange={(event, newInputValue) => {
                            selectGiftHandler(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={giftNameList}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="사은품 선택하기" />}
                    />
                    <Box display={'flex'} pt={5} justifyContent={'center'}>
                        <Button onClick={giftAdd}>변경하기</Button>
                    </Box>
                    </Box>
>>>>>>> 42a5215c14979e526449a094a14e4a30bd03d870
                </Box>
                <br />
                <Autocomplete
                  onChange={(event: any, newValue: string | null) => {
                    selectGiftHandler(newValue);
                  }}
                  onInputChange={(event, newInputValue) => {
                    selectGiftHandler(newInputValue);
                  }}
                  id="controllable-states-demo"
                  options={giftNameList}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="사은품 선택하기" />
                  )}
                />
                <Box display={"flex"} pt={5} justifyContent={"center"}>
                  <Button>변경하기</Button>
                </Box>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
}