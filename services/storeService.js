import axios from '../utils/axiosInstance';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://konversa-kpyx.onrender.com/';

/**
 * Creates a new store for the authenticated user.
 * @param {Object} storeData - { name: string }
 */
export async function createStore(storeData) {
  const response = await axios.post(`${API_BASE_URL}api/stores/`, storeData);
  console.log(response)
  return response.data;
}

/**
 * Fetches all stores for the authenticated user.
 */
export async function getStores() {
  const response = await axios.get(`${API_BASE_URL}api/stores/list`);
  return response.data;
}

/**
 * Connects a Telegram channel to a store.
 * @param {string} sqid - The store's sqid returned on creation.
 * @param {string} channelUsername - The Telegram channel username (without @).
 */
export async function connectTelegram(sqid, channelUsername) {
  const response = await axios.post(`${API_BASE_URL}api/stores/connect-telegram/`, {
    store: sqid,
    channel_username: channelUsername,
  });
  return response.data;
}
