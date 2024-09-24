import React, { useEffect, useState, useRef } from "react";
import { Box, Grid } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../../../hooks/redux";
import { RootState } from "../../../../store/configureStore";
import {
  AutoSizer,
  InfiniteLoader,
  WindowScroller,
  List,
} from "react-virtualized";
import {
  cleanFlights,
  showFlights,
} from "../../../../services/actions/flights";
import Card from "./Card";
import { cleanRoundTrip } from "../../../../services/actions/roundTrip";
import RoundTrip from "./RoundTrip";
const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const flightList = useAppSelector(
    (state: RootState) => state.flights.flights
  );
  const tripType = useAppSelector((state: RootState) => state.form.tripType);
  const loading = useAppSelector((state: RootState) => state.flights.loading);
  const length = useAppSelector((state: RootState) => state.flights.length);
  const roundTrip = useAppSelector(
    (state: RootState) => state.roundTrip.flights
  );
  const fetchData = async () => {
    if (loading) return;
    if (tripType === "One way") dispatch(showFlights());
    else {
      if (roundTrip?.length === 1) {
        dispatch(showFlights(true));
      } else {
        dispatch(showFlights());
      }
    }
  };
  useEffect(() => {
    return () => {
      dispatch(cleanFlights());
      dispatch(cleanRoundTrip());
    };
  }, []);

  function isRowLoaded({ index }: { index: number }) {
    return !!flightList[index];
  }

  const rowRenderer = (props: any) => {
    // console.log(flightList[props?.index]);

    return (
      <div key={props.key} style={props.style}>
        <Card props={flightList[props?.index]} />
      </div>
    );
  };

  return (
    <>
      {tripType === "Round trip" && (
        <Box sx={{ width: "100%", marginBottom: "16px" }}>
          <RoundTrip />
        </Box>
      )}
      {length > 0 ? (
        <Grid container>
          <AutoSizer disableHeight={true}>
            {({ width }) => (
              <WindowScroller>
                {({ height, isScrolling, onChildScroll, scrollTop }) => (
                  <InfiniteLoader
                    isRowLoaded={isRowLoaded}
                    loadMoreRows={fetchData}
                    rowCount={length}
                  >
                    {({ onRowsRendered, registerChild }) => (
                      <List
                        autoHeight
                        onRowsRendered={onRowsRendered}
                        ref={registerChild}
                        height={height ? height : 0}
                        isScrolling={isScrolling}
                        onScroll={onChildScroll}
                        rowCount={flightList?.length}
                        rowHeight={193}
                        rowRenderer={rowRenderer}
                        scrollTop={scrollTop}
                        width={width}
                        data={flightList}
                      />
                    )}
                  </InfiniteLoader>
                )}
              </WindowScroller>
            )}
          </AutoSizer>
        </Grid>
      ) : length === 0 ? (
        <Box
          sx={{
            fontSize: "1.4rem",
            fontWeight: "bold",
          }}
        >
          Flight not found
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

export default React.memo(Main);
