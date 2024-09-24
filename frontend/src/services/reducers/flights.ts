import {
  CLEAN_FLIGHTS,
  ADD_FLIGHTS,
  CHANGE_FLIGHTS_PAGE,
  CHANGE_LOADINGS_FLIGHTS,
  CHANGE_LENGTH_FLIGHTS,
} from "../types/redux";

export interface FlightStateType {
  loading: boolean;
  page: number;
  flights: any;
  length: number;
}

const initialState: FlightStateType = {
  loading: false,
  page: -1,
  flights: [],
  length: -1,
};

export interface FlightsAction {
  type: string;
  payload: any;
}

export default function (
  state = <FlightStateType>initialState,
  action: FlightsAction
) {
  const { type, payload } = action;
  switch (type) {
    case CLEAN_FLIGHTS:
      return {
        loading: false,
        page: -1,
        flights: [],
        length: -1,
      };
    case ADD_FLIGHTS:
      return {
        ...state,
        flights: [...state.flights, ...payload.flights],
      };
    case CHANGE_FLIGHTS_PAGE:
      return {
        ...state,
        page: payload,
      };
    case CHANGE_LOADINGS_FLIGHTS:
      return {
        ...state,
        loading: payload,
      };
    case CHANGE_LENGTH_FLIGHTS:
      return {
        ...state,
        length: payload,
      };
    default:
      return state;
  }
}
