import {
  CHANGE_TRIP_TYPE,
  CHANGE_FROM,
  CHANGE_TO,
  CHANGE_DATE1,
  CHANGE_DATE2,
  CHANGE_SORT_BY,
} from "../types/redux";
import dayjs, { Dayjs } from "dayjs";
import { Dispatch } from "redux";
import { RootState } from "../../store/configureStore";
export const changeTripType = (tripType: string) => (dispatch: Dispatch) => {
  dispatch({
    type: CHANGE_TRIP_TYPE,
    payload: { tripType },
  });
};

export const changeFrom =
  (airport: { name: string; iata: string } | null) => (dispatch: Dispatch) => {
    dispatch({
      type: CHANGE_FROM,
      payload: airport,
    });
  };

export const changeTo =
  (airport: { name: string; iata: string } | null) => (dispatch: Dispatch) => {
    dispatch({
      type: CHANGE_TO,
      payload: airport,
    });
  };

export const changeDate1 =
  (date: Dayjs) => (dispatch: Dispatch, getState: () => RootState) => {
    const date2 = getState().form.date2;

    if (date.isAfter(dayjs(date2))) {
      dispatch({
        type: CHANGE_DATE2,
        payload: date.format("YYYY-MM-DD"),
      });
    }
    dispatch({
      type: CHANGE_DATE1,
      payload: date.format("YYYY-MM-DD"),
    });
  };

export const changeDate2 = (date: Dayjs) => (dispatch: Dispatch) => {
  dispatch({
    type: CHANGE_DATE2,
    payload: date.format("YYYY-MM-DD"),
  });
};

export const changeSortBy = (sortby: string) => (dispatch: Dispatch) => {
  dispatch({
    type: CHANGE_SORT_BY,
    payload: sortby,
  });
};
