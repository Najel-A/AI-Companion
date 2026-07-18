# Frost

Personal AI companion that runs on your own hardware. Frost is an **engineering memory assistant** — not a generic ChatGPT clone. It helps you remember technical work, summarize accomplishments, draft resume bullets, build STAR stories, and prepare self-reviews through persistent memory (RAG).

## Status

**Phase 1 (MVP):** scaffolding only. Chat + conversation persistence comes next. Document ingestion and semantic memory land in Phase 2+.

## Architecture (target)

```
Browser (Next.js)
        │  HTTP / SSE
        ▼
FastAPI backend
        │
        ├──► PostgreSQL (+ pgvector later)
        └──► Ollama (local LLM)
```

**Rule:** the frontend never talks to Ollama directly. All model calls, prompt construction, and (later) retrieval go through the backend.

## Monorepo layout

```
frost/
├── frontend/          # Next.js + TypeScript + Tailwind
├── backend/           # FastAPI + SQLAlchemy + Pydantic
│   ├── app/
│   │   ├── api/       # route handlers
│   │   ├── core/      # settings, config
│   │   ├── db/        # engine, session
│   │   ├── models/    # SQLAlchemy ORM
│   │   ├── schemas/   # Pydantic request/response
│   │   └── services/  # Ollama, chat, (later) RAG
│   └── alembic/       # DB migrations
├── docker/
│   ├── postgres/      # init scripts (enable pgvector)
│   └── ollama/        # optional Modelfile / pull hints
├── docs/              # architecture notes & roadmap
├── scripts/           # helper scripts (pull models, etc.)
├── docker-compose.yml # (coming next)
└── README.md
```

## Docs

- [Architecture decisions](docs/ARCHITECTURE.md) — review of the proposed stack and changes
- [Implementation roadmap](docs/ROADMAP.md) — phased plan and what to build first

## Quick principles

1. Build incrementally — chat + DB before RAG.
2. Prefer clear layers over clever abstractions.
3. Keep AI orchestration in the backend.
4. Design the schema so documents/embeddings can be added without rewriting chat.
