import { useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import InputForm from './components/InputForm';
import LoadingState from './components/LoadingState';
import ScoreCard from './components/ScoreCard';
import ScoreDimension from './components/ScoreDimension';
import StrengthsRedFlags from './components/StrengthsRedFlags';
import ActivityChart from './components/ActivityChart';
import LanguageChart from './components/LanguageChart';
import RepoAnalysis from './components/RepoAnalysis';
import Recommendations from './components/Recommendations';
import AIInsights from './components/AIInsights';
import ExportShare from './components/ExportShare';
import BeforeAfter from './components/BeforeAfter';
import ResumeGenerator from './components/ResumeGenerator';
import ComparisonBenchmark from './components/ComparisonBenchmark';
import ParticleBackground from './components/ParticleBackground';
import Footer from './components/Footer';

const API_URL = import.meta.env.VITE_API_URL || '';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadingStep, setLoadingStep] = useState('');
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);

  const analyzeProfile = async (githubUrl) => {
    setLoading(true);
    setError('');
    setResult(null);
    setLoadingStepIndex(0);

    const steps = [
      'Fetching GitHub profile...',
      'Loading repositories...',
      'Analyzing code structure...',
      'Evaluating commit patterns...',
      'Generating AI insights...',
      'Calculating portfolio score...'
    ];

    let stepIndex = 0;
    setLoadingStep(steps[0]);
    const stepInterval = setInterval(() => {
      stepIndex++;
      if (stepIndex < steps.length) {
        setLoadingStep(steps[stepIndex]);
        setLoadingStepIndex(stepIndex);
      }
    }, 2500);

    try {
      const response = await axios.post(`${API_URL}/api/analyze`, { githubUrl });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze profile. Please try again.');
    } finally {
      setLoading(false);
      clearInterval(stepInterval);
      setLoadingStep('');
      setLoadingStepIndex(0);
    }
  };

  return (
    <div className="min-h-screen bg-radial-glow relative">
      <ParticleBackground />
      <div className="relative z-10">
        <Navbar />

        {!result && !loading && (
          <>
            <HeroSection />
            <InputForm onSubmit={analyzeProfile} error={error} />
          </>
        )}

        {loading && <LoadingState step={loadingStep} stepIndex={loadingStepIndex} />}

        {result && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
            {/* Back button */}
            <button
              onClick={() => setResult(null)}
              className="group flex items-center gap-2 text-github-muted hover:text-github-accent transition-all duration-300"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm">Analyze another profile</span>
            </button>

            {/* Profile Header + Overall Score */}
            <ScoreCard data={result} />

            {/* Score Dimensions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(result.dimensions).map(([key, dim]) => (
                <ScoreDimension key={key} dimension={dim} />
              ))}
            </div>

            {/* Strengths & Red Flags */}
            <StrengthsRedFlags strengths={result.strengths} redFlags={result.redFlags} />

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ActivityChart data={result.commitActivity} />
              <LanguageChart data={result.languageStats} />
            </div>

            {/* AI Insights */}
            {result.aiInsights && <AIInsights insights={result.aiInsights} />}

            {/* Repository Analysis */}
            <RepoAnalysis repos={result.repoAnalysis} />

            {/* Recommendations */}
            <Recommendations recommendations={result.recommendations} />

            {/* Before & After Preview */}
            <BeforeAfter data={result} />

            {/* Comparison Benchmark */}
            <ComparisonBenchmark dimensions={result.dimensions} />

            {/* Portfolio Resume Generator */}
            <ResumeGenerator data={result} />

            {/* Export & Share */}
            <ExportShare data={result} />

            {/* Analyzed timestamp */}
            <div className="text-center py-6">
              <p className="text-github-muted text-xs">
                Analyzed at {new Date(result.analyzedAt).toLocaleString()}
              </p>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}

export default App;
