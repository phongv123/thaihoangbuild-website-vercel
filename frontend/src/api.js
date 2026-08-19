import axios from "axios";

const api = axios.create({
  baseURL: (
    import.meta.env.VITE_API_URL ||
    "http://localhost:4000/api"
  ).replace(/\/$/, ""),
  timeout: 15000,
});

// Tự động gửi token Admin
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("admin_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Nếu API trả 401 thì đăng xuất
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error?.response?.status === 401 &&
      window.location.pathname.startsWith("/admin") &&
      window.location.pathname !== "/admin/login"
    ) {
      localStorage.removeItem("admin_token");
      window.location.href = "/admin/login";
    }

    return Promise.reject(error);
  }
);

// Xử lý khi token hết hạn
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error?.response?.status === 401 &&
      window.location.pathname.startsWith("/admin") &&
      window.location.pathname !== "/admin/login"
    ) {
      localStorage.removeItem("admin_token");
      window.location.href = "/admin/login";
    }

    return Promise.reject(error);
  }
);

export default api;