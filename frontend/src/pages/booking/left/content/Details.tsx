import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  IconButton,
} from "@mui/material";
import { ElementProps } from "../../../../components/dialog/Main";
import CloseIcon from "@mui/icons-material/Close";
const FlightDetails: React.FC<ElementProps> = ({ flightData, handleClose }) => {
  return (
    <Grid container spacing={2} style={{ padding: "20px" }}>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
        id="draggable-dialog-title"
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Flight Details
        </Typography>
        <IconButton
          onClick={() => {
            handleClose();
          }}
        >
          <CloseIcon color="error" />
        </IconButton>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Flight Information</Typography>
            <Typography>Flight Name: {flightData?.flightName}</Typography>
            <Typography>Flight Number: {flightData?.flightNumber}</Typography>
            <Typography>Direction: {flightData?.flightDirection}</Typography>
            <Typography>
              Aircraft Type: {flightData?.aircraftType?.iataMain}
            </Typography>
            <Typography>
              Operational Flight:{" "}
              {flightData?.isOperationalFlight ? "Yes" : "No"}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Flight Times</Typography>
            <Typography>
              Scheduled Time: {flightData?.scheduleDateTime}
            </Typography>
            <Typography>
              Actual Landing Time: {flightData?.actualLandingTime}
            </Typography>
            <Typography>
              Estimated Landing Time: {flightData?.estimatedLandingTime}
            </Typography>
            <Typography>
              Expected Time on Belt: {flightData?.expectedTimeOnBelt}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6">Baggage Claim</Typography>
            <Typography>
              Belt Numbers: {flightData?.baggageClaim?.belts?.join(", ")}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6">Route Information</Typography>
            <Typography>
              Destinations: {flightData?.route?.destinations?.join(", ")}
            </Typography>
            <Typography>EU: {flightData?.route?.eu}</Typography>
            <Typography>
              Visa Required: {flightData?.route?.visa ? "Yes" : "No"}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default FlightDetails;
