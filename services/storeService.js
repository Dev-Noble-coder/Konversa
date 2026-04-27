import axios from '../utils/axiosInstance';

// API_BASE_URL is handled by the axiosInstance baseURL


/**
 * Creates a new store for the authenticated user.
 * @param {Object} storeData - { name: string }
 */
export async function createStore(storeData) {
  const response = await axios.post(`api/stores`, storeData);
  console.log(response)
  return response.data;
}

/**
 * Fetches all stores for the authenticated user.
 */
export async function getStores() {
  const response = await axios.get(`api/stores`);
  return response.data;
}

/**
 * Connects a Telegram channel to a store.
 * @param {string} sqid - The store's sqid returned on creation.
 * @param {string} channelUsername - The Telegram channel username (without @).
 */
export async function connectTelegram(sqid, channelUsername) {
  const response = await axios.post(`api/stores/connect-telegram`, {
    store: sqid,
    channel_username: channelUsername,
  });
  return response.data;
}

/**
 * Deletes a store.
 * @param {string} sqid - The store's sqid.
 */
export async function deleteStore(sqid) {
  const response = await axios.delete(`api/stores/${sqid}`);
  return response.data;
}

/**
 * Disconnects the Telegram bot from a store.
 * @param {string} sqid - The store's sqid.
 */
export async function disconnectTelegram(sqid) {
  const response = await axios.post(`api/stores/disconnect-telegram`, {}, {
    params: {
      store: sqid,
    }
  });
  return response.data;
}
