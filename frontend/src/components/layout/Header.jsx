import { LightBulbIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";

export const Header = ({
  showBack = false,
  onBack,
  showAnalyzer = false,
  onAnalyzer,
  isSignedIn = false,
}) => {
  const { signOut } = useAuth();
  const { user } = useUser();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-amethyst to-royal-purple p-2 rounded-lg">
                <LightBulbIcon className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-royal-purple to-amethyst bg-clip-text text-transparent">
                Vichaar
              </h1>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/scopophobic/vichaar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-royal-purple transition-colors duration-200"
            >
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="hidden sm:inline">Source Code</span>
            </a>

            {/* Authentication Section */}
            {isSignedIn ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-gradient-to-br from-amethyst to-royal-purple rounded-full flex items-center justify-center text-white font-medium">
                    {user?.firstName?.charAt(0) ||
                      user?.emailAddresses?.[0]?.emailAddress?.charAt(0) ||
                      "U"}
                  </div>
                  <span className="hidden sm:inline">
                    {user?.firstName || user?.emailAddresses?.[0]?.emailAddress}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="text-gray-600 hover:text-royal-purple transition-colors duration-200 text-sm"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/sign-in"
                  className="text-gray-600 hover:text-royal-purple transition-colors duration-200 text-sm"
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className="bg-gradient-to-r from-amethyst to-royal-purple text-white px-4 py-2 rounded-lg hover:from-royal-purple hover:to-amethyst transition-all duration-300 text-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {showBack && (
              <button
                onClick={onBack}
                className="text-royal-purple hover:text-amethyst transition-colors duration-200"
              >
                Back to Home
              </button>
            )}
            {showAnalyzer && (
              <button
                onClick={onAnalyzer}
                className="btn bg-gradient-to-r from-amethyst to-royal-purple text-white hover:from-royal-purple hover:to-amethyst transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Try Analyzer
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
