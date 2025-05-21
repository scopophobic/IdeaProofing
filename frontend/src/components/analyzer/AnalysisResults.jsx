import {
  ChartBarIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export const AnalysisResults = ({ results }) => {
  if (!results) return null;

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-amber-500";
    return "text-rose-500";
  };

  const getScoreIcon = (score) => {
    if (score >= 80) return <ShieldCheckIcon className="h-6 w-6" />;
    if (score >= 60) return <LightBulbIcon className="h-6 w-6" />;
    return <ExclamationTriangleIcon className="h-6 w-6" />;
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
            <div
              className={`flex items-center gap-1 ${getScoreColor(
                results.noveltyScore
              )}`}
            >
              {getScoreIcon(results.noveltyScore)}
              <span className="font-semibold">{results.noveltyScore}%</span>
            </div>
          </div>
          <p className="text-sm text-prussian-blue/80">
            {results.noveltyExplanation}
          </p>
        </div>

        {/* Market Potential */}
        <div className="p-4 rounded-lg bg-gradient-to-br from-white to-thistle/20 border border-thistle/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-royal-purple">Market Potential</h3>
            <div
              className={`flex items-center gap-1 ${getScoreColor(
                results.marketPotential
              )}`}
            >
              {getScoreIcon(results.marketPotential)}
              <span className="font-semibold">{results.marketPotential}%</span>
            </div>
          </div>
          <p className="text-sm text-prussian-blue/80">
            {results.marketExplanation}
          </p>
        </div>

        {/* Similar Ideas */}
        {results.similarIdeas && results.similarIdeas.length > 0 && (
          <div className="p-4 rounded-lg bg-gradient-to-br from-white to-thistle/20 border border-thistle/50">
            <h3 className="font-medium text-royal-purple mb-2">
              Similar Ideas
            </h3>
            <ul className="space-y-2">
              {results.similarIdeas.map((idea, index) => (
                <li
                  key={index}
                  className="text-sm text-prussian-blue/80 flex items-start gap-2"
                >
                  <span className="text-royal-purple">•</span>
                  <span>{idea}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommendations */}
        {results.recommendations && results.recommendations.length > 0 && (
          <div className="p-4 rounded-lg bg-gradient-to-br from-white to-thistle/20 border border-thistle/50">
            <h3 className="font-medium text-royal-purple mb-2">
              Recommendations
            </h3>
            <ul className="space-y-2">
              {results.recommendations.map((rec, index) => (
                <li
                  key={index}
                  className="text-sm text-prussian-blue/80 flex items-start gap-2"
                >
                  <span className="text-royal-purple">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
