import { schipholInstance } from "./baseUnit";
import axios, { CancelTokenSource } from "axios";

let cancelToken: null | CancelTokenSource;
const getFlights = (
  page: number,
  direction: string,
  route: string,
  date: string,
  sortBy: string
) => {
  if (cancelToken) {
    cancelToken.cancel();
  }
  cancelToken = axios.CancelToken.source();
  return schipholInstance.get(
    `/api/public-flights/flights?scheduleDate=${date}&route=${route}&flightDirection=${direction}&includedelays=false&page=${page}&sort=${sortBy}`
  );
};

const getDestination = (iata: string) => {
  return schipholInstance.get(`/api/public-flights/destinations/${iata}`);
};

const getAirline = (iata: string) => {
  return schipholInstance.get(`/api/public-flights/airlines/${iata}`);
};

const getFlight = (iata: string) => {
  return schipholInstance.get(`/api/public-flights/flights/${iata}`);
};
const SchipholService = {
  getFlights,
  getFlight,
  getDestination,
  getAirline,
};

export default SchipholService;
