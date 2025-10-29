import React from "react";
import { RxAvatar } from "react-icons/rx";

function ChatInterface() {
  return (
    <main className="flex-grow grid grid-cols-1 md:grid-cols-2 h-full">
      {/* Left Half */}
      <div className="flex flex-col items-center justify-center text-center">
        <RxAvatar size={300} className="text-gray-700 mb-4" />
        <p className="text-3xl font-medium text-gray-900">How can I help?</p>
      </div>

      {/* Right Half */}
      <div className="relative flex items-end justify-center pb-10">
        <div className="flex items-center space-x-2 w-full max-w-xl bg-white p-3 rounded-xl shadow-md">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
            Send
          </button>
        </div>
      </div>
    </main>
  );
}

export default ChatInterface;
