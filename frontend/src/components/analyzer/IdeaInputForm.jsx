import {
  DocumentTextIcon,
  RocketLaunchIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

export const IdeaInputForm = ({ idea, setIdea, onSubmit, loading }) => {
  return (
    <div className="card backdrop-blur-sm bg-white/90 border border-thistle/50 shadow-lg mb-8 transform hover:scale-[1.01] transition-transform duration-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-amethyst to-royal-purple p-2 rounded-lg">
          <DocumentTextIcon className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-xl font-semibold bg-gradient-to-r from-royal-purple to-amethyst bg-clip-text text-transparent">
          Describe Your Idea
        </h2>
      </div>
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="idea"
            className="block text-sm font-medium text-royal-purple mb-2"
          >
            What's your innovative idea?
          </label>
          <textarea
            id="idea"
            rows={6}
            className="input"
            placeholder="Describe your idea in detail. Include the problem it solves, your proposed solution, and any unique features..."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            required
          />
          <p className="mt-2 text-sm text-prussian-blue/60">
            The more details you provide, the better we can analyze your idea.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="btn btn-primary flex-1"
            disabled={loading}
          >
            {loading ? (
              <>
                <ArrowPathIcon className="h-5 w-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <RocketLaunchIcon className="h-5 w-5" />
                Start Analysis
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => setIdea("")}
            className="btn bg-white text-royal-purple border border-thistle hover:bg-thistle/20"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};
