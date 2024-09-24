import React from "react";
import { Grid } from "@mui/material";

import SortSelect from "./SortSelect";
import Stops from "./Stops";
const Main: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3} md={12}>
        <Grid container gap={1}>
          <Grid item xs={12} sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            Sort By:
          </Grid>
          <Grid item xs={12}>
            <SortSelect />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3} md={12}>
        <Grid container gap={1}>
          <Grid item xs={12} sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            Arival Time:
          </Grid>
          <Grid item xs={12}>
            <Stops data={["5:00 AM - 11:59 AM", "12:00 PM - 5:59 PM"]} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3} md={12}>
        <Grid container gap={1}>
          <Grid item xs={12} sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            Stops:
          </Grid>
          <Grid item xs={12}>
            <Stops data={["Nonestop", "1 Stop", "2+ Stops"]} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3} md={12}>
        <Grid container gap={1}>
          <Grid item xs={12} sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            Airlines Included:
          </Grid>
          <Grid item xs={12}>
            <Stops
              data={[
                "Alitalia",
                "Lufthansa",
                "Air France",
                "Brussels Airlines",
                "Air Italy",
                "Siberia",
              ]}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Main;
