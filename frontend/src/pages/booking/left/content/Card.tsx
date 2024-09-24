import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  bookingFlight,
  cleanFlights,
  getAirlineByIATA,
  getDesNameByIATA,
  showFlights,
} from "../../../../services/actions/flights";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { RootState } from "../../../../store/configureStore";
import { MyDialog } from "../../../../components";
import Details from "./Details";
import dayjs from "dayjs";
import { addRoundTrip } from "../../../../services/actions/roundTrip";
import history from "../../../../routers/history";
const Cardheader: React.FC<{ des: string; direction: string }> = ({
  des,
  direction,
}) => {
  return (
    <Grid
      container
      flexDirection={direction === "D" ? "row" : "row-reverse"}
      justifyContent={direction === "D" ? "flex-start" : "flex-end"}
      alignItems="center"
      gap={1}
      className="booking__left__container__content__card__header"
    >
      <Grid item>Amsterdam</Grid>
      <RemoveIcon />
      <Grid item>{des}</Grid>
    </Grid>
  );
};
const Cardbody: React.FC<{
  desIata: string;
  direction: string;
  scheduleDateTime: string;
  estimatedLandingTime: string;
  airline: string;
  stops: number;
}> = ({
  desIata,
  direction,
  scheduleDateTime,
  estimatedLandingTime,
  airline,
  stops,
}) => {
  const Direction: React.FC<{ dr: string }> = ({ dr }) => {
    return (
      <div className="booking__left__container__content__card__body__direction">
        {direction === dr ? <FlightTakeoffIcon /> : <FlightLandIcon />}
        {direction === dr ? "Departure" : "Arrival"}
      </div>
    );
  };

  return (
    <Grid
      container
      className="booking__left__container__content__card__body"
      justifyContent={"space-between"}
      alignItems="center"
      flexDirection={direction === "D" ? "row" : "row-reverse"}
    >
      <Grid item>
        <Direction dr={"D"} />
        <div className="booking__left__container__content__card__body__time">
          {direction === "D"
            ? dayjs(scheduleDateTime).format("hh:mm A")
            : estimatedLandingTime
            ? dayjs(estimatedLandingTime).format("hh:mm A")
            : "-"}
        </div>

        <div>Airport: AMS</div>
      </Grid>
      <Grid item xs>
        <div className="booking__left__container__content__card__body__divider"></div>
      </Grid>
      <Grid
        item
        className="booking__left__container__content__card__body__center"
      >
        <div>{airline}</div>
        <div>
          <AirplanemodeActiveIcon />
        </div>
        <div>
          {stops === 1 ? "Nonstop" : stops === 2 ? "1 Stop" : "2+ Stops"}
        </div>
      </Grid>
      <Grid item xs>
        <div className="booking__left__container__content__card__body__divider"></div>
      </Grid>
      <Grid item>
        <Direction dr={"A"} />
        <div className="booking__left__container__content__card__body__time">
          {direction === "D"
            ? estimatedLandingTime
              ? dayjs(estimatedLandingTime).format("hh:mm A")
              : "-"
            : dayjs(scheduleDateTime).format("hh:mm A")}
        </div>

        <div>Airport: {desIata}</div>
      </Grid>
    </Grid>
  );
};

const CardFooter: React.FC<{ flightid: string; scheduleDateTime: string }> = ({
  flightid,
  scheduleDateTime,
}) => {
  const dispatch = useAppDispatch();
  const tripType = useAppSelector((state: RootState) => state.form.tripType);
  const roundTrip = useAppSelector(
    (state: RootState) => state.roundTrip.flights
  );
  return (
    <Grid
      container
      justifyContent={"space-between"}
      alignItems={"center"}
      className="booking__left__container__content__card__footer"
    >
      <Grid
        item
        className="booking__left__container__content__card__footer__text"
      >
        Price: $200 <br />
        <span>{tripType}</span>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          className="booking__left__container__content__card__footer__button"
          sx={{ color: "#fff !important" }}
          disabled={dayjs(scheduleDateTime).isBefore(dayjs())}
          onClick={() => {
            if (tripType === "One way") {
              dispatch(bookingFlight(flightid, scheduleDateTime));
              history.push("/my-flights");
            } else {
              if (roundTrip?.length === 0) {
                dispatch(addRoundTrip(flightid, scheduleDateTime));
                dispatch(cleanFlights());
                dispatch(showFlights(true));
              } else if (roundTrip?.length === 1) {
                dispatch(addRoundTrip(flightid, scheduleDateTime));
              }
            }
          }}
        >
          {dayjs(scheduleDateTime).isBefore(dayjs())
            ? "Expired"
            : tripType === "One way"
            ? "Book Flight"
            : "Add Flight"}
        </Button>
      </Grid>
    </Grid>
  );
};
const Card: React.FC<any> = ({ props }) => {
  const {
    flightDirection,
    route,
    prefixIATA,
    scheduleDateTime,
    estimatedLandingTime,
    id,
  } = props;
  const [des, setDes] = useState<string>("");
  const [airline, setAirline] = useState<string>("");
  const helperFunc = async () => {
    let res = await getDesNameByIATA(
      route?.destinations[route?.destinations.length - 1]
    );
    setDes(res);
    let aline = await getAirlineByIATA(prefixIATA);
    setAirline(aline);
  };
  React.useEffect(() => {
    helperFunc();
  }, []);
  return (
    <Grid container>
      <Grid item xs={12} className="booking__left__container__content__card">
        <Cardheader direction={flightDirection} des={des} />
        <Cardbody
          direction={flightDirection}
          desIata={route?.destinations[route?.destinations.length - 1]}
          scheduleDateTime={scheduleDateTime}
          estimatedLandingTime={estimatedLandingTime}
          airline={airline}
          stops={route?.destinations?.length}
        />
        <CardFooter flightid={id} scheduleDateTime={scheduleDateTime} />
      </Grid>
      <Grid item>
        <MyDialog
          Element={Details}
          closeProtection={false}
          Button={() => {
            return (
              <Button className="booking__left__container__content__card-details">
                Check The Details
              </Button>
            );
          }}
          defaultWH={[550, 450]}
          defaultOpen={false}
          hideBackdrop={false}
          flightData={props}
        />
      </Grid>
    </Grid>
  );
};

export default Card;
