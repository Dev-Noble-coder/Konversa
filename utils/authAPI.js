import axiosInstance from "./axiosInstance";
import { toast } from "sonner";

/**
 * Generic API wrapper for authenticated requests.
 * @param {string} method - HTTP method (get, post, put, delete, etc.)
 * @param {string} endpoint - API endpoint URL
 * @param {Object} payload - Data to send (body for post/put/patch, params for get)
 * @param {Object} config - Additional axios configuration
 * @returns {Promise<any>} - The response data
 */
export async function authAPI(method, endpoint, payload = {}, config = {}) {
  try {
    const response = await axiosInstance({
      method: method.toLowerCase(),
      url: endpoint,
      data: ["post", "put", "patch", "delete"].includes(method.toLowerCase()) ? payload : undefined,
      params: method.toLowerCase() === "get" ? payload : undefined,
      ...config,
    });

    return response.data;
  } catch (error) {
    console.error("Auth API Error:", error);
    const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred";
    toast.error(errorMessage);
    throw error.response?.data || error.message;
  }
}
