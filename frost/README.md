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

# Backend Structure
backend/

├── server.ts          <-- starts application

├── src/
│   ├── app.ts         <-- Express setup
│   │
│   ├── config/
│   │   └── db.ts
│   │
│   ├── controllers/
│   │
│   ├── routes/
│   │
│   ├── services/
│   │
│   └── ...
│
├── package.json
└── tsconfig.json