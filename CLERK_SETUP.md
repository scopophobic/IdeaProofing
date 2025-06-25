# Clerk Authentication Setup Guide

## Frontend Configuration

1. **Get your Clerk Publishable Key:**

   - Go to [Clerk Dashboard](https://dashboard.clerk.com)
   - Create a new application or select existing one
   - Go to API Keys section
   - Copy your Publishable Key

2. **Update your App.jsx:**
   Replace the placeholder in `frontend/src/App.jsx`:

   ```javascript
   const CLERK_PUBLISHABLE_KEY = "pk_test_YOUR_ACTUAL_CLERK_PUBLISHABLE_KEY";
   ```

3. **Configure Clerk Dashboard:**
   - Go to your Clerk application dashboard
   - Navigate to "User & Authentication" → "Email, Phone, Username"
   - Enable the authentication methods you want (Email, Google, GitHub, etc.)
   - Go to "Paths" and configure your sign-in/sign-up paths if needed

## Backend Configuration

1. **Install required packages:**

   ```bash
   `pip install PyJWT requests`
   ```

2. **Set up environment variables:**
   Create a `.env` file in your project root:

   ```env
   # Clerk Authentication Configuration
   CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
   CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here
   CLERK_JWT_ISSUER=https://clerk.your-domain.com
   CLERK_JWT_AUDIENCE=your-audience

   # API Configuration
   API_HOST=0.0.0.0
   API_PORT=8000
   DEBUG=False

   # CORS Configuration
   ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
   ```

3. **Get your Clerk configuration:**
   - In your Clerk dashboard, go to "JWT Templates"
   - Create a new JWT template or use the default one
   - Note down the Issuer URL and Audience
   - Update these values in your `.env` file

## Testing the Integration

1. **Start the backend:**

   ```bash
   python main.py
   ```

2. **Start the frontend:**

   ```bash
   cd frontend
   npm run dev
   ```

3. **Test the flow:**
   - Visit your frontend (usually http://localhost:5173)
   - Click "Get Started" or "Sign Up"
   - Complete the sign-up process
   - Try to validate an idea (should now work with authentication)

## Troubleshooting

### Common Issues:

1. **"Invalid token" errors:**

   - Check that your CLERK_JWT_ISSUER and CLERK_JWT_AUDIENCE match your Clerk dashboard
   - Ensure your JWT template is properly configured

2. **CORS errors:**

   - Make sure ALLOWED_ORIGINS includes your frontend URL
   - Check that your frontend is running on the expected port

3. **"Failed to fetch JWKS" errors:**
   - Verify your CLERK_JWT_ISSUER is correct
   - Check your internet connection

### Debug Mode:

Set `DEBUG=True` in your `.env` file to get more detailed error messages.

## Security Notes

- Never commit your `.env` file to version control
- Use environment variables for all sensitive configuration
- Regularly rotate your Clerk API keys
- Monitor your Clerk dashboard for any suspicious activity
