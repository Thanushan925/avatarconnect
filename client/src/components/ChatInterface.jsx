import React, { useState, useRef, useEffect, useContext } from "react";
import { RxAvatar } from "react-icons/rx";
import Navigation from "../components/Navigation";
import { ChatContext } from "../context/ChatContext";
import axios from "axios";

function ChatInterface() {
  const { chats, setChats, selectedChat, setSelectedChat } =
    useContext(ChatContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Load messages when chat changes
  useEffect(() => {
    if (selectedChat?.messages) {
      setMessages(selectedChat.messages);
    } else {
      setMessages([]);
    }
  }, [selectedChat]);

  // Scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // If no chat selected, make one
    let activeChat = selectedChat;
    if (!activeChat) {
      const newChat = {
        _id: Date.now().toString(),
        name: `Chat ${chats.length + 1}`,
        messages: [],
      };
      setChats([...chats, newChat]);
      setSelectedChat(newChat);
      activeChat = newChat;
    }

    // Create message locally
    const newMessage = { sender: "user", text: input.trim() };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput("");

    // Update chat in context
    setChats((prev) =>
      prev.map((chat) =>
        chat._id === activeChat._id ? { ...chat, messages: updatedMessages } : chat
      )
    );

    // Optional: save to backend (commented for now)
    /*
    await axios.post(`http://localhost:5000/api/chats/${activeChat._id}/messages`, {
      sender: "user",
      text: input.trim(),
    });
    */

    // Fake bot reply
    setTimeout(() => {
      const botReply = { sender: "bot", text: "(Placeholder)" };
      const newChatMessages = [...updatedMessages, botReply];
      setMessages(newChatMessages);

      setChats((prev) =>
        prev.map((chat) =>
          chat._id === activeChat._id
            ? { ...chat, messages: newChatMessages }
            : chat
        )
      );
    }, 500);
  };

  return (
    <div className="flex h-screen bg-[#C0E4FF] text-gray-900">
      <Navigation />

      <main className="flex-grow grid grid-cols-1 md:grid-cols-2 h-full mt-16">
        {/* Left Half */}
        <div className="flex flex-col items-center justify-center text-center p-6">
          <RxAvatar size={300} className="text-gray-700 mb-4" />
          <p className="text-3xl font-medium text-gray-900">How can I help?</p>
        </div>

        {/* Right Half */}
        <div className="relative flex flex-col bg-[#C0E4FF] h-full">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="flex items-end justify-center h-full pb-75">
                <p className="text-gray-500 text-center text-lg">
                  Start typing to begin a chat...
                </p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-2xl max-w-xs break-words shadow-md ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-white text-gray-900 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input bar */}
          <form
            onSubmit={handleSendMessage}
            className="flex items-center space-x-2 w-full max-w-xl mx-auto bg-white p-3 rounded-xl shadow-md mb-8"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Send
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default ChatInterface;
