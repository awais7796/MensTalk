import React, { useState } from "react";
import { useChat } from "../Hooks/useChat.jsx";
import ChatBubble from "../components/ui/ChatBubble.jsx";
import ChatInput from "../components/ui/ChatInput.jsx";

const Chat = () => {
  const { messages, sendMessage, isLoading } = useChat();
  const [inputValue, setInputValue] = useState("");

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;
    const text = inputValue.trim();
    setInputValue("");
    await sendMessage(text);
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

          {messages.map((msg, idx) => (
            <ChatBubble key={idx} msg={msg} />
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#2b241f] px-4 py-3 rounded-xl">
                <div className="flex gap-1">
                  <div
                    className="w-2 h-2 bg-[#aa8247] rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-[#aa8247] rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-[#aa8247] rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* INPUT AREA */}
      <ChatInput
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onSend={handleSend}
        disabled={isLoading}
      />
    </div>
  );
};

export default Chat;
