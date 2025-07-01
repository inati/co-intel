"""
Authentication endpoints.
"""

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

router = APIRouter()


class LoginRequest(BaseModel):
    """Login request model."""
    email: str
    password: str


class LoginResponse(BaseModel):
    """Login response model."""
    access_token: str
    token_type: str
    user: dict


class RegisterRequest(BaseModel):
    """Registration request model."""
    email: str
    password: str
    name: str


@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    """
    User login endpoint.
    
    Args:
        request: Login credentials
        
    Returns:
        LoginResponse: Access token and user information
    """
    # TODO: Implement Supabase Auth integration
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Authentication not yet implemented"
    )


@router.post("/register", response_model=LoginResponse)
async def register(request: RegisterRequest):
    """
    User registration endpoint.
    
    Args:
        request: Registration information
        
    Returns:
        LoginResponse: Access token and user information
    """
    # TODO: Implement Supabase Auth integration
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Registration not yet implemented"
    )


@router.post("/logout")
async def logout():
    """
    User logout endpoint.
    
    Returns:
        dict: Success message
    """
    # TODO: Implement token invalidation
    return {"message": "Logged out successfully"}


@router.get("/me")
async def get_current_user():
    """
    Get current user information.
    
    Returns:
        dict: Current user information
    """
    # TODO: Implement current user retrieval
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="User profile not yet implemented"
    )
