import React, { useContext, useState } from "react";
import { RxReload, RxTrash } from "react-icons/rx";
import Navigation from "../components/Navigation";
import { ChatContext } from "../context/ChatContext";

function Trash() {
  const { chats, setChats } = useContext(ChatContext);

  const [trashedChats, setTrashedChats] = useState([
    "Old Chat 1",
    "Old Chat 2",
    "Old Chat 3",
    "Old Chat 4",
  ]);

  const handleRecoverChat = (chatName) => {
    if (!chats.includes(chatName)) {
      setChats([...chats, chatName]);
    }
    setTrashedChats(trashedChats.filter((chat) => chat !== chatName));
  };

  const handleDeleteForever = (chatName) => {
    setTrashedChats(trashedChats.filter((chat) => chat !== chatName));
  };

  return (
    <div className="flex h-screen bg-[#C0E4FF] text-gray-900">
      <Navigation />
      <div className="flex flex-col items-center justify-center flex-1">
        {/* Header */}
        <h1 className="text-3xl font-semibold mb-8">Trash</h1>

        {/* Trash list */}
        <div className="flex flex-col space-y-4 w-full max-w-3xl px-8">
          {trashedChats.length > 0 ? (
            trashedChats.map((chat, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-white shadow-md rounded-lg px-6 py-4 hover:shadow-lg transition"
              >
                <span className="text-gray-800 font-medium">{chat}</span>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleRecoverChat(chat)}
                    title="Recover Chat"
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    <RxReload size={22} />
                  </button>
                  <button
                    onClick={() => handleDeleteForever(chat)}
                    title="Delete Forever"
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <RxTrash size={22} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-700 text-center mt-10 text-lg">
              No chats in Trash.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Trash;
