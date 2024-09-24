import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { Grid, TextField, Autocomplete } from "@mui/material";
import iataService from "../../../../services/api/iata";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import { changeFrom, changeTo } from "../../../../services/actions/form";
import { RootState } from "../../../../store/configureStore";
const SelectBox: React.FC<{ route: string }> = ({ route }) => {
  const dispatch = useAppDispatch();
  const [options, setOptions] = React.useState<
    { name: string; iata: string }[]
  >([{ name: "Amsterdam Airport", iata: route === "from" ? "d" : "a" }]);
  const from = useAppSelector((state: RootState) => state.form.from);
  const to = useAppSelector((state: RootState) => state.form.to);
  const handleTextChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      let res = await iataService.get(e.target.value);
      console.log(res);

      setOptions([
        ...res.data,
        { name: "Amsterdam Airport", iata: route === "from" ? "d" : "a" },
      ]);
    } catch {}
  };

  const onRouteChange = (event: any, values: any) => {
    let val = options.find((e) => e.name === values);

    if (val) {
      if (val.name === "Amsterdam Airport") {
        if (route === "from") {
          dispatch(changeFrom(val));
          dispatch(changeTo(null));
        } else {
          dispatch(changeFrom(null));
          dispatch(changeTo(val));
        }
      } else
        route === "from" ? dispatch(changeFrom(val)) : dispatch(changeTo(val));
    } else {
      route === "from" ? dispatch(changeFrom(null)) : dispatch(changeTo(null));
    }
  };
  console.log(to);
  let value = () => {
    if (route === "from") {
      return from?.name ? from?.name : "";
    } else {
      return to?.name ? to?.name : "";
    }
  };
  return (
    <Autocomplete
      options={options.map((option) => option.name)}
      onChange={onRouteChange}
      value={value()
        .toLowerCase()
        .replace(/\b\w/g, function (char: string) {
          return char.toUpperCase();
        })}
      className="booking__left__container__book-your-flight__btn-group__auto-complete"
      sx={{
        ".MuiOutlinedInput-root": {
          borderTopLeftRadius: route === "from" ? "25px" : "0px",
          borderTopRightRadius: route !== "from" ? "25px" : "0px",
          borderBottomLeftRadius: route === "from" ? "25px" : "0px",
          borderBottomRightRadius: route !== "from" ? "25px" : "0px",
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          value={value()
            .toLowerCase()
            .replace(/\b\w/g, function (char: string) {
              return char.toUpperCase();
            })}
          onChange={handleTextChange}
          onClick={() => {
            if (route !== "from") {
              dispatch(changeFrom({ iata: "d", name: "Amsterdam Airport" }));
              dispatch(changeTo(null));
            } else {
              dispatch(changeFrom(null));
              dispatch(changeTo({ iata: "a", name: "Amsterdam Airport" }));
            }
          }}
          InputProps={{
            ...params.InputProps,
            startAdornment:
              route === "from" ? (
                <FlightTakeoffIcon className="booking__left__container__book-your-flight__btn-group__auto-complete__icon" />
              ) : (
                <FlightLandIcon className="booking__left__container__book-your-flight__btn-group__auto-complete__icon" />
              ),
            endAdornment: <></>,
          }}
        />
      )}
    />
  );
};

const FlightRouteSelector: React.FC = () => {
  return (
    <Grid container spacing={0.5}>
      <Grid item xs={6}>
        <SelectBox route={"from"} />
      </Grid>
      <Grid item xs={6}>
        <SelectBox route={"to"} />
      </Grid>
    </Grid>
  );
};

export default FlightRouteSelector;
