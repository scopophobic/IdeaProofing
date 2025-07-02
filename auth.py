import requests
from fastapi import HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Optional
import json
from config import settings
from jose import jwt  # Use python-jose for JWT verification

# Clerk configuration from settings
CLERK_JWT_ISSUER = settings.CLERK_JWT_ISSUER
CLERK_JWT_AUDIENCE = settings.CLERK_JWT_AUDIENCE
CLERK_JWKS_URL = f"{CLERK_JWT_ISSUER}/.well-known/jwks.json"
# CLERK_JWKS_URL = CLERK_JWT_ISSUER

# Security scheme
security = HTTPBearer()

# Cache for JWKS
jwks_cache = None
jwks_cache_time = 0

def is_mock_token(token: str) -> bool:
    """Check if the token is a mock token for testing"""
    return token.startswith("mock_token_")

def verify_mock_token(token: str) -> dict:
    """Verify a mock token for testing purposes"""
    try:
        # Parse mock token format: mock_token_user_id_hash
        parts = token.split("_", 2)
        if len(parts) != 3:
            raise ValueError("Invalid mock token format")
        
        user_id = parts[1]
        # Extract email from user_id (reverse the transformation)
        email = user_id.replace("_", "@", 1).replace("_", ".")
        
        return {
            "sub": user_id,
            "email": email,
            "mock": True
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid mock token: {str(e)}"
        )

def get_jwks():
    """Fetch and cache Clerk's JSON Web Key Set"""
    global jwks_cache, jwks_cache_time
    import time
    
    # Cache for 1 hour
    if jwks_cache is None or time.time() - jwks_cache_time > 3600:
        try:
            print(f"🔍 Fetching JWKS from: {CLERK_JWKS_URL}")
            response = requests.get(CLERK_JWKS_URL)
            response.raise_for_status()
            jwks_cache = response.json()
            jwks_cache_time = time.time()
            print(f"✅ JWKS fetched successfully, {len(jwks_cache.get('keys', []))} keys")
        except Exception as e:
            print(f"❌ Failed to fetch JWKS: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to fetch JWKS: {str(e)}"
            )
    
    return jwks_cache

def get_signing_key(kid: str):
    """Get the signing key (JWK dict) for a specific key ID"""
    jwks = get_jwks()
    for key in jwks.get("keys", []):
        if key.get("kid") == kid:
            return key
    print(f"❌ Signing key not found for kid: {kid}")
    print(f"   Available keys: {[k.get('kid') for k in jwks.get('keys', [])]}")
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid token: signing key not found"
    )

def verify_jwt_token(token: str) -> dict:
    """Verify and decode a Clerk JWT token using python-jose and JWK dict"""
    try:
        print(f"🔍 Verifying JWT token...")
        print(f"   Issuer: {CLERK_JWT_ISSUER}")
        print(f"   Audience: {CLERK_JWT_AUDIENCE}")
        
        # Decode header to get key ID
        header = jwt.get_unverified_header(token)
        kid = header.get("kid")
        print(f"   Token KID: {kid}")
        
        if not kid:
            print("❌ Token missing key ID")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token: missing key ID"
            )
        
        # Get the signing key (JWK dict)
        signing_key = get_signing_key(kid)
        print(f"✅ Found signing key for KID: {kid}")
        
        # Use python-jose to verify the JWT using the JWK dict
        payload = jwt.decode(
            token,
            signing_key,
            algorithms=["RS256"],
            audience=CLERK_JWT_AUDIENCE,
            issuer=CLERK_JWT_ISSUER,
        )
        print(f"✅ JWT verification successful")
        print(f"   User ID: {payload.get('sub')}")
        print(f"   Email: {payload.get('email')}")
        return payload
    except Exception as e:
        print(f"❌ Token verification failed: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Token verification failed: {str(e)}"
        )

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    """Dependency to get the current authenticated user"""
    token = credentials.credentials
    print(f"🔐 Received token: {token[:20]}...")
    
    # Check if it's a mock token for testing
    if is_mock_token(token):
        print("🔧 Using mock token for testing")
        payload = verify_mock_token(token)
    else:
        # Verify real JWT token
        payload = verify_jwt_token(token)
    
    # Extract user information from the payload
    user_id = payload.get("sub")
    email = payload.get("email")
    
    if not user_id:
        print("❌ Token missing user ID")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token: missing user ID"
        )
    
    print(f"✅ User authenticated: {user_id}")
    return {
        "user_id": user_id,
        "email": email,
        "payload": payload
    }

# Optional: Create a user in your database on first login
def create_or_get_user(user_data: dict):
    """Create or get user from your database"""
    # This is where you would implement database logic
    # For now, we'll just return the user data
    return user_data 