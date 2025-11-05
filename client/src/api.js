import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/chats" });

// Chat endpoints
export const getChats = () => API.get("/");
export const getDeletedChats = () => API.get("/deleted");
export const createChat = (title = "New Chat") => API.post("/", { title });
export const renameChat = (id, title) => API.patch(`/${id}`, { title });
export const deleteChat = (id) => API.delete(`/${id}`);
export const restoreChat = (id) => API.patch(`/${id}/restore`);
export const deleteChatPermanent = (id) => API.delete(`/${id}/permanent`);

// Message endpoint (for saving messages)
export const addMessage = (chatId, message) =>
  API.post(`/${chatId}/messages`, message);
