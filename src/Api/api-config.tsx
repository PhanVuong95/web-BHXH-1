import axios from "axios";
import { APP_CONFIG } from "../utils/constants";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: APP_CONFIG.BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.dismiss();
      toast.info("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("profile");

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
    return Promise.reject(error);
  }
);

export default api;
