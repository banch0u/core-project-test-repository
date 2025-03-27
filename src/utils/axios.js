// import axios from "axios";
// export const ACCESS_TOKEN_KEY = "token";
// export const REFRESH_TOKEN_KEY = "refreshToken";

// // Base Axios instance
// const api = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

// // Function to refresh token
// const refreshAccessToken = async () => {
//   try {
//     const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY); // Adjust storage as needed
//     const response = await api.post(
//       `/profile/refresh-token`,
//       {},
//       {
//         headers: {
//           RefreshToken: `${refreshToken}`, // Send refresh token as a header
//         },
//       }
//     );
//     localStorage.setItem(ACCESS_TOKEN_KEY, response.data.accessToken);
//     return response.data.accessToken;
//   } catch (error) {
//     console.error("Failed to refresh token:", error);
//     throw error; // Handle logout or token expiration
//   }
// };

// // Add Axios request interceptor
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem(ACCESS_TOKEN_KEY); // Get token from storage
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     console.log(config);
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Add Axios response interceptor
// api.interceptors.response.use(
//   (response) => response, // Pass through successful responses
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.code === "ERR_NETWORK" && !originalRequest._retry) {
//       originalRequest._retry = true; // Prevent infinite retry loops
//       try {
//         const newAccessToken = await refreshAccessToken();
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return api(originalRequest); // Retry the failed request with the new token
//       } catch (refreshError) {
//         // Handle failed token refresh logic (e.g., logout user)
//         console.error("Token refresh failed:", refreshError);
//         window.location.href = "/docflow/login"; //Comment this to prevent logout
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error); // Reject all other errors
//   }
// );

// export default api;

//DEV OPTION
import axios from "axios";
export const ACCESS_TOKEN_KEY = "token";
export const REFRESH_TOKEN_KEY = "refreshToken";
let baseUrl;
if (window.location.hostname === "localhost") {

  baseUrl = process.env.REACT_APP_BASE_URL;
} else {
  baseUrl = window.location.origin + "/api";
}
// Base Axios instance
const api = axios.create({
  baseURL: baseUrl,
});

// Function to refresh token
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY); // Adjust storage as needed
    const response = await axios.post(
      baseUrl + "/profile/refresh-token",
      {},
      {
        headers: {
          RefreshToken: `${refreshToken}`, // Send refresh token as a header
        },
      }
    );
    localStorage.setItem(ACCESS_TOKEN_KEY, response.data.accessToken);
    return response.data.accessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw error; // Handle logout or token expiration
  }
};

// Add Axios request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY); // Get token from storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add Axios response interceptor
api.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite retry loops
      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest); // Retry the failed request with the new token
      } catch (refreshError) {
        // Handle failed token refresh logic (e.g., logout user)
        console.error("Token refresh failed:", refreshError);
        window.location.href = "/docflow/login"; //Comment this to prevent logout
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error); // Reject all other errors
  }
);

export default api;
