import { useState } from "react";
import { useAuthenticatedFetch, handleApiError } from "../../utils/auth";
import { IdeaInputForm } from "./IdeaInputForm";
import { AnalysisResults } from "./AnalysisResults";

export const AnalyzerPage = ({ onBack }) => {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const { authenticatedFetch, isSignedIn } = useAuthenticatedFetch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSignedIn) {
      setError("Please sign in to validate your idea");
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await authenticatedFetch(
        "http://127.0.0.1:8000/validate",
        {
          method: "POST",
          body: JSON.stringify({ idea_text: idea }),
        }
      );

      const data = await response.json();
      console.log(data);
      setResults(data);
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-thistle/5 via-white to-thistle/10">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        <IdeaInputForm
          idea={idea}
          setIdea={setIdea}
          onSubmit={handleSubmit}
          loading={loading}
        />
        {results && <AnalysisResults results={results} />}
      </main>
    </div>
  );
};
