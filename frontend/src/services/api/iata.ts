import { iataInstance, unAuthConfig } from "./baseUnit";
import axios, { CancelTokenSource } from "axios";

let cancelToken: null | CancelTokenSource;
const get = (text: string) => {
  if (cancelToken) {
    cancelToken.cancel();
  }
  cancelToken = axios.CancelToken.source();
  return iataInstance.get(`/search?q=${text}`, unAuthConfig);
};

const iataService = {
  get,
};

export default iataService;
