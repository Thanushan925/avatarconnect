import React, { useState } from "react";
import Navigation from "../components/Navigation";

function Settings() {
  const [isToggled, setIsToggled] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("Option 1");

  return (
    <div className="flex h-screen bg-[#C0E4FF] text-gray-900">
      <Navigation />
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-3xl font-semibold mb-8">Settings</h1>

        <div className="flex flex-col space-y-4 w-full max-w-3xl px-8">
          {/* Setting 1 - Toggle */}
          <div className="flex items-center justify-between bg-white shadow-md rounded-lg px-6 py-4 hover:shadow-lg transition">
            <span className="text-gray-800 font-medium">Dark Mode</span>
            <button
              onClick={() => setIsToggled(!isToggled)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                isToggled ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  isToggled ? "translate-x-6" : ""
                }`}
              ></span>
            </button>
          </div>

          {/* Setting 2 - Dropdown */}
          <div className="flex items-center justify-between bg-white shadow-md rounded-lg px-6 py-4 hover:shadow-lg transition">
            <span className="text-gray-800 font-medium">AI Chatbot Language</span>
            <select
              value={dropdownValue}
              onChange={(e) => setDropdownValue(e.target.value)}
              className="border rounded-md px-2 py-1 text-sm bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              <option>English</option>
              <option>French</option>
              <option>Spanish</option>
            </select>
          </div>

          {/* Setting 3 - Button */}
          <div className="flex items-center justify-between bg-white shadow-md rounded-lg px-6 py-4 hover:shadow-lg transition">
            <span className="text-gray-800 font-medium">Ontario Tech University</span>
            <button className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition">
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
