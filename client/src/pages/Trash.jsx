import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { RxReload, RxTrash } from "react-icons/rx";
import { getDeletedChats, restoreChat, deleteChatPermanent } from "../api";

function Trash() {
  const [trashedChats, setTrashedChats] = useState([]);

  useEffect(() => {
    loadTrashed();
  }, []);

  const loadTrashed = async () => {
    try {
      // ⚡ Load localStorage trash first (instant)
      const localTrash = JSON.parse(localStorage.getItem("trash")) || [];
      setTrashedChats(localTrash);

      // 🔄 Then try loading from DB in the background
      try {
        const res = await getDeletedChats();
        const dbTrash = res.data || [];
        if (dbTrash.length > 0) {
          // Merge and remove duplicates
          const merged = [
            ...dbTrash,
            ...localTrash.filter(
              (local) => !dbTrash.some((db) => db._id === local._id)
            ),
          ];
          setTrashedChats(merged);
        }
      } catch {
        console.warn("No deleted chats from DB or server slow.");
      }
    } catch (err) {
      console.error("Error loading trashed chats:", err);
    }
  };

  const handleRecoverChat = async (id) => {
    const isMongoId = /^[0-9a-fA-F]{24}$/.test(id);

    if (isMongoId) {
      await restoreChat(id);
    } else {
      const localTrash = JSON.parse(localStorage.getItem("trash")) || [];
      const updatedTrash = localTrash.filter((chat) => chat._id !== id);
      localStorage.setItem("trash", JSON.stringify(updatedTrash));
    }

    setTrashedChats((prev) => prev.filter((chat) => chat._id !== id));
  };

  const handleDeleteForever = async (id) => {
    const isMongoId = /^[0-9a-fA-F]{24}$/.test(id);

    if (isMongoId) {
      await deleteChatPermanent(id);
    } else {
      const localTrash = JSON.parse(localStorage.getItem("trash")) || [];
      const updatedTrash = localTrash.filter((chat) => chat._id !== id);
      localStorage.setItem("trash", JSON.stringify(updatedTrash));
    }

    setTrashedChats((prev) => prev.filter((chat) => chat._id !== id));
  };

  return (
    <div className="flex h-screen bg-[#C0E4FF] text-gray-900">
      <Navigation />
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-3xl font-semibold mb-8">Trash</h1>

        <div className="flex flex-col space-y-4 w-full max-w-3xl px-8">
          {trashedChats.length > 0 ? (
            trashedChats.map((chat) => (
              <div
                key={chat._id}
                className="flex items-center justify-between bg-white shadow-md rounded-lg px-6 py-4 hover:shadow-lg transition"
              >
                <span className="text-gray-800 font-medium">{chat.name || chat.title}</span>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleRecoverChat(chat._id)}
                    title="Recover Chat"
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    <RxReload size={22} />
                  </button>
                  <button
                    onClick={() => handleDeleteForever(chat._id)}
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
