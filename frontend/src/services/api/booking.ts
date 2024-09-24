import { bookingInstance } from "./baseUnit";
import axios, { CancelTokenSource } from "axios";

const getReservations = () => {
  return bookingInstance.get(`/api/get`);
};

const create = (body: { flightID: String; scheduleTime: String }) => {
  return bookingInstance.post(`/api/create`, body);
};

const BookingService = {
  getReservations,
  create,
};

export default BookingService;
