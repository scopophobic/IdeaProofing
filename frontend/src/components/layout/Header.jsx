import { LightBulbIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export const Header = ({
  showBack = false,
  onBack,
  showAnalyzer = false,
  onAnalyzer,
}) => {
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
