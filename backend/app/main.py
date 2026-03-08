from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging
import os
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

# Import routes
from app.routes import auth, agents, conversations, crm, analytics
from app.websocket.ws_manager import manager

# Rate Limiter Configuration
limiter = Limiter(key_func=get_remote_address)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("🚀 VASLIX Backend starting...")
    yield
    # Shutdown
    logger.info("🛑 VASLIX Backend shutting down...")

app = FastAPI(
    title="VASLIX API",
    description="Autonomous Revenue Infrastructure",
    version="1.0.0",
    lifespan=lifespan
)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(agents.router, prefix="/api/agents", tags=["agents"])
app.include_router(conversations.router, prefix="/api/conversations", tags=["conversations"])
app.include_router(crm.router, prefix="/api/crm", tags=["crm"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["analytics"])

# Placeholder for real routes
@app.get("/")
async def root():
    return {
        "message": "VASLIX - Autonomous Revenue Infrastructure",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health():
    return {"status": "healthy"}

# WebSocket endpoint for real-time updates
@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await manager.connect(websocket, client_id)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(f"Client {client_id}: {data}")
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
        manager.disconnect(client_id)

import asyncio
import random

# Live Execution Command Stream for Agent Studio
@app.websocket("/api/ws/agents/{agent_id}")
async def agent_command_stream(websocket: WebSocket, agent_id: str):
    await websocket.accept()
    
    # Specific boot sequences for the hyper-refined demo
    log_templates = {
        "voice": [
            "> Initializing Voice Core...",
            "> Syncing STT/TTS engine...",
            "> Call routing authenticated.",
            "> Listening for intent signals...",
            "> Audio buffers primed."
        ],
        "chat": [
            "> Booting LLM gateway...",
            "> NLP context loaded.",
            "> Vector memory synchronized.",
            "> Chat stream online.",
            "> Context window optimized."
        ],
        "email": [
            "> Warming up SMTP relay...",
            "> Scraping CRM intent...",
            "> Personalization tags ready.",
            "> Queueing outbound threads...",
            "> Sending logic verified."
        ],
        "scheduler": [
            "> Accessing Calendar API...",
            "> Conflict resolution armed.",
            "> Timezone map synchronized.",
            "> Bot-managed scheduling live.",
            "> Event listeners active."
        ]
    }
    
    logs = log_templates.get(agent_id, [f"> Booting generic module {agent_id}..."])
    
    try:
        # Phase 1: Rapid Boot Sequence
        for log in logs:
            await websocket.send_text(log)
            await asyncio.sleep(0.7)
            
        # Phase 2: Live Operational Loop
        while True:
            await asyncio.sleep(random.uniform(1.2, 3.0))
            active_log = random.choice([
                f"> Status: {random.choice(['Healthy', 'Optimizing', 'Interfacing', 'Routing', 'Processing'])}...",
                f"> Ping: {random.randint(12, 45)}ms...",
                "> Background trace complete.",
                "> Synchronizing neural state..."
            ])
            await websocket.send_text(active_log)
            
    except Exception as e:
        logger.info(f"Command Stream closed for {agent_id}: {e}")

import asyncio
import random

# Live Execution Command Stream for Agent Studio
@app.websocket("/api/ws/agents/{agent_id}")
async def agent_command_stream(websocket: WebSocket, agent_id: str):
    await websocket.accept()
    
    log_templates = {
        "voice": [
            "> Initializing Voice Core...",
            "> Syncing STT/TTS engine...",
            "> Call routing authenticated.",
            "> Listening for intent signals...",
            "> Audio buffers primed."
        ],
        "chat": [
            "> Booting LLM gateway...",
            "> NLP context loaded.",
            "> Vector memory synchronized.",
            "> Chat stream online.",
            "> Context window optimized."
        ],
        "email": [
            "> Warming up SMTP relay...",
            "> Scraping CRM intent...",
            "> Personalization tags ready.",
            "> Queueing outbound threads...",
            "> Sending logic verified."
        ],
        "scheduler": [
            "> Accessing Calendar API...",
            "> Conflict resolution armed.",
            "> Timezone map synchronized.",
            "> Bot-managed scheduling live.",
            "> Event listeners active."
        ]
    }
    
    logs = log_templates.get(agent_id, [f"> Booting generic module {agent_id}..."])
    
    try:
        for log in logs:
            await websocket.send_text(log)
            await asyncio.sleep(0.7)
            
        while True:
            await asyncio.sleep(random.uniform(1.2, 3.0))
            active_log = random.choice([
                f"> Status: {random.choice(['Healthy', 'Optimizing', 'Interfacing', 'Routing', 'Processing'])}...",
                f"> Ping: {random.randint(12, 45)}ms...",
                "> Background trace complete.",
                "> Synchronizing neural state..."
            ])
            await websocket.send_text(active_log)
            
    except Exception as e:
        logger.info(f"Command Stream closed for {agent_id}: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
