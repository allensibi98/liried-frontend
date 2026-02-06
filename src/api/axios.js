import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle error responses
    if (error.response) {
      const { status } = error.response;

      // Token expired or unauthorized
      if (status === 401 || status === 403) {
        localStorage.removeItem("token");
        window.location.href = "/";
        return Promise.reject(new Error("Session expired. Please login again."));
      }

      // Rate limited
      if (status === 429) {
        return Promise.reject(
          new Error("Too many requests. Please try again later.")
        );
      }

      // Server error
      if (status >= 500) {
        return Promise.reject(
          new Error("Server error. Please try again later.")
        );
      }

      // Return API error message
      const message =
        error.response.data?.message || "An error occurred. Please try again.";
      return Promise.reject(new Error(message));
    }

    // Network error
    if (error.request) {
      return Promise.reject(
        new Error("Network error. Please check your connection.")
      );
    }

    // Other errors
    return Promise.reject(error);
  }
);

export default api;
