import axios from '../utils/axiosInstance';

// API_BASE_URL is handled by the axiosInstance baseURL


/**
 * Creates a new product for a specific store.
 * @param {FormData} productData - FormData containing title, description, price, stock, image, and store (sqid).
 */
export async function createProduct(productData) {
  const response = await axios.post(`api/products`, productData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

/**
 * Fetches all products for a specific store.
 * @param {string} storeSqid - The store's sqid.
 * @param {Object} params - Optional search and pagination parameters.
 */
export async function getProducts(storeSqid, { search = '', page = 1 } = {}) {
  const response = await axios.get(`api/products`, {
    params: {
      store: storeSqid,
      search,
      page,
    }
  });
  return response.data;
}

/**
 * Deletes a product by its sqid.
 * @param {string} sqid - The product's sqid.
 */
export async function deleteProduct(sqid) {
  const response = await axios.delete(`api/products/${sqid}`);
  return response.data;
}
