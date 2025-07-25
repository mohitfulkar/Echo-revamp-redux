// src/interceptors/loggerInterceptor.ts
import axios from "axios";

export const setupAxiosLogger = () => {
  // Request Logger
  axios.interceptors.request.use(
    (config) => {
      console.log(
        `[Request] ${config.method?.toUpperCase()} ${config.url}`,
        config
      );
      return config;
    },
    (error) => {
      console.error("[Request Error]", error);
      return Promise.reject(error);
    }
  );

  // Response Logger
  axios.interceptors.response.use(
    (response) => {
      console.log(
        `[Response] ${response.status} ${response.config.url}`,
        response.data
      );
      return response;
    },
    (error) => {
      if (error.response) {
        console.error(
          `[Response Error] ${error.response.status} ${error.config.url}`,
          error.response.data
        );
      } else {
        console.error("[Network Error]", error.message);
      }
      return Promise.reject(error);
    }
  );
};
