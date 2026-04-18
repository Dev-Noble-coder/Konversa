import axios from "axios";
import { getToken, setToken, refreshToken } from "../services/authService";
import { normalizeEmailFields } from "./normalizationUtils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Attach token on requests
axiosInstance.interceptors.request.use(
  (config) => {
    // Normalize email fields in payload or params
    if (config.data) {
      config.data = normalizeEmailFields(config.data);
    }
    if (config.params) {
      config.params = normalizeEmailFields(config.params);
    }

    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token expiration
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const data = await refreshToken();
        if (data?.access_token) {
          originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
          return axiosInstance(originalRequest);
        }
      } catch (err) {
        console.error("Auto-refresh failed → redirecting to login");
        if (typeof window !== "undefined") {
          sessionStorage.clear();
          window.location.href = "/login";
        }
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
