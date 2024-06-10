import axios from "axios";

const api = axios.create({
  baseURL: "/",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      const { url } = originalRequest;
      if (url.includes("/api/auth/login")) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      try {
        const res = await axios.post("/api/auth/refresh_token");
        if (res.status === 200) {
          const { accessToken } = res.data;
          localStorage.setItem("accessToken", accessToken);

          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

          return api(originalRequest);
        }
      } catch (err) {
        console.error("Failed to refresh token:", err);
        // Navigate to login page if refresh token fails
        navigateToLogin();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

const navigateToLogin = () => {
  localStorage.removeItem("accessToken");
  window.location.href = "/login";
};

export default api;
