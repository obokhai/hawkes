import axios from "axios";
import Cookies from "js-cookie";
const api = axios.create({
  baseURL: "https://propertyapi-monolithic.onrender.com/api/v1",
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token") || localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for refresh logic
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // If 401 and not already retried
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Call refresh token endpoint
        const res = await axios.post(
          "https://propertyapi-monolithic.onrender.com/api/v1/auth/refresh-token"
        );
        const newToken = res.data.data.accessToken;
        // Save new token
        Cookies.set("token", token);
        localStorage.setItem("token", token);
        // Update header and retry original request
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Optionally handle logout here
        Cookies.remove("token");
        localStorage.removeItem("token");
        window.location.href = "/?screen=login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;