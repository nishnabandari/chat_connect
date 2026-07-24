import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});

// Create or Access Chat
export const accessChat = (userId) =>
  API.post("/chat", { userId });

// Fetch All Chats
export const fetchChats = () =>
  API.get("/chat");