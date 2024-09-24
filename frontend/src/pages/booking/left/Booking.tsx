import { Grid } from "@mui/material";
import BookingYourFlight from "./BookingYourFlight/BookingYourFlight";
import Content from "./content/Main";
import Filters from "./filters/Main";
const Booking = () => {
  return (
    <Grid container rowGap={3} className="booking__left__container">
      <Grid item xs={12} className="booking__left__container__book-your-flight">
        <BookingYourFlight />
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          gap={3}
          flexDirection={"row-reverse"}
          sx={{
            flexWrap: {
              xs: "wrap",
              md: "nowrap",
            },
          }}
        >
          <Grid item xs={12} md={3}>
            <Filters />
          </Grid>
          <Grid
            item
            xs={12}
            md={9}
            className="booking__left__container__content"
          >
            <Content />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Booking;
