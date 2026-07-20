"""Chat API routes."""

from fastapi import APIRouter

from app.models.requests import ChatRequest
from app.models.responses import ChatResponse, HealthResponse, RootResponse
from app.services.ollama_service import ollama_service

router = APIRouter()


@router.get("/", response_model=RootResponse)
def root() -> RootResponse:
    """Service identity endpoint."""
    return RootResponse(service="Frost AI Service", status="running")


@router.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    """Liveness probe for local tooling and future orchestration."""
    return HealthResponse(status="healthy")


@router.post("/chat", response_model=ChatResponse)
def chat(payload: ChatRequest) -> ChatResponse:
    """Accept a user message and return a mocked AI response (no Ollama yet)."""
    return ollama_service.generate_chat_response(payload)
