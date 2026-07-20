"""Ollama client placeholder.

Real Ollama HTTP calls will live here later. For now the service returns a mock reply
so the FastAPI layer and contract can be developed independently.
"""

from app.models.requests import ChatRequest
from app.models.responses import ChatResponse


class OllamaService:
    """Business logic for chat generation."""

    def generate_chat_response(self, payload: ChatRequest) -> ChatResponse:
        """Return a mocked AI response without calling Ollama."""
        # Intentionally unused until Ollama is wired up.
        _ = payload.message
        return ChatResponse(response="AI service is connected.")


ollama_service = OllamaService()
