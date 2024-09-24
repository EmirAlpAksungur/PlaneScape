import axios from "axios";

const baseUrl = process.env.iata;

export const iataInstance = axios.create({
  baseURL: `${baseUrl}`,
});

export const unAuthConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

const schipholBaseUrl = process.env.schiphol;

export const schipholInstance = axios.create({
  baseURL: `${schipholBaseUrl}`,
});

const bookingBaseUrl = process.env.booking;

export const bookingInstance = axios.create({
  baseURL: `${bookingBaseUrl}`,
});
