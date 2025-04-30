export const queryString = (data) => {
  const query = Object.entries(data)
    .map(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        return null; // Ignore undefined, null, or empty values
      }

      // Check if value is a string representing an array, e.g., "[0,19]"
      if (
        typeof value === "string" &&
        value.startsWith("[") &&
        value.endsWith("]")
      ) {
        value = value.slice(1, -1); // Remove the brackets without encoding
        return `${key}=${value}`; // Skip encoding for this case
      }

      // Default case: encode the key and value
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .filter(Boolean) // Filter out any null values
    .join("&");

  return query ? `${query}` : "";
};
