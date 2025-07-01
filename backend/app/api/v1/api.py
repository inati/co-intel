"""
API v1 router configuration.
"""

from fastapi import APIRouter

from app.api.v1.endpoints import auth, organizations, projects, documents, ai_agents

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(organizations.router, prefix="/organizations", tags=["organizations"])
api_router.include_router(projects.router, prefix="/projects", tags=["projects"])
api_router.include_router(documents.router, prefix="/documents", tags=["documents"])
api_router.include_router(ai_agents.router, prefix="/ai-agents", tags=["ai-agents"])
