# Vichaar - AI-Powered Idea Validation

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

Vichaar (विचार) is an AI-powered idea validation platform that helps entrepreneurs, product managers, and innovators validate their ideas through patent analysis, market research, and AI-driven insights. Get instant feedback on your idea's novelty, market potential, and competitive landscape.

## ✨ Features

- **🔍 Patent Analysis**: Discover similar patents and avoid reinventing the wheel
- **🏢 Startup Validation**: Check if similar startups exist in the market
- **📊 Market Trends**: Analyze market interest and growth potential
- **🤖 AI-Powered Suggestions**: Get smart recommendations to improve your idea
- **🔐 Secure Authentication**: Built-in user authentication with Clerk
- **📱 Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS

## 🛠️ Tech Stack

### Frontend

- **React 18** with Vite
- **Tailwind CSS** for styling
- **Clerk** for authentication
- **Axios** for API communication
- **React Router** for navigation

### Backend

- **FastAPI** for API development
- **Python** for AI/ML processing
- **Google Patents API** for patent search
- **Sentence Transformers** for similarity analysis
- **JWT** for secure authentication

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### 1. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/scopophobic/vichaar.git
cd vichaar

# Install Python dependencies
pip install -r requirement.txt

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2. Configure Authentication

1. **Create a Clerk Account:**

   - Go to [Clerk Dashboard](https://dashboard.clerk.com)
   - Create a new application
   - Get your API keys

2. **Set up Environment Variables:**
   Create a `.env` file in the project root:

   ```env
   CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
   CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here
   CLERK_JWT_ISSUER=https://clerk.your-domain.com
   CLERK_JWT_AUDIENCE=your-audience
   ```

3. **Update Frontend Configuration:**
   Replace the placeholder in `frontend/src/App.jsx`:
   ```javascript
   const CLERK_PUBLISHABLE_KEY = "pk_test_YOUR_ACTUAL_CLERK_PUBLISHABLE_KEY";
   ```

### 3. Start Development Environment

**Option A: Use the startup script (Recommended)**

```bash
python start_dev.py
```

**Option B: Manual startup**

```bash
# Terminal 1: Start backend
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload

# Terminal 2: Start frontend
cd frontend
npm run dev
```

### 4. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 📖 Usage

1. **Sign Up/Login**: Create an account or sign in with your existing credentials
2. **Enter Your Idea**: Describe your innovation in detail
3. **Get Analysis**: Receive instant insights on:
   - Novelty score compared to existing patents
   - Similar patents and technologies
   - Market potential assessment
   - AI-powered improvement suggestions

## 🔧 Configuration

### Environment Variables

| Variable                | Description                | Default                 |
| ----------------------- | -------------------------- | ----------------------- |
| `CLERK_PUBLISHABLE_KEY` | Your Clerk publishable key | Required                |
| `CLERK_SECRET_KEY`      | Your Clerk secret key      | Required                |
| `CLERK_JWT_ISSUER`      | Clerk JWT issuer URL       | Required                |
| `CLERK_JWT_AUDIENCE`    | Clerk JWT audience         | Required                |
| `API_HOST`              | Backend host               | `0.0.0.0`               |
| `API_PORT`              | Backend port               | `8000`                  |
| `DEBUG`                 | Debug mode                 | `False`                 |
| `ALLOWED_ORIGINS`       | CORS allowed origins       | `http://localhost:5173` |

### Testing

Run the authentication test suite:

```bash
python test_auth.py
```

## 🏗️ Project Structure

```
vichaar/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── App.jsx         # Main app with Clerk integration
│   │   └── ...
│   ├── package.json
│   └── ...
├── main.py                  # FastAPI backend
├── auth.py                  # Clerk authentication utilities
├── config.py               # Configuration management
├── models.py               # Pydantic models
├── llm.py                  # AI/ML processing
├── google_patents.py       # Patent search functionality
├── similarity.py           # Similarity analysis
├── start_dev.py           # Development startup script
├── test_auth.py           # Authentication tests
├── CLERK_SETUP.md         # Detailed Clerk setup guide
└── requirement.txt        # Python dependencies
```

## 🔐 Authentication Flow

1. **Frontend**: User signs up/logs in via Clerk components
2. **Clerk**: Generates JWT token and manages session
3. **Frontend**: Sends JWT token with API requests
4. **Backend**: Verifies JWT using Clerk's public keys
5. **Backend**: Processes request and returns results

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure authentication is properly implemented for new endpoints

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Clerk](https://clerk.com) for authentication infrastructure
- [Google Patents API](https://patents.google.com) for patent data
- [FastAPI](https://fastapi.tiangolo.com) for the backend framework
- [React](https://reactjs.org) and [Tailwind CSS](https://tailwindcss.com) for the frontend

## 📧 Contact

- Project Link: [https://github.com/scopophobic/vichaar](https://github.com/scopophobic/vichaar)
- Issues: [GitHub Issues](https://github.com/scopophobic/vichaar/issues)

---

Made with ❤️ for innovators and entrepreneurs
