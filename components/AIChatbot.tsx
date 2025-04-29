"use client";

import { useState } from "react";
import { getOllamaAdvice } from "@/lib/ollama";

export default function AIChatbot() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const reply = await getOllamaAdvice(input);
      setResponse(reply);
    } catch (err: any) {
      setResponse("❌ Error connecting to AI server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed right-6 bottom-6 w-96 p-4 bg-[#1b1b2f] rounded-xl shadow-2xl border border-purple-600">
      <h2 className="text-2xl font-bold text-purple-400 mb-2">💬 AI Advisor</h2>

      <textarea
        className="w-full p-3 rounded-lg bg-[#121221] text-white placeholder-gray-400 focus:outline-none mb-2"
        rows={3}
        placeholder="Ask about crypto investments, economy, etc..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleAsk}
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg text-white font-semibold mb-2"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {response && (
        <div className="mt-4 p-3 rounded-lg bg-[#121221] text-gray-300 whitespace-pre-line max-h-60 overflow-y-auto">
          {response}
        </div>
      )}
    </div>
  );
}
