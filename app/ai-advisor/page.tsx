'use client';

import { useState } from "react";
import { getOllamaAdvice } from "@/lib/ollama";

export default function AIAdvisorPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAsk() {
    setLoading(true);
    const advice = await getOllamaAdvice(query);
    setResult(advice);
    setLoading(false);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl mb-4 font-bold">AI Investment Advisor</h1>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask about investment strategies..."
        className="w-full p-2 border rounded mb-4"
        rows={4}
      />
      <button
        onClick={handleAsk}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? "Thinking..." : "Ask Advisor"}
      </button>
      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold mb-2">Advice:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}