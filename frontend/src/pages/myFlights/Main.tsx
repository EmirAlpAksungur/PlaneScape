import React from "react";
import { Box, Grid } from "@mui/material";
import dayjs from "dayjs";
import { AutoSizer, WindowScroller, List } from "react-virtualized";
import Card from "./Card";
import BookingService from "../../services/api/booking";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "../../assets/pages/myflight.scss";
const Main: React.FC = () => {
  const [flightList, setflightList] = React.useState<
    { flightID: string; scheduleTime: string }[]
  >([]);
  const [sortBy, setSortBy] = React.useState<string>("+ Schedule Time");
  const rowRenderer = (props: any) => {
    return (
      <div key={props.key} style={props.style}>
        <Card id={flightList[props?.index]?.flightID} />
      </div>
    );
  };
  const sortFlights = (
    data: { flightID: string; scheduleTime: string }[],
    order: string
  ) => {
    return data.sort((a, b) => {
      const dateA = dayjs(a.scheduleTime);
      const dateB = dayjs(b.scheduleTime);

      if (order === "+ Schedule Time") {
        return dateA.isAfter(dateB) ? 1 : -1;
      } else {
        return dateA.isBefore(dateB) ? 1 : -1;
      }
    });
  };
  const loadData = async () => {
    try {
      let res = await BookingService.getReservations();
      console.log(res);

      setflightList(sortFlights(res.data, sortBy));
    } catch (err) {}
  };

  React.useEffect(() => {
    loadData();
    return () => {
      setflightList([]);
    };
  }, []);
  const SortSelect: React.FC = () => {
    const handleChange = (event: SelectChangeEvent<typeof sortBy>) => {
      const {
        target: { value },
      } = event;
      setSortBy(value);
      setflightList((prev) => {
        console.log(sortFlights(prev, value));

        return sortFlights(prev, value);
      });
    };
    const sortList = ["+ Schedule Time", "- Schedule Time"];
    return (
      <FormControl
        sx={{
          padding: "0px",
          borderRadius: "8px",
          "& .MuiSelect-select": {
            padding: "6px",
            fontWeight: "bold",
          },
          "& fieldset": {
            border: "none",
          },
        }}
      >
        <Select value={sortBy} onChange={handleChange} sx={{ padding: "0px" }}>
          {sortList.map((sort) => (
            <MenuItem key={sort} value={sort}>
              {sort}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  return (
    <Grid className="my-flights">
      <div
        style={{ display: "flex", alignItems: "center", fontSize: "1.2rem" }}
      >
        Sort By: <SortSelect />
      </div>

      <AutoSizer disableHeight={true} key={sortBy}>
        {({ width }) => (
          <WindowScroller>
            {({ height, isScrolling, onChildScroll, scrollTop }) => (
              <List
                autoHeight
                height={height ? height : 0}
                isScrolling={isScrolling}
                onScroll={onChildScroll}
                rowCount={flightList?.length}
                rowHeight={132}
                rowRenderer={rowRenderer}
                scrollTop={scrollTop}
                width={width}
                data={flightList}
              />
            )}
          </WindowScroller>
        )}
      </AutoSizer>
    </Grid>
  );
};

export default Main;
