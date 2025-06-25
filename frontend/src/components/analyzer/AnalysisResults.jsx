import { ChartBarIcon } from "@heroicons/react/24/outline";

export const AnalysisResults = ({ results }) => {
  if (!results) return null;

  // Helper to color the novelty score
  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-amber-500";
    return "text-rose-500";
  };

  return (
    <div className="card backdrop-blur-sm bg-white/90 border border-thistle/50 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-amethyst to-royal-purple p-2 rounded-lg">
          <ChartBarIcon className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-xl font-semibold bg-gradient-to-r from-royal-purple to-amethyst bg-clip-text text-transparent">
          Analysis Results
        </h2>
      </div>

      <div className="space-y-6">
        {/* Novelty Score */}
        <div className="p-4 rounded-lg bg-gradient-to-br from-white to-thistle/20 border border-thistle/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-royal-purple">Novelty Score</h3>
            <span
              className={`font-semibold text-lg ${getScoreColor(
                results.novelty_score
              )}`}
            >
              {results.novelty_score}%
            </span>
          </div>
        </div>

        {/* Similar Patents */}
        {results.similar_patents && results.similar_patents.length > 0 && (
          <div className="p-4 rounded-lg bg-gradient-to-br from-white to-thistle/20 border border-thistle/50">
            <h3 className="font-medium text-royal-purple mb-2">
              Top 5 Similar Patents
            </h3>
            <ul className="space-y-4">
              {results.similar_patents.slice(0, 5).map((patent, index) => (
                <li key={index} className="text-sm text-prussian-blue/80">
                  <a
                    href={patent.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-royal-purple hover:underline"
                  >
                    {patent.title}
                  </a>
                  <div className="mt-1 text-xs text-prussian-blue/70">
                    Similarity: {(patent.similarity * 100).toFixed(0)}%
                  </div>
                  <div className="mt-1">{patent.summary}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
