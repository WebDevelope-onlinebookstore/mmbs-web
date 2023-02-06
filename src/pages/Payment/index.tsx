import React from 'react'
import UserOrderPage from './UserOrderPage'
import PayPage from './PayPage'

import { Box, Grid } from "@mui/material";

export default function Payment() {
  return (
    <Box mb={2} ml='10vw' mr='10vw'>
      <Grid mt={2} container spacing={2}>
        <Grid item xs={6}>
          <UserOrderPage />
        </Grid>
        <Grid item xs={6}>
          <PayPage />
        </Grid>
      </Grid>
    </Box>
);
}
