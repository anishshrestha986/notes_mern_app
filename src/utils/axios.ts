/* eslint-disable no-param-reassign */
import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import { getLocalStorage } from "./storage";

axios.defaults.headers.post["Content-Type"] = "application/json";

const createApi = (path: string) => {
  const api = axios.create({
    baseURL: `${process.env.API_URL}${path}`,
    timeout: 50000,
    headers: {
      "Content-Type": "application/json",
    },
  });
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (config.headers === undefined) {
        config.headers = {} as AxiosHeaders;
      }
      const token = getLocalStorage("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  return api;
};

export default createApi;
