import React from "react";

const ChatInput = ({ value, onChange, onSend, disabled = false }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !disabled) onSend();
  };

  return (
    <div className="border-t border-[#2b211d] bg-[#1a1412] p-4">
      <div className="max-w-2xl mx-auto flex gap-3">
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={disabled}
          className="flex-1 px-4 py-3 bg-[#2b241f] text-[#E8DCC4] placeholder-[#AFA48D]
                     border border-[#3a2f28] rounded-xl
                     focus:outline-none focus:ring-2 focus:ring-[#aa8247]
                     disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          onClick={onSend}
          disabled={disabled}
          className="bg-[#aa8247] hover:bg-[#8f6c3c] transition px-6 py-3 
                     rounded-xl font-semibold text-black shadow-[0_4px_15px_rgba(170,130,71,0.4)]
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#aa8247]"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
