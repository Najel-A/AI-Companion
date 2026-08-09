// Placeholder for future Ollama / local LLM integration.
// Node has some issues with localhost, so we use 127.0.0.1 instead.


const AI_SERVICES_URL =
  process.env.AI_SERVICES_URL ?? "http://localhost:8000/chat";

console.log(AI_SERVICES_URL + "/chat");
export async function generateReply(_prompt: string) {
  const response = await fetch("http://127.0.0.1:8000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: _prompt,
    }),
  });
  console.log(response);
  if (!response.ok) {
    throw new Error("Failed to generate chat response");
  }

  const data = await response.json();
  return data.response;
}
