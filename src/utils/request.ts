import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_PROXY_HTTP,
  timeout: 60 * 1000,
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
  (config: AxiosRequestConfig<any>) => {
    return config;
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
