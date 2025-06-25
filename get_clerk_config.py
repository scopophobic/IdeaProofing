#!/usr/bin/env python3
"""
Script to help configure Clerk authentication
"""

import base64
import json
import os

def decode_clerk_key(publishable_key):
    """Decode Clerk publishable key to get configuration"""
    try:
        # Remove the prefix
        if publishable_key.startswith('pk_test_') or publishable_key.startswith('pk_live_'):
            key_part = publishable_key.split('_', 2)[2]
        else:
            key_part = publishable_key
            
        # Decode base64
        decoded = base64.b64decode(key_part + '==').decode('utf-8')
        return json.loads(decoded)
    except Exception as e:
        print(f"Error decoding key: {e}")
        return None

def main():
    print("🔧 Clerk Configuration Helper")
    print("=" * 40)
    
    # Your publishable key
    publishable_key = "pk_test_YXNzdXJlZC1kdWNrbGluZy05MC5jbGVyay5hY2NvdW50cy5kZXYk"
    
    print(f"📝 Your publishable key: {publishable_key}")
    
    # Decode the key
    config = decode_clerk_key(publishable_key)
    
    if config:
        print("\n✅ Decoded configuration:")
        print(f"   Instance ID: {config.get('instance_id', 'N/A')}")
        print(f"   Instance URL: {config.get('instance_url', 'N/A')}")
        
        # Extract issuer and audience
        instance_url = config.get('instance_url', '')
        if instance_url:
            issuer = f"https://{instance_url}"
            audience = f"https://{instance_url}"
            
            print(f"\n🔑 Recommended configuration:")
            print(f"   CLERK_JWT_ISSUER={issuer}")
            print(f"   CLERK_JWT_AUDIENCE={audience}")
            
            # Create .env content
            env_content = f"""# Clerk Authentication Configuration
CLERK_PUBLISHABLE_KEY={publishable_key}
CLERK_SECRET_KEY=sk_test_YOUR_CLERK_SECRET_KEY_HERE
CLERK_JWT_ISSUER={issuer}
CLERK_JWT_AUDIENCE={audience}

# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
DEBUG=True

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
"""
            
            print(f"\n📄 Create a .env file with this content:")
            print("-" * 50)
            print(env_content)
            print("-" * 50)
            
            # Check if .env exists
            if os.path.exists('.env'):
                print("\n⚠️  .env file already exists. Please update it manually.")
            else:
                # Create .env file
                with open('.env', 'w') as f:
                    f.write(env_content)
                print("\n✅ .env file created successfully!")
                
    else:
        print("❌ Could not decode the publishable key")
        print("\n📋 Manual configuration needed:")
        print("1. Go to your Clerk Dashboard")
        print("2. Navigate to JWT Templates")
        print("3. Note down the Issuer URL and Audience")
        print("4. Create a .env file with:")
        print("   CLERK_JWT_ISSUER=https://your-instance.clerk.accounts.dev")
        print("   CLERK_JWT_AUDIENCE=https://your-instance.clerk.accounts.dev")

if __name__ == "__main__":
    main() 