import axios from "axios";

const baseUrl = process.env.path;

export const instance = axios.create({
  baseURL: `${baseUrl}`,
});

export const unAuthConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};
