import { Box, Paper } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Side1 from "../../../assets/images/Group2.png";
import Side2 from "../../../assets/images/Group3.png";

export default function MainSideCarousel() {
  const items = [Side1, Side2];

  return (
    <Carousel>
      {items.map((item, i) => (
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