import React, { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [trash, setTrash] = useState([]);

  // Example functions for later expansion
  const addChat = (name) => setChats((prev) => [...prev, name]);
  const deleteChat = (name) =>
    setChats((prev) => prev.filter((chat) => chat !== name));
  const restoreChat = (name) => addChat(name);

  return (
    <ChatContext.Provider value={{ chats, setChats, selectedChat, setSelectedChat }}>
      {children}
    </ChatContext.Provider>
  );
};