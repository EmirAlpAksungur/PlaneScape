import React from "react";
import { Grid } from "@mui/material";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { RootState } from "../../../../store/configureStore";
import { changeSortBy } from "../../../../services/actions/form";
import { changeNotification } from "../../../../services/actions/notification";
const SortSelect: React.FC = () => {
  const dispatch = useAppDispatch();
  const sortBy = useAppSelector((state: RootState) => state.form.sortBy);
  const [lock, setLock] = React.useState<boolean>(true);
  const handleChange = (event: SelectChangeEvent<typeof sortBy>) => {
    const {
      target: { value },
    } = event;
    dispatch(changeSortBy(value));
    if (lock) {
      dispatch(
        changeNotification({
          NotificationText:
            "The sorting will update after clicking the 'Show Flights' button.",
          NotificationCode: "warning",
        })
      );
      setLock(false);
    }
  };
  const sortList = [
    {
      text: "+ Schedule Time",
      value: "%2BscheduleTime",
    },
    {
      text: "- Schedule Time",
      value: "%2DscheduleTime",
    },
    {
      text: "+ Flight Name",
      value: "%2BflightName",
    },
    {
      text: "- Airline Code",
      value: "%2DairlineCode",
    },
  ];
  return (
    <FormControl
      sx={{
        width: "100%",
        backgroundColor: "white",
        padding: "0px",
        borderRadius: "8px",
        "& .MuiSelect-select": {
          padding: "6px",
        },
        "& fieldset": {
          border: "none",
        },
      }}
    >
      <Select value={sortBy} onChange={handleChange} sx={{ padding: "0px" }}>
        {sortList.map((sort) => (
          <MenuItem key={sort.value} value={sort.value}>
            {sort.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default SortSelect;
