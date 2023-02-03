import {useEffect} from 'react'
import {Card, CardContent,TextField, CardActions, Button, Box, Typography} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useSelectProductStore } from 'src/stores';

interface Props {
    productSeq: number;
    productImageUrl: any;
}

export default function PayPage() {

  const { selectProduct } = useSelectProductStore();

  useEffect(() => {
    console.log(selectProduct);
  }, [])

  return (
    <>
      <Typography>주문</Typography>
      <Box
        display={"flex"}
        justifyContent={"center"}
        style={{ paddingTop: "2vw" }}
      >
        <Card
          sx={{ minWidth: 275, maxWidth: "40vw" }}
          style={{ paddingTop: "2vw" }}
        >
          <Typography borderBottom={1} padding={1}>
            {" "}
            주문 내역
          </Typography>
          <CardContent>
            {selectProduct.map((product) => (
              <Box>
                <Box component="img" src={product.productImageUrl} />
                <Box borderBottom={1} padding={1}>
                  <Typography padding={1}>{product.productTitle}</Typography>
                  <Typography padding={1}>{product.productPrice}</Typography>
                  <Typography padding={1}>{product.count}</Typography>
                  <Typography padding={1}>{product.count * product.productPrice}</Typography>
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  borderBottom={1}
                  padding={1}
                >
                  <Typography padding={1}>상품가격</Typography>
                  <Typography padding={1}>{product.productPrice}원</Typography>
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  borderBottom={1}
                  padding={1}
                >
                  <Typography padding={1}>상품 할인쿠폰</Typography>
                  <Typography padding={1}>{}원</Typography>
                </Box>
              </Box>
            ))}
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              borderBottom={1}
              padding={1}
            >
              <Typography padding={1}>총수량</Typography>
              <Typography padding={1}>배송비</Typography>
              <Typography padding={1}>{}원</Typography>
              <Typography padding={1}>배송비쿠폰</Typography>
              <Typography padding={1}>{}</Typography>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              borderBottom={1}
              padding={1}
            >
              <Typography padding={1}> 총할인 금액</Typography>
              <Typography padding={1}> {}원</Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
