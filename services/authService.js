import { normalizeEmailFields } from "../utils/normalizationUtils";
import axiosInstance from "../utils/axiosInstance";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


/**
 * Retrieves the access token from session storage.
 */
export function getToken() {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem("token");
}

/**
 * Sets or removes the access token and user role in session storage.
 */
export function setToken(token) {
  if (typeof window === "undefined") return;
  if (token) {
    sessionStorage.setItem("token", token);
  } else {
    sessionStorage.removeItem("token");
  }
}

/**
 * Logs in the user with provided credentials.
 */
export async function login(userData) {
  const normalizedData = normalizeEmailFields(userData);
  const response = await axiosInstance.post(`api/auth/login`, normalizedData);
  return response.data;
}

/**
 * Registers a new user.
 */
export async function signup(userData) {
  const normalizedData = normalizeEmailFields(userData);
  const response = await axiosInstance.post(`api/auth/signup`, normalizedData);
  return response.data;
}

/**
 * Verifies OTP for email confirmation.
 */
export async function verifyOTP(userData) {
  const normalizedData = normalizeEmailFields(userData);
  const response = await axiosInstance.post(`api/auth/verify`, normalizedData);
  return response.data;
}

/**
 * Attemps to refresh the access token.
 */
export async function refreshToken() {
  const savedToken = getToken();
  try {
    const response = await axiosInstance.post(`api/auth/refresh`, {}, {
      headers: {
        Authorization: savedToken ? `Bearer ${savedToken}` : undefined,
      },
    });

    const data = response.data;
    if (data?.access_token) {
      setToken(data.access_token);
    }
    return data;
  } catch (error) {
    console.error(
      "Refresh token failed:",
      error.response?.data || error.message,
    );
    setToken(null);
    throw error;
  }
}

/**
 * Logs out the user by clearing the token.
 */
export function logout() {
  setToken(null);
  if (typeof window !== "undefined") {
    sessionStorage.clear();
  }
}

