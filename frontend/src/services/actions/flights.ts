import {
  ADD_FLIGHTS,
  CHANGE_FLIGHTS_PAGE,
  CLEAN_FLIGHTS,
  CHANGE_LOADINGS_FLIGHTS,
  CHANGE_LENGTH_FLIGHTS,
} from "../types/redux";
import { Dispatch } from "redux";
import { RootState, AppDispatch } from "../../store/configureStore";
import SchipholService from "../api/schiphol";
import { changeNotification } from "./notification";
import BookingService from "../api/booking";
const createQueryRound =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const page = getState().flights.page;
      const direction = getState().form.from?.iata !== "d" ? "D" : "A";
      const route =
        direction !== "D"
          ? getState().form.to?.iata
          : getState().form.from?.iata;
      const date2 = getState().form?.date2;
      const sortBy = getState().form?.sortBy;
      let res = await SchipholService.getFlights(
        page + 1,
        direction,
        route,
        date2,
        sortBy
      );
      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  };

const createQuery =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const page = getState().flights.page;
      const direction = getState().form.from?.iata === "d" ? "D" : "A";
      const route =
        direction === "D"
          ? getState().form.to?.iata
          : getState().form.from?.iata;
      const date1 = getState().form?.date1;
      const date2 = getState().form?.date2;
      const sortBy = getState().form?.sortBy;
      let res = await SchipholService.getFlights(
        page + 1,
        direction,
        route,
        date1,
        sortBy
      );
      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  };

const afterFetchData =
  (res: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const page = getState().flights.page;
    const len = getState().flights.length;
    if (res.data === "")
      dispatch({
        type: CHANGE_LENGTH_FLIGHTS,
        payload: 0,
      });
    else {
      dispatch({
        type: ADD_FLIGHTS,
        payload: res.data,
      });
      dispatch({
        type: CHANGE_FLIGHTS_PAGE,
        payload: page + 1,
      });
      dispatch({
        type: CHANGE_LOADINGS_FLIGHTS,
        payload: false,
      });
      dispatch({
        type: CHANGE_LENGTH_FLIGHTS,
        payload:
          res.data?.flights?.length === 20
            ? len + 21
            : len + res.data?.flights?.length,
      });
    }
  };

export const showFlights =
  (roundTrip: boolean = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const from = getState().form?.from;
    const to = getState().form?.to;
    if (from === null || to === null) {
      dispatch(
        changeNotification({
          NotificationText: "Please make sure to select the flight routes.",
          NotificationCode: "error",
        })
      );
      return;
    }
    try {
      dispatch({
        type: CHANGE_LOADINGS_FLIGHTS,
        payload: true,
      });
      let res = await dispatch(roundTrip ? createQueryRound() : createQuery());
      console.log(res);
      dispatch(afterFetchData(res));
    } catch (err) {
      console.log(err);
    }
  };

export const cleanFlights =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch({
      type: CLEAN_FLIGHTS,
    });
  };

export const getDesNameByIATA = async (iata: string) => {
  try {
    let res = await SchipholService.getDestination(iata);

    return res.data?.city;
  } catch {
    return "";
  }
};

export const getAirlineByIATA = async (iata: string) => {
  try {
    let res = await SchipholService.getAirline(iata);

    return res.data?.publicName;
  } catch {
    return "";
  }
};

export const bookingFlight =
  (flightID: String, scheduleTime: String) => async (dispatch: AppDispatch) => {
    try {
      const body = {
        flightID,
        scheduleTime,
      };
      await BookingService.create(body);
      dispatch(
        changeNotification({
          NotificationCode: "success",
          NotificationText: "Your reservation has been received",
        })
      );
    } catch (err) {
      dispatch(
        changeNotification({
          NotificationCode: "error",
          NotificationText: "Something Went Wrong",
        })
      );
    }
  };
