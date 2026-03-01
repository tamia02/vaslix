from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.models.agent import Agent, AgentStatus
from app.utils.auth import get_current_user
from pydantic import BaseModel

router = APIRouter()

class AgentCreate(BaseModel):
    name: str
    description: str
    type: str  # "voice", "chat", "email", "meeting"
    system_prompt: str
    model: str = "gpt-4o"

@router.post("/")
async def create_agent(agent_data: AgentCreate, current_user_id: int = Depends(get_current_user)):
    """Create a new autonomous agent (Mock implementation for Phase 3)"""
    return {
        "id": 1,
        "name": agent_data.name,
        "status": AgentStatus.IDLE,
        "message": "Agent provisioned successfully"
    }

@router.get("/")
async def list_agents(current_user_id: int = Depends(get_current_user)):
    """List all agents for the organization"""
    return [
        {
            "id": 1,
            "name": "Revenue Bot 01",
            "type": "voice",
            "status": "active"
        }
    ]

@router.get("/{agent_id}")
async def get_agent(agent_id: int, current_user_id: int = Depends(get_current_user)):
    """Get detailed agent configuration"""
    return {
        "id": agent_id,
        "name": "Revenue Bot 01",
        "system_prompt": "You are a professional revenue agent...",
        "status": "active"
    }
