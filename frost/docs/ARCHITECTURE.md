# Architecture review

This document captures the initial design review for Frost: what works in the proposed stack, what to change, and why.

## What works well

| Choice | Why it fits Frost |
|--------|-------------------|
| Next.js + FastAPI split | Clear UI vs AI/API boundary; you already know both |
| PostgreSQL + pgvector | One DB for relational data *and* vectors; no separate vector DB to operate |
| Ollama | Local inference, simple HTTP API, easy Docker deployment |
| Docker Compose | Matches Ubuntu-server deployment; reproducible services |
| Monorepo | Frontend, backend, and infra evolve together |

The overall flow — **frontend → backend → Ollama / Postgres** — is correct. Keep it.

---

## Recommended changes

### 1. Collapse `database/` and `ollama/` into `docker/`

Those folders are not applications; they are service config.

- `docker/postgres/` — init SQL (`CREATE EXTENSION vector;`)
- `docker/ollama/` — optional Modelfile or pull documentation
- Service definitions live in root `docker-compose.yml`

This avoids empty “fake packages” and matches how most Compose monorepos are laid out.

### 2. Defer LlamaIndex / LangChain until Phase 2

For Phase 1 (chat + store messages), call **Ollama’s HTTP API directly** from a small `services/ollama.py` client.

Reasons:

- You learn the raw request/response shape before wrapping it
- Fewer dependencies and less magic while debugging
- When RAG lands, prefer **LlamaIndex** over LangChain for this use case — it is document/index/retrieval-centric, which matches “engineering memory” better than LangChain’s broader agent toolkit

Revisit LangChain only if you later need heavy tool-calling / multi-agent workflows.

### 3. Plan streaming from the start (even if Phase 1 ships non-streaming)

Chat UX feels broken without token streaming. Design the chat API so it can grow into **Server-Sent Events (SSE)** without a rewrite:

- Phase 1a: `POST /api/chat` → full JSON response (simplest to verify end-to-end)
- Phase 1b: `POST /api/chat/stream` → SSE chunks

Same service method underneath; only the transport differs.

### 4. Use Alembic migrations from day one

Do not create tables with `Base.metadata.create_all()` as the long-term approach. Use **Alembic** so schema changes (documents, embeddings, metadata) are versioned and safe on your server.

### 5. Separate chat model from embedding model (config now, use later)

In Ollama you will typically run:

| Role | Example model |
|------|----------------|
| Chat / generation | `llama3.1`, `mistral`, `qwen2.5`, etc. |
| Embeddings (Phase 2) | `nomic-embed-text` |

Put both names in env/settings now so Phase 2 does not require a redesign.

### 6. Keep auth minimal for a personal instance

Frost runs on your hardware for one user. Phase 1: **no auth**, or a single shared API key via env if the port is exposed on a network.

Do not build OAuth / user tables until you actually need multi-user or public exposure.

### 7. Design Phase 1 schema with Phase 2 in mind

Minimal tables for MVP:

```
conversations
  id, title, created_at, updated_at

messages
  id, conversation_id, role (user|assistant|system), content, created_at
```

Leave room (do not implement yet) for:

```
documents / document_chunks
  + embedding vector column (pgvector)
  + source metadata (filename, project, date, tags)
```

Messages stay in the relational model; retrieved memories become **context injected into the prompt**, not a replacement for chat history.

### 8. Config via Pydantic Settings + `.env.example`

Centralize:

- `DATABASE_URL`
- `OLLAMA_BASE_URL`
- `OLLAMA_CHAT_MODEL`
- `OLLAMA_EMBED_MODEL` (unused until Phase 2)
- `CORS_ORIGINS`

No hardcoded hostnames inside services.

### 9. Skip heavy monorepo tooling

No Turborepo / Nx / shared packages for Phase 1. Two apps + Compose is enough. Revisit if the repo grows significantly.

---

## Target component responsibilities

```
frontend/
  Chat UI, conversation list, API client
  (no LLM logic, no DB access)

backend/app/api/
  HTTP routes only — thin, validate in, call services

backend/app/services/
  Chat orchestration, Ollama client, (later) retrieval + prompt assembly

backend/app/models/ + schemas/
  ORM ↔ DB, Pydantic ↔ API

backend/app/db/
  Engine, session dependency for FastAPI

docker-compose.yml
  postgres, ollama, backend, frontend (optional: frontend as compose service or run via npm locally)
```

### Development vs server

| Context | Suggested approach |
|---------|-------------------|
| Local laptop | Compose for Postgres + Ollama; run Next.js and FastAPI with hot reload on the host |
| Ubuntu server | Full Compose stack (all four services) |

---

## Explicit non-goals for Phase 1

- Document upload / chunking / embeddings
- Semantic search / RAG injection
- Resume / STAR / promo generators
- GitHub / Jira / calendar integrations
- Multi-user auth, billing, or cloud LLM fallbacks

Getting **reliable local chat with persisted history** is the only Phase 1 success criterion.
