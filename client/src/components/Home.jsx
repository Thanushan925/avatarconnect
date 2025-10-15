import React, { useState } from "react";
import { RxAvatar, RxHamburgerMenu } from "react-icons/rx";

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#C0E4FF] text-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        `}
      >
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
        </div>
        <div className="p-4 flex flex-col space-y-3">
          <button className="text-left px-2 py-1 rounded hover:bg-gray-100">New chat</button>
          <button className="text-left px-2 py-1 rounded hover:bg-gray-100">Settings</button>
          <button className="text-left px-2 py-1 rounded hover:bg-gray-100">Trash</button>

          <div className="mt-4 font-semibold">Chats</div>
          <button className="text-left px-2 py-1 rounded hover:bg-gray-100">Chat 1</button>
          <button className="text-left px-2 py-1 rounded hover:bg-gray-100">Chat 2</button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Top bar */}
        <header className="flex items-center justify-center relative p-4 bg-white shadow-sm">
          {/* Hamburger menu top-left */}
          <button
            className="absolute left-4"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <RxHamburgerMenu size={24} />
          </button>

          {/* Title centered */}
          <h1 className="text-2xl font-semibold text-gray-900">AvatarConnect</h1>

          {/* Language dropdown top-right */}
          <select className="absolute right-4 border rounded-md px-2 py-1 text-sm bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400">
            <option>English</option>
            <option>French</option>
            <option>Spanish</option>
          </select>
        </header>

        {/* Center chat content */}
        <main className="flex-grow flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <RxAvatar size={64} className="text-gray-700" />
            <p className="text-xl font-medium text-gray-900">How can I help?</p>
          </div>
        </main>

        {/* Bottom input */}
        <footer className="absolute bottom-6 w-full flex justify-center z-10">
          <div className="flex items-center space-x-2 w-full max-w-2xl bg-white p-3 rounded-xl shadow-md">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Send
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
