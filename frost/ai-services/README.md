# Frost AI Service

Local FastAPI service for Frost's AI capabilities (Ollama integration comes later).

## Setup

```bash
cd frost/ai-services

# Create and activate a virtual environment
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
```

## Run

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Open:

- Root: http://localhost:8000/
- Health: http://localhost:8000/health
- Interactive docs: http://localhost:8000/docs

## Example chat request

```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello Frost"}'
```

## Project layout

```text
ai-services/
├── app/
│   ├── api/          # FastAPI routers
│   ├── core/         # Configuration
│   ├── models/       # Pydantic schemas
│   ├── services/     # Business logic / external clients
│   └── main.py       # App factory + router registration
├── requirements.txt
├── .env.example
└── README.md
```
