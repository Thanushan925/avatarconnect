import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  RxHamburgerMenu,
  RxCross2,
  RxChatBubble,
  RxGear,
  RxTrash,
  RxPencil2,
} from "react-icons/rx";
import { ChatContext } from "../context/ChatContext";

function Navigation() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { chats, setChats } = useContext(ChatContext);
  const location = useLocation();
  const sidebarRef = useRef(null);

  const handleLinkClick = () => setSidebarOpen(false);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Chat Actions ---
  const handleDeleteChat = (idx) => {
    const updatedChats = chats.filter((_, i) => i !== idx);
    setChats(updatedChats);
  };

  const handleRenameChat = (idx) => {
    const newName = prompt("Enter new chat name:", chats[idx]);
    if (newName && newName.trim() !== "") {
      const updatedChats = [...chats];
      updatedChats[idx] = newName.trim();
      setChats(updatedChats);
    }
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out z-20
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
      `}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <RxCross2 size={24} /> : <RxHamburgerMenu size={24} />}
          </button>
        </div>

        <div className="p-4 flex flex-col space-y-3">
          {/* Sidebar Links */}
          <Link
            to="/"
            onClick={handleLinkClick}
            className={`flex items-center space-x-2 px-2 py-1 rounded hover:bg-gray-100 ${
              location.pathname === "/" ? "bg-gray-200 font-semibold" : ""
            }`}
          >
            <RxChatBubble size={18} />
            <span>New Chat</span>
          </Link>

          <Link
            to="/settings"
            onClick={handleLinkClick}
            className={`flex items-center space-x-2 px-2 py-1 rounded hover:bg-gray-100 ${
              location.pathname === "/settings" ? "bg-gray-200 font-semibold" : ""
            }`}
          >
            <RxGear size={18} />
            <span>Settings</span>
          </Link>

          <Link
            to="/trash"
            onClick={handleLinkClick}
            className={`flex items-center space-x-2 px-2 py-1 rounded hover:bg-gray-100 ${
              location.pathname === "/trash" ? "bg-gray-200 font-semibold" : ""
            }`}
          >
            <RxTrash size={18} />
            <span>Trash</span>
          </Link>

          {/* Chat List */}
          <div className="mt-4 font-semibold">Chats</div>
          {chats.map((chat, idx) => (
            <div
              key={idx}
              className="group flex items-center justify-between px-2 py-1 rounded hover:bg-gray-100 transition"
            >
              <button
                onClick={handleLinkClick}
                className="text-left flex-1 truncate"
              >
                {chat}
              </button>

              {/* Icons (only visible on hover) */}
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleRenameChat(idx)}
                  title="Rename Chat"
                  className="text-blue-600 hover:text-blue-800 transition"
                >
                  <RxPencil2 size={16} />
                </button>
                <button
                  onClick={() => handleDeleteChat(idx)}
                  title="Delete Chat"
                  className="text-red-600 hover:text-red-800 transition"
                >
                  <RxTrash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 flex items-center justify-center p-4 bg-white shadow-sm z-10">
        <button
          className="absolute left-4"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <RxCross2 size={24} /> : <RxHamburgerMenu size={24} />}
        </button>

        <h1 className="text-2xl font-semibold text-gray-900">AvatarConnect</h1>

        <select className="absolute right-4 border rounded-md px-2 py-1 text-sm bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400">
          <option>English</option>
          <option>French</option>
          <option>Spanish</option>
        </select>
      </header>
    </>
  );
}

export default Navigation;
