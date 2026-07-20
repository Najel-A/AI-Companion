"""Outgoing response schemas."""

from pydantic import BaseModel


class RootResponse(BaseModel):
    service: str
    status: str


class HealthResponse(BaseModel):
    status: str


class ChatResponse(BaseModel):
    response: str
