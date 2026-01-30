import axios from "axios";

export const ACCESS_TOKEN_KEY = "token";
export const REFRESH_TOKEN_KEY = "refreshToken";

let baseUrl;
if (window.location.hostname === "localhost") {
  baseUrl = process.env.REACT_APP_BASE_URL;
} else {
  baseUrl = window.location.origin + "/api";
}

const api = axios.create({ baseURL: baseUrl });

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // if no response (network error etc.)
    if (!error.response) return Promise.reject(error);

    if (error.response.status === 401 && !originalRequest?._redirected) {
      originalRequest._redirected = true;

      const basePath = window.location.pathname.split("/")[1];
      const redirectPath = `/${basePath}/login`;

      // optional: clear tokens
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);

      window.location.href = redirectPath;
      return; // stop here
    }

    return Promise.reject(error);
  }
);

export default api;
