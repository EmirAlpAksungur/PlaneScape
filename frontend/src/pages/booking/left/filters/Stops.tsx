import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useAppDispatch } from "../../../../hooks/redux";
import { changeNotification } from "../../../../services/actions/notification";
const Stops: React.FC<{ data: string[] }> = ({ data }) => {
  const dispatch = useAppDispatch();
  const [lock, setLock] = React.useState<boolean>(true);
  const handleClick = () => {
    if (lock) {
      dispatch(
        changeNotification({
          NotificationText: "This filtering feature does not work",
          NotificationCode: "warning",
        })
      );
      setLock(false);
    }
  };
  return (
    <FormControl>
      <RadioGroup
        sx={{
          "& .MuiButtonBase-root": {
            padding: "4px",
            color: "rgb(102, 0, 153) !important",
          },
        }}
        onClick={handleClick}
      >
        {data.map((e) => {
          return <FormControlLabel value={e} control={<Radio />} label={e} />;
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default Stops;
