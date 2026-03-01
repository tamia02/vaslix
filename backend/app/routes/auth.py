from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
import os
from app.models.user import User
from app.utils.auth import (
    verify_password, 
    get_password_hash, 
    create_access_token,
    get_current_user
)

router = APIRouter()

# Placeholder for DB session
def get_db():
    # In a real app, this would yield a session from a sessionmaker
    pass

@router.post("/register")
async def register(email: str, username: str, password: str, full_name: str):
    """Register a new user (Placeholder logic for Phase 2)"""
    # In a real implementation, we would:
    # 1. Check if user exists in DB
    # 2. Hash the password
    # 3. Save to DB
    
    # Returning a mock successful registration for now
    access_token = create_access_token(data={"sub": username})
    return {
        "user": {
            "email": email,
            "username": username,
            "full_name": full_name
        },
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """Login and get access token (Placeholder logic for Phase 2)"""
    # In a real implementation, we would:
    # 1. Fetch user from DB
    # 2. Verify hashed password
    
    # Mocking a successful login for development
    access_token = create_access_token(data={"sub": form_data.username})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me")
async def read_users_me(current_user_id: int = Depends(get_current_user)):
    """Get current user info"""
    return {"user_id": current_user_id, "status": "active"}
