import { Button, Paper } from '@mui/material'
import Card from '@mui/material/Card/Card'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import React from 'react'
import Carousel from 'react-material-ui-carousel'

import SampleImg from '../../../assets/images/XL.jpeg'

export default function MainCarousel() {
    const items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ]

  return (
    <Carousel>
        {
            items.map( (item, i) => <Item key={i} item={item} /> )
        }
    </Carousel>
  )
}

function Item(props: any)
{
    return (
        <Paper>
            <Box p={2} display='flex' justifyContent='space-around'>
                {tmpList.map((item) => (
                    <PaperItem item={item} />
                ))}
            </Box>
        </Paper>
    )
}

function PaperItem(props: any) {
    const {item} = props;
    return (
        <Card>
            <Box width='12.5vw'>
                <Box component='img' src={item.image} width='100%'></Box>
                <Typography m={1} fontWeight="900">{item.title}</Typography>
                <Typography m={1} fontWeight="700" color="#999999">{item.writer}</Typography>
                <Typography m={1} fontWeight="900">{item.price}원</Typography>
            </Box>
        </Card>
    )
}

const tmpList = [
    {
        image: SampleImg,
        title: '팔도와 친구들의 나도 경제왕',
        writer: '김형진 글/구슬기 그림',
        price: 12600
    },
    {
        image: SampleImg,
        title: '팔도와 친구들의 나도 경제왕',
        writer: '김형진 글/구슬기 그림',
        price: 12600
    },
    {
        image: SampleImg,
        title: '팔도와 친구들의 나도 경제왕',
        writer: '김형진 글/구슬기 그림',
        price: 12600
    },
    {
        image: SampleImg,
        title: '팔도와 친구들의 나도 경제왕',
        writer: '김형진 글/구슬기 그림',
        price: 12600
    },
    {
        image: SampleImg,
        title: '팔도와 친구들의 나도 경제왕',
        writer: '김형진 글/구슬기 그림',
        price: 12600
    },
]