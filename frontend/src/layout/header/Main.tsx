import React, { ReactNode } from "react";
import { Grid } from "@mui/material";
import Header from "./Header";

interface MainProps {
  children: ReactNode;
}
const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Header></Header>
      </Grid>
      {children}
    </Grid>
  );
};

export default React.memo(Main);
