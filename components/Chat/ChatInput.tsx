"use client";

import { useState } from "react";

export default function ChatInput({ onSend }: { onSend: (prompt: string) => void }) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onSend(prompt.trim());
    setPrompt("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex mt-4">
      <input
        type="text"
        className="flex-1 p-3 rounded-l-lg bg-[#121221] text-white placeholder-gray-400"
        placeholder="Ask your investment query..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-6 rounded-r-lg">
        Send
      </button>
    </form>
  );
}
