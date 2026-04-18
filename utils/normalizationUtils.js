/**
 * Normalizes email fields in an object by converting them to lowercase.
 * Recursively handles nested objects.
 * @param {Object} data - The data to normalize.
 * @returns {Object} - The normalized data.
 */
export const normalizeEmailFields = (data) => {
  if (!data || typeof data !== "object") return data;

  const normalized = Array.isArray(data) ? [] : {};

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      let value = data[key];

      // Deep normalize if it's an object or array
      if (value && typeof value === "object") {
        value = normalizeEmailFields(value);
      }

      // Lowercase if the key contains "email"
      if (typeof key === "string" && key.toLowerCase().includes("email") && typeof value === "string") {
        normalized[key] = value.toLowerCase().trim();
      } else {
        normalized[key] = value;
      }
    }
  }

  return normalized;
};
