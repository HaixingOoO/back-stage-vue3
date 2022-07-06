import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import qs from "qs";
const PROXY_HTTP = import.meta.env.VITE_APP_PROXY_HTTP;

const request = axios.create({
  baseURL: PROXY_HTTP,
  timeout: 60 * 1000,
  withCredentials: true,
});

request.interceptors.request.use(
  (config: AxiosRequestConfig<any>) => {
    config.data = qs.stringify(config.data);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error && error.response.status) {
      switch (error.response.status) {
        default:
          console.log(error.response.status);
      }
    }
    return Promise.reject(error);
  }
);

export default request;
