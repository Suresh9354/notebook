import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"
    : "https://notebook-0lfa.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // optional (use if cookies/auth)
});

export default api;
