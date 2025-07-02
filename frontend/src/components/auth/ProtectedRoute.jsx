import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const ProtectedRoute = ({ children, redirectTo = "/sign-in" }) => {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate(redirectTo);
    }
  }, [isLoaded, isSignedIn, navigate, redirectTo]);

  // Show loading while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-thistle/5 via-white to-thistle/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal-purple mx-auto mb-4"></div>
          <p className="text-royal-purple">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children if not signed in (will redirect)
  if (!isSignedIn) {
    return null;
  }

  return children;
};
