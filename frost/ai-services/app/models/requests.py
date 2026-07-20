"""Incoming request schemas."""

from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    """Body for POST /chat."""

    message: str = Field(..., min_length=1, description="User message to the AI service")
