import { Box, Paper } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import Side1 from "../../../assets/images/Group2.png";
import Side2 from "../../../assets/images/Group3.png";

export default function MainSideCarousel() {
  const items = [Side1, Side2];
  
  const [ImageList,setImageList] = useState<any[]>([]);

  

  useEffect(()=>{
    axios.get(`http://localhost:4080/api/Image`)
    .then((response)=>{
      const data =response.data;
      if(data){
        const tmp : any[] = [[],[]];
        data.data.forEach((item: any, index: number)=>{
          if(index<3)
            tmp[0].push(item);
            else
              tmp[1].push(item);
        })
        setImageList(tmp);
      }
    })
  },[])



  return (
    <Carousel>
      {ImageList.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props: any) {
  return (
    <Paper>
      <Box component="img" src={props.item} width="100%" height="500px"></Box>
    </Paper>
  );
}