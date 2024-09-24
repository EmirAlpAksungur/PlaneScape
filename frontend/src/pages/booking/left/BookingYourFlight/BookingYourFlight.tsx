import { Button, Grid } from "@mui/material";
import Header from "./Header";
import FlightRouteSelector from "./FlightRouteSelector";
import DatePickerSelector from "./DatePickerSelector";
import {
  showFlights,
  cleanFlights,
} from "../../../../services/actions/flights";
import { useAppDispatch } from "../../../../hooks/redux";
import { cleanRoundTrip } from "../../../../services/actions/roundTrip";
const BtnSeach: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <Button
      className="booking__left__container__book-your-flight__btn"
      onClick={() => {
        dispatch(cleanFlights());
        dispatch(cleanRoundTrip());
        dispatch(showFlights());
      }}
    >
      Show Flights
    </Button>
  );
};

const BookingYourFlight = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12} md={6}>
        <FlightRouteSelector />
      </Grid>
      <Grid item xs={12} md={6}>
        <DatePickerSelector />
      </Grid>
      <Grid item xs={12}>
        <BtnSeach />
      </Grid>
    </Grid>
  );
};

export default BookingYourFlight;
