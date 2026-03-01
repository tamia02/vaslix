from fastapi import APIRouter, Depends
from app.services.crm_service import crm_service
from app.utils.auth import get_current_user

router = APIRouter()

@router.get("/leads/{email}")
async def get_lead(email: str, current_user_id: int = Depends(get_current_user)):
    """Fetch lead intelligence from integrated CRM"""
    data = await crm_service.get_lead_data(email)
    return data

@router.post("/sync")
async def sync_crm(platform: str = "hubspot"):
    """Trigger a manual sync with CRM platforms"""
    return {"status": "sync_initiated", "platform": platform}

@router.post("/leads")
async def submit_lead(name: str, email: str, message: str):
    """Capture lead from Contact Form and sync to CRM"""
    # 1. Save to DB
    # 2. Sync to HubSpot/Salesforce via crm_service
    await crm_service.update_lead_status(email, "Captured", "hubspot")
    return {"status": "success", "message": "Lead captured and synchronized."}
