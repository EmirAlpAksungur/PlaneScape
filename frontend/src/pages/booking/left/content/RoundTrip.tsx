import React from "react";
import { Button, Card, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { RootState } from "../../../../store/configureStore";
import { MyDialog } from "../../../../components";
import Details from "./Details";
import { ElementProps } from "../../../../components/dialog/Main";
import SchipholService from "../../../../services/api/schiphol";
import { bookingFlight } from "../../../../services/actions/flights";
import history from "../../../../routers/history";
const TripDetails: React.FC<ElementProps> = ({
  height,
  width,
  flightId,
  handleClose,
}) => {
  const [data, setData] = React.useState<any>({});

  const loadData = async () => {
    try {
      let res = await SchipholService.getFlight(flightId);
      console.log(res);

      setData(res.data);
    } catch (err) {}
  };

  React.useEffect(() => {
    loadData();
    return () => {
      setData([]);
    };
  }, []);
  return (
    <Details
      height={height}
      width={width}
      flightData={data}
      handleClose={handleClose}
    />
  );
};
const RoundTrip = () => {
  const dispatch = useAppDispatch();
  const roundTrip = useAppSelector(
    (state: RootState) => state.roundTrip.flights
  );
  const from = useAppSelector((state: RootState) => state.form.from);
  const to = useAppSelector((state: RootState) => state.form.to);
  const date1 = useAppSelector((state: RootState) => state.form.date1);
  const date2 = useAppSelector((state: RootState) => state.form.date2);
  const length = useAppSelector((state: RootState) => state.flights.length);
  return (
    length !== -1 && (
      <div>
        {roundTrip.map((e: any, i: number) => {
          return (
            <Card key={i} sx={{ p: 1, mb: 1 }}>
              <Grid
                container
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Grid item sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                  {i === 0 ? "Departure" : "Arrival"}
                </Grid>
                <Grid item>
                  <MyDialog
                    Element={TripDetails}
                    closeProtection={false}
                    Button={() => {
                      return <Button variant="text">Flight Details</Button>;
                    }}
                    defaultWH={[550, 450]}
                    defaultOpen={false}
                    hideBackdrop={false}
                    flightId={e.flightId}
                  />
                </Grid>
              </Grid>
            </Card>
          );
        })}
        {roundTrip.length === 2 && (
          <Grid container justifyContent={"flex-end"} sx={{ p: 1, mb: 1 }}>
            <Button
              onClick={() => {
                roundTrip.map((e: any) => {
                  dispatch(bookingFlight(e.flightId, e.scheduleDateTime));
                });
                history.push("/my-flights");
              }}
              variant="contained"
              sx={{ backgroundColor: "rgb(102, 0, 153)" }}
            >
              Book Flights
            </Button>
          </Grid>
        )}
        <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          {roundTrip.length === 0 ? (
            <>
              {from?.name} to {to?.name} - {date1}
            </>
          ) : (
            <>
              {to?.name} to {from?.name} - {date2}
            </>
          )}
        </div>
      </div>
    )
  );
};

export default RoundTrip;
