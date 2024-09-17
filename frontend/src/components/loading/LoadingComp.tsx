import React from "react";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import "../../assets/components/loading/loading.scss";

const LoadingComponent: React.FC = () => {
  return (
    <Box className="loading-component-box">
      <CircularProgress color="secondary" />
    </Box>
  );
};

export default React.memo(LoadingComponent);
