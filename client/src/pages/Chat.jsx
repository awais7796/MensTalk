import React, { useState, useRef, useEffect } from "react";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Ref for auto-scroll
  const chatEndRef = useRef(null);

  // Scroll to bottom whenever messages update
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages((prev) => [...prev, { text: message, sender: "user" }]);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="h-screen flex flex-col bg-[#0f0e0d] text-[#E8DCC4]">
      {/* HEADER */}
      <div className="w-full border-b border-[#2b211d] bg-[#1a1412] shadow-[0_2px_10px_rgba(0,0,0,0.3)] p-4">
        <h1 className="text-2xl font-bold tracking-wide text-[#aa8247]">
          MansTalk Chat
        </h1>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto px-4 py-6 flex justify-center">
        <div className="w-full max-w-2xl space-y-4">
          {/* Welcome area (only if 0 messages) */}
          {messages.length === 0 && (
            <div className="text-center mt-20">
              <h2 className="text-3xl font-bold text-[#aa8247] mb-2">
                Welcome to MansTalk
              </h2>
              <p className="text-[#CFC4AA] opacity-80 text-lg">
                Speak your mind — No judgement. No cringe. Just truth.
              </p>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-3 rounded-2xl max-w-xs shadow-md
                ${
                  msg.sender === "user"
                    ? "bg-[#aa8247] text-black rounded-br-none"
                    : "bg-[#1c1714] text-[#E8DCC4] rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Auto-scroll anchor */}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* INPUT AREA */}
      <div className="border-t border-[#2b211d] bg-[#1a1412] p-4">
        <div className="max-w-2xl mx-auto flex gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 bg-[#2b241f] text-[#E8DCC4] placeholder-[#AFA48D]
                       border border-[#3a2f28] rounded-xl
                       focus:outline-none focus:ring-2 focus:ring-[#aa8247]"
          />

          <button
            onClick={handleSend}
            className="bg-[#aa8247] hover:bg-[#8f6c3c] transition px-6 py-3 
                       rounded-xl font-semibold text-black shadow-[0_4px_15px_rgba(170,130,71,0.4)]"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
