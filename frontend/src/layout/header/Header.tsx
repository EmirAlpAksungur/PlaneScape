import React from "react";
import { useLocation } from "react-router-dom";

import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import { Avatar, Grid, Button, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import "../../assets/layout/header.scss";
import ThemeSelect from "./ThemeSelect";
import { routeToUrl } from "../../routers/utils";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 26,
  height: 26,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <Grid container className="app-header" columnSpacing={2}>
      <Grid
        item
        className="app-header__left"
        xs
        onClick={() => {
          routeToUrl("/");
        }}
      >
        <Grid item>
          <AirplanemodeActiveIcon />
        </Grid>
        <Grid item>PLANE SCAPE</Grid>
      </Grid>
      <Grid item className="app-header__right">
        <Grid item>
          <Button
            variant="text"
            className={`app-header__left__btn ${
              location.pathname.split("/")?.[1] === "my-flights"
                ? "app-header__left__btn__active"
                : ""
            }`}
            onClick={() => {
              routeToUrl("/my-flights");
            }}
          >
            My Flights
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="text"
            className={`app-header__left__btn ${
              location.pathname.split("/")?.[1] === "profile"
                ? "app-header__left__btn__active"
                : ""
            }`}
            onClick={() => {
              routeToUrl("/profile");
            }}
          >
            Profile
          </Button>
        </Grid>
        <ThemeSelect />
        <Button className="app-header__right__btn">
          <SmallAvatar />
          <span className="app-header__right__btn__user-name">JWT User</span>
        </Button>
      </Grid>
    </Grid>
  );
};

export default Header;
