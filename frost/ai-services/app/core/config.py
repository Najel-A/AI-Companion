"""Application configuration loaded from environment variables."""

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Runtime settings for the Frost AI Service."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = "Frost AI Service"
    app_env: str = "development"
    host: str = "0.0.0.0"
    port: int = 8000

    # Comma-separated list in .env, e.g. http://localhost:3000,http://localhost:5173
    cors_origins: str = "http://localhost:3000,http://localhost:5173"

    # Reserved for future Ollama integration
    ollama_base_url: str = "http://localhost:11434"
    ollama_model: str = "llama3.2"

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    """Cached settings instance so env is read once."""
    return Settings()
