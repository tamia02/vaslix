from fastapi import APIRouter, Depends
from app.utils.auth import get_current_user

router = APIRouter()

@router.get("/stats")
async def get_analytics_stats():
    """Get high-level operational performance metrics"""
    return [
        {"label": "Network Nodes", "value": "1,284"},
        {"label": "Compute Cycles", "value": "4.2M"},
        {"label": "Successful Tasks", "value": "18,402"},
        {"label": "Capital Managed", "value": "$8.4M"}
    ]

@router.get("/flow")
async def get_live_flow():
    """Get mock data for the live execution visualizer"""
    import random
    return [random.randint(30, 95) for _ in range(15)]
