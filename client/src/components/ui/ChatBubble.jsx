import React from "react";

const ChatBubble = ({ msg }) => {
  const isUser = msg.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-3 rounded-2xl max-w-xs shadow-md text-sm
          ${
            isUser
              ? "bg-[#aa8247] text-black rounded-br-none"
              : "bg-[#1c1714] text-[#E8DCC4] rounded-bl-none"
          }`}
      >
        {msg.text}
      </div>
    </div>
  );
};

export default ChatBubble;
