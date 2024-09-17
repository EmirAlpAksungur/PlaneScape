import React from "react";
import { Grid } from "@mui/material";
import Booking from "./left/Booking";
import Right from "./right/Main";
import "../../assets/pages/booking.scss";
const Main: React.FC = () => {
  return (
    <Grid container spacing={3} className="booking">
      <Grid item xs={12} md={3} lg={2} className="booking__right">
        <Right />
      </Grid>
      <Grid item xs={12} md={9} lg={10} className="booking__left">
        <Booking />
      </Grid>
    </Grid>
  );
};

export default Main;
