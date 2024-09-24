import React from "react";
import { Grid } from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { RootState } from "../../../../store/configureStore";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { changeDate1, changeDate2 } from "../../../../services/actions/form";

const Datepicker: React.FC<{ route: string }> = ({ route }) => {
  const dispatch = useAppDispatch();
  const date1 = useAppSelector((state: RootState) => state.form.date1);
  const date2 = useAppSelector((state: RootState) => state.form.date2);
  const tripType = useAppSelector((state: RootState) => state.form.tripType);
  let minDate = route === "left" ? dayjs() : dayjs(date1);

  const onDateChange = (newValue: any) => {
    route === "left"
      ? dispatch(changeDate1(newValue))
      : dispatch(changeDate2(newValue));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        minDate={minDate}
        value={route === "left" ? dayjs(date1) : dayjs(date2)}
        onChange={(newValue: any) => {
          if (newValue) {
            onDateChange(newValue);
          }
        }}
        className="booking__left__container__book-your-flight__btn-group__auto-complete"
        slotProps={{
          inputAdornment: {
            position: "start",
          },
          textField: {
            disabled: true,
          },
        }}
        sx={{
          "& .MuiInputBase-root ": {
            width: "100%",
          },
          "& .MuiOutlinedInput-root": {
            borderRadius: tripType === "One way" ? "25px !important" : "",
            borderTopLeftRadius: route === "left" ? "25px" : "0px",
            borderTopRightRadius: route !== "left" ? "25px" : "0px",
            borderBottomLeftRadius: route === "left" ? "25px" : "0px",
            borderBottomRightRadius: route !== "left" ? "25px" : "0px",
          },
        }}
      />
    </LocalizationProvider>
  );
};

const DatePickerSelector: React.FC = () => {
  const tripType = useAppSelector((state: RootState) => state.form.tripType);
  return (
    <Grid container spacing={0.5}>
      <Grid item xs={6}>
        <Datepicker route={"left"} />
      </Grid>

      <Grid item xs={6}>
        {tripType === "Round trip" && <Datepicker route={"right"} />}
      </Grid>
    </Grid>
  );
};

export default DatePickerSelector;
