#!/usr/bin/env python3
"""
Test script for the new sign-in/sign-up API endpoints
"""

import requests
import json

def test_signup():
    """Test the signup endpoint"""
    print("🔐 Testing Signup Endpoint")
    print("-" * 30)
    
    signup_data = {
        "email": "test@example.com",
        "password": "testpassword123",
        "first_name": "Test",
        "last_name": "User"
    }
    
    try:
        response = requests.post(
            "http://localhost:8000/auth/signup",
            json=signup_data,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Signup successful!")
            print(f"   Token: {data['token']}")
            print(f"   User ID: {data['user_id']}")
            print(f"   Email: {data['email']}")
            print(f"   Message: {data['message']}")
            return data['token']
        else:
            print(f"❌ Signup failed: {response.text}")
            return None
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return None

def test_signin():
    """Test the signin endpoint"""
    print("\n🔐 Testing Signin Endpoint")
    print("-" * 30)
    
    signin_data = {
        "email": "test@example.com",
        "password": "testpassword123"
    }
    
    try:
        response = requests.post(
            "http://localhost:8000/auth/signin",
            json=signin_data,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Signin successful!")
            print(f"   Token: {data['token']}")
            print(f"   User ID: {data['user_id']}")
            print(f"   Email: {data['email']}")
            print(f"   Message: {data['message']}")
            return data['token']
        else:
            print(f"❌ Signin failed: {response.text}")
            return None
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return None

def test_protected_endpoint(token):
    """Test a protected endpoint with the token"""
    print(f"\n🔒 Testing Protected Endpoint")
    print("-" * 30)
    
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    # Test the auth test endpoint
    try:
        response = requests.get(
            "http://localhost:8000/auth/test",
            headers=headers
        )
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Protected endpoint access successful!")
            print(f"   Message: {data['message']}")
            print(f"   User ID: {data['user_id']}")
            print(f"   Email: {data['email']}")
            return True
        else:
            print(f"❌ Protected endpoint access failed: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_validate_endpoint(token):
    """Test the validate endpoint with the token"""
    print(f"\n🔍 Testing Validate Endpoint")
    print("-" * 30)
    
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    validate_data = {
        "idea_text": "A smart water bottle that tracks hydration levels"
    }
    
    try:
        response = requests.post(
            "http://localhost:8000/validate",
            json=validate_data,
            headers=headers
        )
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Validate endpoint access successful!")
            print(f"   Novelty Score: {data.get('novelty_score', 'N/A')}")
            print(f"   User ID: {data.get('user_id', 'N/A')}")
            return True
        else:
            print(f"❌ Validate endpoint access failed: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def main():
    """Run all tests"""
    print("🧪 Testing API Authentication Endpoints")
    print("=" * 50)
    
    # Test signup
    signup_token = test_signup()
    
    # Test signin
    signin_token = test_signin()
    
    # Use either token for testing protected endpoints
    token = signup_token or signin_token
    
    if token:
        # Test protected endpoints
        auth_success = test_protected_endpoint(token)
        validate_success = test_validate_endpoint(token)
        
        print(f"\n📊 Test Summary:")
        print(f"   Signup: {'✅' if signup_token else '❌'}")
        print(f"   Signin: {'✅' if signin_token else '❌'}")
        print(f"   Auth Test: {'✅' if auth_success else '❌'}")
        print(f"   Validate: {'✅' if validate_success else '❌'}")
        
        if all([signup_token or signin_token, auth_success, validate_success]):
            print(f"\n🎉 All tests passed!")
            print(f"\n💡 To test in FastAPI docs:")
            print(f"   1. Go to http://localhost:8000/docs")
            print(f"   2. Click 'Authorize' button")
            print(f"   3. Enter: Bearer {token}")
            print(f"   4. Try the protected endpoints!")
        else:
            print(f"\n⚠️  Some tests failed.")
    else:
        print(f"\n❌ No token obtained, cannot test protected endpoints")

if __name__ == "__main__":
    main() 