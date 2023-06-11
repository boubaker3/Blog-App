import axios from "axios";
const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: "http://localhost:82/",
});
axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export default axiosInstance;
