# Frontend Authentication Setup

This guide explains how to set up authentication for the Vichaar frontend application.

## Overview

The frontend uses **Clerk** for authentication, which provides:

- User sign-up and sign-in
- JWT token management
- Protected routes
- User session management

## Setup Instructions

### 1. Create a Clerk Account

1. Go to [clerk.com](https://clerk.com)
2. Sign up for a free account
3. Create a new application

### 2. Configure Environment Variables

Create a `.env` file in the frontend directory:

```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here

# API Configuration
VITE_API_BASE_URL=http://127.0.0.1:8000
```

### 3. Get Your Clerk Keys

1. In your Clerk dashboard, go to **API Keys**
2. Copy the **Publishable Key** (starts with `pk_test_`)
3. Replace the placeholder in your `.env` file

### 4. Configure Clerk Settings

In your Clerk dashboard:

1. **Domains**: Add `localhost:5173` to allowed domains
2. **Redirect URLs**: Add `http://localhost:5173/sign-in` and `http://localhost:5173/sign-up`
3. **JWT Templates**: Create a JWT template for your backend

### 5. Backend Configuration

Make sure your backend is configured to accept Clerk JWT tokens:

1. Update your backend's `.env` file with Clerk settings
2. Configure the JWT verification in your backend

## How It Works

### Authentication Flow

1. User visits the app
2. If not signed in, they're redirected to `/sign-in`
3. User signs in with Clerk
4. Clerk provides a JWT token
5. Token is automatically included in API requests
6. Backend verifies the token and processes requests

### Protected Routes

- `/analyzer` - Requires authentication
- `/sign-in` - Public route
- `/sign-up` - Public route
- `/` - Public route (landing page)

### API Requests

All API requests to protected endpoints automatically include the JWT token:

```javascript
const { authenticatedFetch } = useAuthenticatedFetch();

const response = await authenticatedFetch("http://127.0.0.1:8000/validate", {
  method: "POST",
  body: JSON.stringify({ idea_text: idea }),
});
```

## Components

### AuthPage

- Handles sign-in and sign-up UI
- Toggle between sign-in and sign-up forms
- Styled to match the app's design

### ProtectedRoute

- Wraps components that require authentication
- Automatically redirects unauthenticated users
- Shows loading state while checking authentication

### useAuthenticatedFetch

- Custom hook for making authenticated API requests
- Automatically includes JWT token
- Handles authentication errors

## Troubleshooting

### Common Issues

1. **403 Forbidden Error**

   - Check if user is signed in
   - Verify JWT token is being sent
   - Check backend JWT verification

2. **Clerk Configuration Issues**

   - Verify publishable key is correct
   - Check domain settings in Clerk dashboard
   - Ensure redirect URLs are configured

3. **CORS Issues**
   - Make sure backend CORS is configured for frontend domain
   - Check if Authorization header is allowed

### Debug Steps

1. Check browser console for errors
2. Verify environment variables are loaded
3. Test authentication flow manually
4. Check network tab for API request headers

## Security Notes

- Never expose Clerk secret keys in frontend code
- Always use HTTPS in production
- Implement proper error handling for authentication failures
- Consider implementing token refresh logic for long sessions
