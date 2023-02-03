import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { FormControl, MenuItem, Select } from "@mui/material";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";

export default function Ranking() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Card variant="outlined">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab color="#000000" label="베스트셀러" {...a11yProps(0)} />
            <Tab color="#000000" label="인기 검색어" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          베스트셀러
        </TabPanel>
        <TabPanel value={value} index={1}>
          인기 검색어
        </TabPanel>
      </Box>
    </Card>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <FormControl sx={{ width: '100%', marginBottom: 2, marginTop: 2 }} size="small">
            <Select
              onChange={() => {}}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem sx={{ heigth: 2 }} value="">
                <em>통합</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          {lankList.map((item) => (
            <Box display='flex' p={1}>
            <Typography flex={1}>{item.lank}</Typography>
            <Typography flex={6}>{item.bookTitle}</Typography>
            <Typography flex={1}>{item.tier}</Typography>
          </Box>
          ))}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const lankList = [
  {
    lank: '1️⃣',
    bookTitle: '슬램덩크',
    tier: '🔺',
  },
  {
    lank: '1️⃣',
    bookTitle: '슬램덩크',
    tier: '🔺',
  },
  {
    lank: '1️⃣',
    bookTitle: '슬램덩크',
    tier: '🔺',
  },
  {
    lank: '1️⃣',
    bookTitle: '슬램덩크',
    tier: '🔺',
  },
  {
    lank: '1️⃣',
    bookTitle: '슬램덩크',
    tier: '🔺',
  },
  {
    lank: '1️⃣',
    bookTitle: '슬램덩크',
    tier: '🔺',
  },
  {
    lank: '1️⃣',
    bookTitle: '슬램덩크',
    tier: '🔺',
  },
  {
    lank: '1️⃣',
    bookTitle: '슬램덩크',
    tier: '🔺',
  },
  {
    lank: '1️⃣',
    bookTitle: '슬램덩크',
    tier: '🔺',
  },
  {
    lank: '1️⃣',
    bookTitle: '슬램덩크',
    tier: '🔺',
  },
];