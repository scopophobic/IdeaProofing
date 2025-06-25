#!/usr/bin/env python3
"""
Test script for Clerk authentication setup
"""

import requests
import json
from config import settings

def test_health_endpoint():
    """Test the health endpoint (no auth required)"""
    try:
        response = requests.get("http://localhost:8000/health")
        print(f"✅ Health endpoint: {response.status_code}")
        print(f"   Response: {response.json()}")
        return True
    except Exception as e:
        print(f"❌ Health endpoint failed: {e}")
        return False

def test_protected_endpoint_without_auth():
    """Test the protected endpoint without authentication"""
    try:
        response = requests.post(
            "http://localhost:8000/validate",
            json={"idea_text": "test idea"},
            headers={"Content-Type": "application/json"}
        )
        print(f"✅ Protected endpoint without auth: {response.status_code}")
        print(f"   Expected 403, got: {response.status_code}")
        if response.status_code == 403:
            print("   ✅ Correctly rejected unauthenticated request")
            return True
        else:
            print("   ❌ Should have rejected unauthenticated request")
            return False
    except Exception as e:
        print(f"❌ Protected endpoint test failed: {e}")
        return False

def test_config():
    """Test configuration loading"""
    print("🔧 Configuration Test:")
    print(f"   CLERK_JWT_ISSUER: {settings.CLERK_JWT_ISSUER}")
    print(f"   CLERK_JWT_AUDIENCE: {settings.CLERK_JWT_AUDIENCE}")
    print(f"   ALLOWED_ORIGINS: {settings.ALLOWED_ORIGINS}")
    print(f"   API_HOST: {settings.API_HOST}")
    print(f"   API_PORT: {settings.API_PORT}")
    print(f"   DEBUG: {settings.DEBUG}")
    
    # Check if using default values
    if "your-domain.com" in settings.CLERK_JWT_ISSUER:
        print("   ⚠️  Using default Clerk configuration - update your .env file!")
        return False
    else:
        print("   ✅ Clerk configuration looks good")
        return True

def main():
    """Run all tests"""
    print("🧪 Testing Clerk Authentication Setup")
    print("=" * 50)
    
    # Test configuration
    config_ok = test_config()
    print()
    
    # Test endpoints
    health_ok = test_health_endpoint()
    print()
    
    auth_ok = test_protected_endpoint_without_auth()
    print()
    
    # Summary
    print("📊 Test Summary:")
    print(f"   Configuration: {'✅' if config_ok else '❌'}")
    print(f"   Health endpoint: {'✅' if health_ok else '❌'}")
    print(f"   Auth protection: {'✅' if auth_ok else '❌'}")
    
    if all([config_ok, health_ok, auth_ok]):
        print("\n🎉 All tests passed! Your authentication setup is working correctly.")
    else:
        print("\n⚠️  Some tests failed. Check the configuration and try again.")

if __name__ == "__main__":
    main() 