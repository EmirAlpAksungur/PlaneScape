import { CLEAN_ROUND_TRIP, ADD_ROUND_TRIP } from "../types/redux";

export interface RoundTripStateType {
  flights: any;
}

const initialState: RoundTripStateType = {
  flights: [],
};

export interface RoundTripAction {
  type: string;
  payload: any;
}

export default function (
  state = <RoundTripStateType>initialState,
  action: RoundTripAction
) {
  const { type, payload } = action;
  switch (type) {
    case CLEAN_ROUND_TRIP:
      return {
        flights: [],
      };
    case ADD_ROUND_TRIP:
      return {
        ...state,
        flights: [
          ...state.flights,
          { flightId: payload.flightId, scheduleTime: payload.scheduleTime },
        ],
      };

    default:
      return state;
  }
}
