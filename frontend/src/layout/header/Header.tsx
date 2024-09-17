import React from "react";

import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import { Avatar, Grid, Button, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import "../../assets/layout/header.scss";
import ThemeSelect from "./ThemeSelect";
import { routeToUrl } from "../../routers/utils";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PublicIcon from "@mui/icons-material/Public";

const Header: React.FC = () => {
  return (
    <Grid container className="app-header" columnSpacing={2}>
      <Grid
        item
        className="app-header__left"
        onClick={() => {
          routeToUrl("/");
        }}
      >
        <Grid item>
          <IconButton className="app-header__left__icon-btn">
            <AirplanemodeActiveIcon
              fontSize="large"
              className="app-header__left__icon-btn__icon"
            />
          </IconButton>
        </Grid>
        <Grid item className="app-header__left__company-name">
          PLANE SCAPE
        </Grid>
      </Grid>
      <Grid item className="app-header__right">
        <Button
          className="app-header__right__btn"
          onClick={() => {
            routeToUrl("/my-flights");
          }}
        >
          <LocalOfferIcon className="app-header__right__btn__icon" />
          <span className="app-header__right__btn__text">Deals</span>
        </Button>
        <Button
          className="app-header__right__btn"
          onClick={() => {
            routeToUrl("/profile");
          }}
        >
          <PublicIcon className="app-header__right__btn__icon" />
          <span className="app-header__right__btn__text">Discover</span>
        </Button>
        <ThemeSelect />
        <Button className="app-header__right__btn" disabled>
          <Avatar className="app-header__right__btn__avatar" />
          <span className="app-header__right__btn__text">Joane Smith</span>
        </Button>
      </Grid>
    </Grid>
  );
};

export default Header;
