import useTokenStore from "../stores/tokenStore";
import axios from "axios";

export const api = axios.create({
  // baseURL: "http://192.168.1.67:5007/api/v1/",
  baseURL: "https://form.upliftsolutions.com.np/api/v1/",
});

// Setup request interceptor
api.interceptors.request.use(
  (config) => {
    const token = useTokenStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
