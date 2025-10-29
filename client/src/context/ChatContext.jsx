import React, { createContext, useState } from "react";

export const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [chats, setChats] = useState([
    "Chat 1",
    "Chat 2",
    "Chat 3",
  ]);

  // Example functions for later expansion
  const addChat = (name) => setChats((prev) => [...prev, name]);
  const deleteChat = (name) =>
    setChats((prev) => prev.filter((chat) => chat !== name));
  const restoreChat = (name) => addChat(name);

  return (
    <ChatContext.Provider value={{ chats, setChats, addChat, deleteChat, restoreChat }}>
      {children}
    </ChatContext.Provider>
  );
}
