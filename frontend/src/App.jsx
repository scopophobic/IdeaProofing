import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { Header } from "./components/layout/Header";
import { LandingPage } from "./components/landing/LandingPage";
import { AnalyzerPage } from "./components/analyzer/AnalyzerPage";
import axios from "axios";
import {
  LightBulbIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
  SparklesIcon,
  ArrowRightIcon,
  DocumentMagnifyingGlassIcon,
  BuildingOfficeIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  ArrowTopRightOnSquareIcon,
  DocumentTextIcon,
  ChartPieIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

// Wrapper component t
// o handle navigation
const AppContent = () => {
  const navigate = useNavigate();
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showAnalyzer, setShowAnalyzer] = useState(false);
  const [analysisStep, setAnalysisStep] = useState("input"); // 'input', 'analyzing', 'results'
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisDetails, setAnalysisDetails] = useState({
    patents: { status: "pending", count: 0 },
    startups: { status: "pending", count: 0 },
    trends: { status: "pending", count: 0 },
    suggestions: { status: "pending", count: 0 },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setAnalysisStep("analyzing");
    setAnalysisProgress(0);
    setAnalysisDetails({
      patents: { status: "analyzing", count: 0 },
      startups: { status: "pending", count: 0 },
      trends: { status: "pending", count: 0 },
      suggestions: { status: "pending", count: 0 },
    });

    // Simulate analysis steps for better UX
    const simulateProgress = () => {
      const interval = setInterval(() => {
        setAnalysisProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });

        // Update analysis details based on progress
        if (analysisProgress === 25) {
          setAnalysisDetails((prev) => ({
            ...prev,
            patents: { status: "complete", count: 5 },
          }));
        } else if (analysisProgress === 50) {
          setAnalysisDetails((prev) => ({
            ...prev,
            startups: { status: "complete", count: 3 },
          }));
        } else if (analysisProgress === 75) {
          setAnalysisDetails((prev) => ({
            ...prev,
            trends: { status: "complete", count: 4 },
          }));
        } else if (analysisProgress === 90) {
          setAnalysisDetails((prev) => ({
            ...prev,
            suggestions: { status: "complete", count: 3 },
          }));
        }
      }, 50);
    };

    simulateProgress();

    try {
      const response = await axios.post("/api/validate", {
        idea_text: idea,
      });
      setResult(response.data);
      setAnalysisStep("results");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "An error occurred while validating your idea"
      );
      setAnalysisStep("input");
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      title: "Patent Analysis",
      description: "Discover similar patents and avoid reinventing the wheel",
      icon: DocumentMagnifyingGlassIcon,
      status: "active",
    },
    {
      title: "Startup Validation",
      description: "Check if similar startups exist in the market",
      icon: BuildingOfficeIcon,
      status: "coming-soon",
    },
    {
      title: "Market Trends",
      description: "Analyze market interest and growth potential",
      icon: ChartBarIcon,
      status: "coming-soon",
    },
    {
      title: "AI-Powered Suggestions",
      description: "Get smart recommendations to improve your idea",
      icon: SparklesIcon,
      status: "coming-soon",
    },
  ];

  const AnalysisStep = ({ icon: Icon, title, status, count, description }) => (
    <div
      className={`flex items-start gap-4 p-4 rounded-lg transition-all duration-300 ${
        status === "complete"
          ? "bg-thistle/20 border border-amethyst/20"
          : status === "analyzing"
          ? "bg-royal-purple/10 border border-royal-purple/20"
          : "bg-white/50 border border-thistle/50"
      }`}
    >
      <div
        className={`p-2 rounded-lg ${
          status === "complete"
            ? "bg-amethyst/20 text-amethyst"
            : status === "analyzing"
            ? "bg-royal-purple/20 text-royal-purple animate-pulse"
            : "bg-thistle/20 text-royal-purple/50"
        }`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-medium text-royal-purple">{title}</h3>
          {status === "complete" && (
            <span className="text-sm text-amethyst font-medium">
              {count} results
            </span>
          )}
        </div>
        <p className="text-sm text-prussian-blue/70">{description}</p>
        {status === "analyzing" && (
          <div className="mt-2 h-1 bg-thistle/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amethyst to-royal-purple animate-pulse"
              style={{ width: "60%" }}
            />
          </div>
        )}
      </div>
    </div>
  );

  const handleGetStarted = () => {
    setShowAnalyzer(true);
    navigate("/analyzer");
  };

  const handleBack = () => {
    setShowAnalyzer(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-thistle/5 via-white to-thistle/10">
      <Header showBack={showAnalyzer} onBack={handleBack} />
      <Routes>
        <Route
          path="/"
          element={<LandingPage onGetStarted={handleGetStarted} />}
        />
        <Route
          path="/analyzer"
          element={<AnalyzerPage onBack={handleBack} />}
        />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
