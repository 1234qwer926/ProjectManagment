from fastapi import APIRouter, HTTPException, Depends
from ...schemas.auth import LoginRequest, TokenResponse
from ...services.auth_service import AuthService


router = APIRouter()

@router.post("/login", response_model=TokenResponse)
async def login(login_data: LoginRequest):
    user = AuthService.authenticate_user(login_data.username, login_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    token = AuthService.create_access_token(user)
    return {"access_token": token, "token_type": "bearer"}
