import React, { useState } from "react";
import { RxAvatar, RxHamburgerMenu } from "react-icons/rx";

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");

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
          <div className="absolute right-4">
            <div className="relative inline-block text-left">
              <button
                onClick={() => setShowLang((prev) => !prev)}
                className="inline-flex justify-center items-center w-28 px-3 py-2 bg-gray-100 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              >
                {selectedLang}
                <svg
                  className="w-4 h-4 ml-2 -mr-1 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showLang && (
                <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                  {["English", "French", "Spanish"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setSelectedLang(lang);
                        setShowLang(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
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
