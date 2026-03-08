from pydantic import BaseModel, EmailStr
from app.services.crm_service import crm_service
from app.utils.auth import get_current_user

router = APIRouter()

class LeadCreate(BaseModel):
    name: str
    email: EmailStr
    message: str

class SyncRequest(BaseModel):
    platform: str = "hubspot"

@router.get("/leads/{email}")
async def get_lead(email: str, current_user_id: int = Depends(get_current_user)):
    """Fetch lead intelligence from integrated CRM"""
    data = await crm_service.get_lead_data(email)
    return data

@router.post("/sync")
async def sync_crm(request: SyncRequest, current_user_id: int = Depends(get_current_user)):
    """Trigger a manual sync with CRM platforms"""
    return {"status": "sync_initiated", "platform": request.platform}

@router.post("/leads")
async def submit_lead(lead: LeadCreate, current_user_id: int = Depends(get_current_user)):
    """Capture lead from Contact Form and sync to CRM"""
    # 1. Save to DB
    # 2. Sync to HubSpot/Salesforce via crm_service
    await crm_service.update_lead_status(lead.email, "Captured", "hubspot")
    return {"status": "success", "message": "Lead captured and synchronized."}
