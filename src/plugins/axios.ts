import axios, { AxiosRequestConfig } from "axios";
import { RESAS_API_KEY } from "../config/app";

const defaultConfig: AxiosRequestConfig = {
  baseURL: "https://opendata.resas-portal.go.jp/api/v1/",
  timeout: 7000,
  headers: { "X-API-KEY": RESAS_API_KEY },
};
console.log(defaultConfig);
export const axiosInstance = axios.create(defaultConfig);
