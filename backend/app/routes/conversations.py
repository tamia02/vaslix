from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.models.conversation import Conversation, ConversationStatus
from app.utils.auth import get_current_user
from app.services.ai_service import ai_service
from app.services.voice_service import voice_service

router = APIRouter()

@router.post("/")
async def start_conversation(agent_id: int, user_id: int, type: str = "chat"):
    """Initialize a new conversation session"""
    return {
        "id": 101,
        "status": ConversationStatus.ACTIVE,
        "type": type
    }

@router.post("/{conversation_id}/message")
async def send_message(conversation_id: int, message: str):
    """Handle an incoming message and generate an autonomous response"""
    # 1. Get context (RAG)
    # 2. Generate response (AI Service)
    response = await ai_service.generate_response(
        system_prompt="You are a helpful revenue agent.",
        messages=[{"role": "user", "content": message}]
    )
    return {"response": response}

@router.get("/")
async def list_conversations(current_user_id: int = Depends(get_current_user)):
    """Retrieve conversation history for the organization"""
    return [
        {
            "id": 101,
            "type": "voice",
            "status": "completed",
            "sentiment": "positive",
            "duration": 145.2
        }
    ]

@router.get("/{conversation_id}")
async def get_conversation(conversation_id: int):
    """Get full transcript and metadata for a specific conversation"""
    return {
        "id": conversation_id,
        "transcript": [
            {"role": "agent", "content": "Hello, how can I help you today?"},
            {"role": "user", "content": "I'm interested in enterprise plans."}
        ],
        "sentiment": "positive",
        "intent": "sales_inquiry"
    }
