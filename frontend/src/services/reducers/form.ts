import {
  CHANGE_TRIP_TYPE,
  CHANGE_FROM,
  CHANGE_TO,
  CHANGE_DATE1,
  CHANGE_DATE2,
  CHANGE_SORT_BY,
} from "../types/redux";
import dayjs, { Dayjs } from "dayjs";
export interface FormStateType {
  tripType: String;
  from: null | { name: string; iata: string };
  to: null | { name: string; iata: string };
  date1: string;
  date2: string;
  sortBy: string;
}

const initialState: FormStateType = {
  tripType: "Round trip",
  from: { name: "Amsterdam Airport", iata: "d" },
  to: null,
  date1: dayjs().format("YYYY-MM-DD"),
  date2: dayjs().format("YYYY-MM-DD"),
  sortBy: "%2BscheduleTime",
};

export interface FormAction {
  type: string;
  payload: FormStateType;
}

export default function (
  state = <FormStateType>initialState,
  action: FormAction
) {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_TRIP_TYPE: {
      return {
        ...state,
        tripType: payload.tripType,
      };
    }
    case CHANGE_FROM: {
      return {
        ...state,
        from: payload,
      };
    }
    case CHANGE_TO: {
      return {
        ...state,
        to: payload,
      };
    }
    case CHANGE_DATE1: {
      return {
        ...state,
        date1: payload,
      };
    }
    case CHANGE_DATE2: {
      return {
        ...state,
        date2: payload,
      };
    }
    case CHANGE_SORT_BY: {
      return {
        ...state,
        sortBy: payload,
      };
    }
    default:
      return state;
  }
}
