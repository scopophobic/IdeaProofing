import { useState } from "react";
import { SignIn, SignUp, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  // Redirect if already signed in
  if (isSignedIn) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-thistle/5 via-white to-thistle/10 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-royal-purple mb-2">
              Welcome to Vichaar
            </h1>
            <p className="text-prussian-blue/70">
              {isSignIn
                ? "Sign in to validate your ideas"
                : "Create an account to get started"}
            </p>
          </div>

          <div className="mb-6">
            <div className="flex bg-thistle/20 rounded-lg p-1">
              <button
                onClick={() => setIsSignIn(true)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  isSignIn
                    ? "bg-white text-royal-purple shadow-sm"
                    : "text-prussian-blue/70 hover:text-prussian-blue"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignIn(false)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  !isSignIn
                    ? "bg-white text-royal-purple shadow-sm"
                    : "text-prussian-blue/70 hover:text-prussian-blue"
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {isSignIn ? (
              <SignIn
                routing="path"
                path="/sign-in"
                appearance={{
                  elements: {
                    formButtonPrimary:
                      "bg-royal-purple hover:bg-royal-purple/90 text-white",
                    card: "shadow-none",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                  },
                }}
              />
            ) : (
              <SignUp
                routing="path"
                path="/sign-up"
                appearance={{
                  elements: {
                    formButtonPrimary:
                      "bg-royal-purple hover:bg-royal-purple/90 text-white",
                    card: "shadow-none",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                  },
                }}
              />
            )}
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-prussian-blue/60">
              By continuing, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
