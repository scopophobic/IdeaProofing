from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from llm import generate_queries
from google_patents import search_google_patents_api
from similarity import score_novelty
from models import Idea
from auth import get_current_user
from config import settings
import numpy as np
import json
import requests

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for auth endpoints
class SignUpRequest(BaseModel):
    email: str
    password: str
    first_name: str = None
    last_name: str = None

class SignInRequest(BaseModel):
    email: str
    password: str

class AuthResponse(BaseModel):
    token: str
    user_id: str
    email: str
    message: str

@app.get("/")
async def root():
    return {"message": "Vichaar API - Idea Validation Service"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "vichaar-api"}

@app.post("/auth/signup", response_model=AuthResponse)
async def signup(request: SignUpRequest):
    """
    Sign up a new user and get a JWT token for testing.
    This endpoint creates a test user and returns a mock JWT token.
    """
    try:
        # For testing purposes, we'll create a mock JWT token
        # In production, you'd integrate with Clerk's signup API
        
        # Mock user data
        user_id = f"user_{request.email.replace('@', '_').replace('.', '_')}"
        
        # Create a simple mock token (not a real JWT, just for testing)
        mock_token = f"mock_token_{user_id}_{hash(request.email)}"
        
        print(f"🔐 Mock signup for user: {request.email}")
        
        return AuthResponse(
            token=mock_token,
            user_id=user_id,
            email=request.email,
            message="Mock user created successfully. Use this token for testing."
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Signup failed: {str(e)}"
        )

@app.post("/auth/signin", response_model=AuthResponse)
async def signin(request: SignInRequest):
    """
    Sign in a user and get a JWT token for testing.
    This endpoint returns a mock JWT token for testing purposes.
    """
    try:
        # For testing purposes, we'll create a mock JWT token
        # In production, you'd integrate with Clerk's signin API
        
        # Mock user data
        user_id = f"user_{request.email.replace('@', '_').replace('.', '_')}"
        
        # Create a simple mock token (not a real JWT, just for testing)
        mock_token = f"mock_token_{user_id}_{hash(request.email)}"
        
        print(f"🔐 Mock signin for user: {request.email}")
        
        return AuthResponse(
            token=mock_token,
            user_id=user_id,
            email=request.email,
            message="Mock signin successful. Use this token for testing."
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Signin failed: {str(e)}"
        )

@app.get("/auth/test")
async def test_auth(current_user: dict = Depends(get_current_user)):
    """
    Test endpoint to verify authentication is working.
    """
    return {
        "message": "Authentication successful!",
        "user_id": current_user["user_id"],
        "email": current_user["email"]
    }

@app.post("/validate")
async def validate_idea(data: Idea, current_user: dict = Depends(get_current_user)):
    print(f"🔹 Received idea from user {current_user['user_id']}:", data.idea_text)

    # Step 1: Generate search queries
    queries = json.loads(generate_queries(data.idea_text))
    # print("🔹 Generated Queries:", queries)

    # Step 2: Search Google Patents
    all_results = []
    for query in queries["queries"]:
        # print(f"🔍 Searching for: {query}")
        results = search_google_patents_api(query, num_results=5)
        # print(f"🔍 Results for '{query}':", results)
        all_results.extend(results)

    # print("🔹 Total Results Fetched:", len(all_results))
    if not all_results:
        return {"error": "No patent results found", "search_queries": queries}

    # Step 3: Score similarity
    scores = score_novelty(data.idea_text, all_results)
    # print("🔹 Novelty Score:", scores["novelty_score"])
    # print("🔹 Similar Patents:", scores["results"])

    return {
        "novelty_score": scores["novelty_score"],
        "similar_patents": scores["results"],
        "user_id": current_user["user_id"],
        # "search_queries": queries``
    }