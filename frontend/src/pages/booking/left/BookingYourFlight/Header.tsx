import React from "react";
import { useAppSelector, useAppDispatch } from "../../../../hooks/redux";
import { Grid, ButtonGroup, Button } from "@mui/material";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import { RootState } from "../../../../store/configureStore";
import { changeTripType } from "../../../../services/actions/form";

const BtnGroup = () => {
  const dispatch = useAppDispatch();
  const TripType = useAppSelector((state: RootState) => state.form.tripType);
  const handleClick = (text: string) => {
    dispatch(changeTripType(text));
  };
  return (
    <ButtonGroup
      variant="contained"
      className="booking__left__container__book-your-flight__header__btn-group"
    >
      <Button
        className={`
  ${
    TripType === "Round trip"
      ? "booking__left__container__book-your-flight__header__btn-group__btn-selected"
      : "booking__left__container__book-your-flight__header__btn-group__btn"
  }
  `}
        onClick={() => {
          handleClick("Round trip");
        }}
      >
        Round trip
      </Button>
      <Button
        className={`
  ${
    TripType === "One way"
      ? "booking__left__container__book-your-flight__header__btn-group__btn-selected"
      : "booking__left__container__book-your-flight__header__btn-group__btn"
  }
  `}
        onClick={() => {
          handleClick("One way");
        }}
      >
        One way
      </Button>
    </ButtonGroup>
  );
};

const Header = () => {
  return (
    <Grid
      container
      justifyContent={"space-between"}
      className="booking__left__container__book-your-flight__header"
    >
      <Grid
        item
        className="booking__left__container__book-your-flight__header__text"
      >
        <AirplanemodeActiveIcon className="booking__left__container__book-your-flight__header__text__icon" />{" "}
        <span>Booking Your Flight</span>
      </Grid>
      <Grid
        item
        className="booking__left__container__book-your-flight__btn-group"
      >
        <BtnGroup />
      </Grid>
    </Grid>
  );
};
export default Header;
