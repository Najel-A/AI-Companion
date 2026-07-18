# Implementation roadmap

Build Frost in small, verifiable slices. Each phase should leave you with something you can run and demo.

---

## Phase 0 — Scaffold (current)

**Goal:** Empty monorepo with agreed layout and docs.

- [x] Folder structure
- [x] Architecture review
- [x] Roadmap

**Next:** Phase 1a infra files.

---

## Phase 1a — Infrastructure skeleton

**Goal:** Services start; nothing AI-related yet.

**Create first (in this order):**

1. `.env.example` — documented env vars
2. `docker-compose.yml` — `postgres` (pgvector image) + `ollama`
3. `docker/postgres/init.sql` — `CREATE EXTENSION IF NOT EXISTS vector;`
4. `backend/requirements.txt` + `backend/Dockerfile`
5. `backend/app/core/config.py` — Pydantic Settings
6. `backend/app/main.py` — FastAPI app with `/health`
7. Verify: `docker compose up`, hit health endpoint, connect to Postgres

**Success:** Postgres and Ollama containers healthy; FastAPI returns `{"status":"ok"}`.

---

## Phase 1b — Database + chat domain model

**Goal:** Persist conversations without LLM yet.

1. SQLAlchemy engine / session (`app/db/`)
2. Models: `Conversation`, `Message`
3. Alembic init + first migration
4. Pydantic schemas for create/list/get
5. CRUD API routes:
   - `POST /conversations`
   - `GET /conversations`
   - `GET /conversations/{id}`
   - `POST /conversations/{id}/messages` (store only)

**Success:** Create a conversation and messages via curl/httpie; data visible in Postgres.

---

## Phase 1c — Ollama chat integration

**Goal:** Backend talks to the local model.

1. Pull a chat model (`ollama pull …`)
2. `services/ollama.py` — thin HTTP client (`/api/chat` or `/api/generate`)
3. `services/chat.py` — load history → call Ollama → save assistant reply
4. `POST /api/chat` (or `/conversations/{id}/chat`) — user message in, assistant message out
5. Wire CORS for the frontend origin

**Success:** One curl request produces a stored user + assistant turn.

---

## Phase 1d — Next.js chat UI

**Goal:** Usable browser chat against the real backend.

1. `create-next-app` in `frontend/` (TypeScript, Tailwind, App Router)
2. API client pointing at `NEXT_PUBLIC_API_URL`
3. Conversation list + chat panel
4. Send message → show reply (non-streaming first)
5. Optional Compose service for frontend, or run `npm run dev` locally

**Success:** Full loop in the browser: type → model reply → refresh still shows history.

---

## Phase 1e — Streaming polish (still Phase 1)

**Goal:** Better UX without changing product scope.

1. SSE endpoint for token streaming
2. Frontend consumes stream and appends tokens
3. Persist full assistant message when stream completes

**Success:** Tokens appear live; final message saved correctly.

---

## Phase 2 — Memory (RAG)

Only after Phase 1 feels solid:

1. Document upload API + storage (disk or DB bytes)
2. Chunking + embeddings via Ollama embed model
3. `document_chunks` table with `vector` column + index
4. Retrieval on each chat turn; inject top-k chunks into the system/context prompt
5. Simple “memories used” debug UI (optional but educational)

---

## Phase 3 — Engineering outputs

Prompt/workflows on top of memory:

- Weekly accomplishment summary
- Resume bullets
- STAR stories
- Promo / self-review drafts

These are mostly **specialized prompts + retrieval filters**, not new infrastructure.

---

## Phase 4 — Integrations

Ingest from external sources into the same document/memory pipeline:

- GitHub (PRs, commits)
- Jira / Linear
- Calendar notes

---

## Files to create next (concrete order)

When we start coding Phase 1a, create these **before** any UI or RAG code:

| Order | File | Purpose |
|------:|------|---------|
| 1 | `.env.example` | Shared contract for config |
| 2 | `.gitignore` | Python/Node/Docker/env ignores |
| 3 | `docker-compose.yml` | Postgres + Ollama (+ later backend) |
| 4 | `docker/postgres/init.sql` | Enable pgvector |
| 5 | `backend/requirements.txt` | FastAPI, SQLAlchemy, etc. |
| 6 | `backend/Dockerfile` | Backend image |
| 7 | `backend/app/core/config.py` | Settings |
| 8 | `backend/app/main.py` | App entry + health |
| 9 | `backend/app/db/session.py` | DB connection (Phase 1b) |
| 10 | `backend/app/models/*.py` | Conversation / Message |

Frontend scaffolding (`create-next-app`) waits until the chat API works via curl — that keeps debugging one layer at a time.

---

## How we will work going forward

1. Agree on the next phase slice
2. Note any architectural decisions for that slice
3. Implement only that slice
4. Verify with a short checklist before moving on

Say when you are ready for **Phase 1a** and we will start with Compose + FastAPI health.
