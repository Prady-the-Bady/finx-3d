"use client";

export default function ChatMessage({ from, text }: { from: "user" | "ai"; text: string }) {
  return (
    <div className={`flex ${from === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-sm p-3 rounded-lg ${
          from === "user" ? "bg-purple-500 text-white" : "bg-[#2e2e44] text-white"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
