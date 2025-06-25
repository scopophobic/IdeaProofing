import { RocketLaunchIcon } from "@heroicons/react/24/outline";

export const Hero = ({ onGetStarted, isSignedIn = false }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-thistle/20 via-white to-thistle/10" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-prussian-blue mb-6">
            Validate Your Ideas with{" "}
            <span className="bg-gradient-to-r from-royal-purple to-amethyst bg-clip-text text-transparent">
              AI-Powered Analysis
            </span>
          </h1>
          <p className="text-xl text-prussian-blue/80 max-w-3xl mx-auto mb-8">
            Get instant insights into your idea's novelty, market potential, and
            competitive landscape. Make data-driven decisions for your next
            innovation.
          </p>
          <button
            onClick={onGetStarted}
            className="btn btn-primary text-lg px-8 py-4"
          >
            <RocketLaunchIcon className="h-6 w-6" />
            {isSignedIn
              ? "Start Analyzing Your Idea"
              : "Get Started - Sign Up Free"}
          </button>
          {!isSignedIn && (
            <p className="text-sm text-prussian-blue/60 mt-4">
              No credit card required • Start analyzing in seconds
            </p>
          )}
        </div>

        {/* Feature highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card backdrop-blur-sm bg-white/90 border border-thistle/50">
            <div className="text-royal-purple text-4xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold text-prussian-blue mb-2">
              Novelty Analysis
            </h3>
            <p className="text-prussian-blue/70">
              Evaluate how unique and innovative your idea is compared to
              existing solutions.
            </p>
          </div>
          <div className="card backdrop-blur-sm bg-white/90 border border-thistle/50">
            <div className="text-royal-purple text-4xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-prussian-blue mb-2">
              Market Insights
            </h3>
            <p className="text-prussian-blue/70">
              Understand market potential and identify opportunities for
              differentiation.
            </p>
          </div>
          <div className="card backdrop-blur-sm bg-white/90 border border-thistle/50">
            <div className="text-royal-purple text-4xl mb-4">💡</div>
            <h3 className="text-lg font-semibold text-prussian-blue mb-2">
              Smart Recommendations
            </h3>
            <p className="text-prussian-blue/70">
              Receive actionable suggestions to improve and strengthen your
              idea.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
