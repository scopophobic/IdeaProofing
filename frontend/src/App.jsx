import { useState } from "react";
import axios from "axios";
import { LightBulbIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

function App() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post("/api/validate", {
        idea_text: idea,
      });
      setResult(response.data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "An error occurred while validating your idea"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <LightBulbIcon className="h-8 w-8 text-primary-600" />
            <h1 className="text-2xl font-bold text-gray-900">IdeaProofing</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Idea Input Form */}
          <form onSubmit={handleSubmit} className="card mb-8">
            <h2 className="text-xl font-semibold mb-4">Validate Your Idea</h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="idea"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Describe your idea
                </label>
                <textarea
                  id="idea"
                  rows={4}
                  className="input"
                  placeholder="Enter your idea in detail..."
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-full flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <ArrowPathIcon className="h-5 w-5 animate-spin" />
                    Validating...
                  </>
                ) : (
                  "Validate Idea"
                )}
              </button>
            </div>
          </form>

          {/* Results */}
          {error && (
            <div className="card bg-red-50 border border-red-200 mb-8">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {result && (
            <div className="space-y-8">
              {/* Novelty Score */}
              <div className="card">
                <h2 className="text-xl font-semibold mb-4">Novelty Score</h2>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-600 transition-all duration-500"
                        style={{ width: `${result.novelty_score}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-primary-600">
                    {result.novelty_score}%
                  </span>
                </div>
              </div>

              {/* Similar Patents */}
              <div className="card">
                <h2 className="text-xl font-semibold mb-4">Similar Patents</h2>
                <div className="space-y-4">
                  {result.similar_patents.map((patent, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:border-primary-200 transition-colors duration-200"
                    >
                      <h3 className="font-medium text-lg mb-2">
                        {patent.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{patent.summary}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          Similarity: {patent.similarity}%
                        </span>
                        <a
                          href={patent.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                          View Patent →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
