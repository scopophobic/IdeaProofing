import { RocketLaunchIcon } from "@heroicons/react/24/outline";

export const CallToAction = ({ onGetStarted }) => {
  return (
    <div className="py-24 bg-gradient-to-br from-royal-purple to-amethyst">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Validate Your Idea?
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Get started now and receive instant insights to help you make
            data-driven decisions about your innovation.
          </p>
          <button
            onClick={onGetStarted}
            className="btn bg-white text-royal-purple hover:bg-thistle/20 text-lg px-8 py-4 transform hover:scale-105 transition-transform duration-200"
          >
            <RocketLaunchIcon className="h-6 w-6" />
            Start Your Analysis
          </button>
          <p className="mt-4 text-white/80 text-sm">
            No credit card required. Free analysis for your first idea.
          </p>
        </div>
      </div>
    </div>
  );
}; 