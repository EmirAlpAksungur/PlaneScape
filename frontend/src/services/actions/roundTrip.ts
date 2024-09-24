import { CLEAN_ROUND_TRIP, ADD_ROUND_TRIP } from "../types/redux";
import { Dispatch } from "redux";

export const addRoundTrip =
  (flightId: string, scheduleTime: string) => (dispatch: Dispatch) => {
    dispatch({
      type: ADD_ROUND_TRIP,
      payload: { flightId, scheduleTime },
    });
  };

export const cleanRoundTrip = () => (dispatch: Dispatch) => {
  dispatch({
    type: CLEAN_ROUND_TRIP,
  });
};
