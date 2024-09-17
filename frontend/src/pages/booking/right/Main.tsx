import React from "react";
import { Grid } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ApartmentIcon from "@mui/icons-material/Apartment";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import CarRentals from "../../../assets/Img/CarRentals.png";
import Hotels from "../../../assets/Img/Hotels.png";
import TravelPackagespng from "../../../assets/Img/TravelPackages.png";
interface ItemProps {
  text: string;
  icon: React.ReactNode;
  backgroundImage: string;
}

const Item: React.FC<ItemProps> = (props) => {
  return (
    <Grid
      container
      sx={{
        background: `url(${props.backgroundImage})`,
      }}
      className="booking__right__container__item"
    >
      <Grid item xs={12}>
        {props.icon}
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          fontSize: "1.4rem",
          fontWeight: "bold",
        }}
      >
        {props.text}
      </Grid>
    </Grid>
  );
};

const Items = [
  {
    text: "CAR RENTALS",
    icon: <DirectionsCarIcon fontSize="large" />,
    backgroundImage: CarRentals,
  },
  {
    text: "HOTELS",
    icon: <ApartmentIcon fontSize="large" />,
    backgroundImage: Hotels,
  },
  {
    text: "TRAVEL PACKAGES",
    icon: <BeachAccessIcon fontSize="large" />,
    backgroundImage: TravelPackagespng,
  },
];

const Main = () => {
  return (
    <Grid container spacing={3} className="booking__right__container">
      {Items.map((e) => {
        return (
          <Grid item key={e.text} xs={4} md={12}>
            <Item
              text={e.text}
              icon={e.icon}
              backgroundImage={e.backgroundImage}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Main;
