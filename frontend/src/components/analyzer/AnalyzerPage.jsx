import { useState } from "react";
import { IdeaInputForm } from "./IdeaInputForm";
import { AnalysisResults } from "./AnalysisResults";

export const AnalyzerPage = ({ onBack }) => {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idea_text: idea }),
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error analyzing idea:", error);
      // TODO: Add proper error handling UI
      alert("Failed to analyze idea. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-thistle/5 via-white to-thistle/10">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
