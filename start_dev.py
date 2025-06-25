#!/usr/bin/env python3
"""
Development startup script for Vichaar with Clerk authentication
"""

import os
import sys
import subprocess
import time
from pathlib import Path

def check_dependencies():
    """Check if required dependencies are installed"""
    print("🔍 Checking dependencies...")
    
    # Check Python packages
    try:
        import fastapi
        import jwt
        import requests
        import dotenv
        print("✅ Python dependencies OK")
    except ImportError as e:
        print(f"❌ Missing Python dependency: {e}")
        print("   Run: pip install -r requirement.txt")
        return False
    
    # Check Node.js and npm
    try:
        result = subprocess.run(["node", "--version"], capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ Node.js: {result.stdout.strip()}")
        else:
            print("❌ Node.js not found")
            return False
    except FileNotFoundError:
        print("❌ Node.js not found")
        return False
    
    try:
        result = subprocess.run(["npm", "--version"], capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ npm: {result.stdout.strip()}")
        else:
            print("❌ npm not found")
            return False
    except FileNotFoundError:
        print("❌ npm not found")
        return False
    
    return True

def check_config():
    """Check if configuration is set up"""
    print("\n🔧 Checking configuration...")
    
    # Check if .env file exists
    env_file = Path(".env")
    if not env_file.exists():
        print("⚠️  .env file not found")
        print("   Create a .env file with your Clerk configuration")
        print("   See CLERK_SETUP.md for details")
        return False
    
    # Load and check config
    try:
        from config import settings
        print(f"✅ Configuration loaded")
        print(f"   CLERK_JWT_ISSUER: {settings.CLERK_JWT_ISSUER}")
        print(f"   CLERK_JWT_AUDIENCE: {settings.CLERK_JWT_AUDIENCE}")
        
        # Check if using default values
        if "your-domain.com" in settings.CLERK_JWT_ISSUER:
            print("   ⚠️  Using default Clerk configuration")
            print("   Update your .env file with real Clerk values")
            return False
        
        return True
    except Exception as e:
        print(f"❌ Configuration error: {e}")
        return False

def start_backend():
    """Start the FastAPI backend"""
    print("\n🚀 Starting backend...")
    try:
        # Start backend in background
        backend_process = subprocess.Popen([
            sys.executable, "-m", "uvicorn", "main:app", 
            "--host", "0.0.0.0", "--port", "8000", "--reload"
        ])
        
        # Wait a moment for startup
        time.sleep(3)
        
        # Check if it's running
        try:
            import requests
            response = requests.get("http://localhost:8000/health", timeout=5)
            if response.status_code == 200:
                print("✅ Backend started successfully")
                return backend_process
            else:
                print(f"❌ Backend health check failed: {response.status_code}")
                return None
        except Exception as e:
            print(f"❌ Backend health check failed: {e}")
            return None
            
    except Exception as e:
        print(f"❌ Failed to start backend: {e}")
        return None

def start_frontend():
    """Start the React frontend"""
    print("\n🎨 Starting frontend...")
    try:
        # Change to frontend directory
        frontend_dir = Path("frontend")
        if not frontend_dir.exists():
            print("❌ Frontend directory not found")
            return None
        
        # Install dependencies if needed
        node_modules = frontend_dir / "node_modules"
        if not node_modules.exists():
            print("📦 Installing frontend dependencies...")
            subprocess.run(["npm", "install"], cwd=frontend_dir, check=True)
        
        # Start frontend in background
        frontend_process = subprocess.Popen([
            "npm", "run", "dev"
        ], cwd=frontend_dir)
        
        # Wait a moment for startup
        time.sleep(5)
        
        print("✅ Frontend started successfully")
        return frontend_process
        
    except Exception as e:
        print(f"❌ Failed to start frontend: {e}")
        return None

def main():
    """Main startup function"""
    print("🌟 Vichaar Development Startup")
    print("=" * 40)
    
    # Check dependencies
    if not check_dependencies():
        print("\n❌ Dependency check failed. Please install missing dependencies.")
        return
    
    # Check configuration
    if not check_config():
        print("\n❌ Configuration check failed. Please set up your .env file.")
        return
    
    # Start backend
    backend_process = start_backend()
    if not backend_process:
        print("\n❌ Failed to start backend")
        return
    
    # Start frontend
    frontend_process = start_frontend()
    if not frontend_process:
        print("\n❌ Failed to start frontend")
        backend_process.terminate()
        return
    
    print("\n🎉 Development environment started successfully!")
    print("📱 Frontend: http://localhost:5173")
    print("🔧 Backend: http://localhost:8000")
    print("📊 API Docs: http://localhost:8000/docs")
    print("\nPress Ctrl+C to stop all services")
    
    try:
        # Keep running until interrupted
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n🛑 Stopping services...")
        if backend_process:
            backend_process.terminate()
        if frontend_process:
            frontend_process.terminate()
        print("✅ Services stopped")

if __name__ == "__main__":
    main() 