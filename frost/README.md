# Frost ❄️

Personal AI companion that runs on my own hardware.

Frost is an **engineering memory assistant** designed to help capture, organize, and reflect on my technical journey.

It helps me:

- Remember technical work and project history
- Summarize engineering accomplishments
- Generate resume bullet points
- Build STAR interview stories
- Prepare self-reviews and promotion documents

Frost uses a **local LLM**, persistent memory, and **Retrieval Augmented Generation (RAG)** to transform personal engineering experiences into searchable knowledge.

---

# Architecture

Frost is designed as a distributed full-stack AI application with a dedicated application layer and AI processing layer.

```text
                         React Frontend
                               |
                               |
                         Node Backend
                               |
              --------------------------------
              |                              |
         PostgreSQL                   FastAPI AI Service
              |                              |
              |                    ----------------------
              |                    |                    |
              |                 Ollama              pgvector
              |
       Application Data
       - Users
       - Conversations
       - Settings
       - Projects
       - Achievements
```

# Frontend Structure

```text
frontend/

├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
│
└── src/
    ├── main.tsx                 <-- app entry
    ├── index.css
    │
    ├── app/
    │   ├── store.ts             <-- Redux store
    │   ├── providers.tsx        <-- Redux + Router providers
    │   └── router.tsx           <-- React Router routes
    │
    ├── features/
    │   ├── chat/
    │   │   ├── components/
    │   │   ├── chatApi.ts
    │   │   ├── chatSlice.ts
    │   │   └── types.ts
    │   │
    │   ├── memories/
    │   │   ├── components/
    │   │   ├── memoryApi.ts
    │   │   └── types.ts
    │   │
    │   └── projects/
    │       ├── components/
    │       ├── projectApi.ts
    │       └── types.ts
    │
    ├── components/
    │   └── ui/                  <-- shared UI (Button, Input, Card)
    │
    ├── layouts/
    │   └── DashboardLayout.tsx
    │
    ├── pages/
    │   ├── Home.tsx
    │   ├── Chat.tsx
    │   └── Memories.tsx
    │
    ├── services/
    │   └── api.ts               <-- RTK Query base API
    │
    ├── hooks/
    ├── utils/
    └── types/
```

# Backend Structure

```text
backend/

├── server.ts                    <-- starts application
├── package.json
├── tsconfig.json
├── prisma/
│   └── schema.prisma
│
└── src/
    ├── app.ts                   <-- Express setup
    │
    ├── config/
    │   └── prisma.ts
    │
    ├── middleware/
    │
    └── modules/
        ├── health/
        ├── conversation/        <-- routes, controller, service, repository
        ├── memory/
        └── chat/
```

# AI-Services Structure
Using qwen3:8b model for this project

```text
ai-services/

├── requirements.txt
├── .env.example
├── README.md
│
└── app/
    ├── main.py                  <-- FastAPI app + CORS + routers
    │
    ├── api/
    │   └── chat.py              <-- /, /health, /chat routes
    │
    ├── core/
    │   └── config.py            <-- env / settings
    │
    ├── models/
    │   ├── requests.py
    │   └── responses.py
    │
    └── services/
        └── ollama_service.py    <-- AI business logic (mock for now)
```
