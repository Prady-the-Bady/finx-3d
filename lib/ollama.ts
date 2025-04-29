export async function getOllamaAdvice(prompt: string) {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3:latest", // <- Make sure this matches your model running locally
      prompt: prompt,
      stream: false,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch AI response");
  }

  const data = await response.json();
  return data.response;
}
