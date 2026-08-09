"""Service for communicating with the local Ollama instance."""

from ollama import chat

from app.models.requests import ChatRequest
from app.models.responses import ChatResponse


class OllamaService:
    """Business logic for generating AI responses through Ollama."""

    def generate_chat_response(self, payload: ChatRequest) -> ChatResponse:
        """Generate a response using the configured Ollama model."""

        response = chat(
            model="qwen3:8b",
            messages=[
                {
                    "role": "user",
                    "content": payload.message,
                }
            ],
        )

        return ChatResponse(
            response=response["message"]["content"]
        )


ollama_service = OllamaService()