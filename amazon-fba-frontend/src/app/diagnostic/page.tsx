"use client";

import { KeywordGapsCard } from "@/components/KeywordGapsCard";
import { ListingOptimizationCard } from "@/components/ListingOptimizationCard";
import { ProductInfoCard } from "@/components/ProductInfoCard";
import { SalesProblemsCard } from "@/components/SalesProblemsCard";
import { TopPerformersCard } from "@/components/TopPerformersCard";
import { diagnoseSalesProblems, type DiagnosticResponse } from "@/lib/api";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useState } from "react";

export default function DiagnosticPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<DiagnosticResponse | null>(null);

  const handleDiagnose = async () => {
    if (!url.trim()) {
      setError("Please enter an Amazon product URL");
      return;
    }

    if (!url.includes("amazon.com") && !url.includes("amazon.")) {
      setError("Please enter a valid Amazon product URL");
      return;
    }

    setLoading(true);
    setError("");
    setResults(null);

    try {
      const data = await diagnoseSalesProblems(url);
      setResults(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Diagnostic failed";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-xl mb-4">
          <AlertTriangle className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Sales Diagnostic</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Identify why your product is not selling and get actionable strategies
          to boost sales
        </p>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Amazon Product URL
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.amazon.com/dp/XXXXXXXXXX"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <button
            onClick={handleDiagnose}
            disabled={loading || !url.trim()}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Diagnosing Sales Issues...</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-5 h-5" />
                <span>Diagnose Sales Problems</span>
              </>
            )}
          </button>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-700 text-sm">
              <strong>Advanced Analysis:</strong> This tool uses enhanced
              scraping and AI analysis to identify specific issues preventing
              sales and provides actionable solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-red-500 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-900">
              Analyzing Your Product
            </h3>
            <p className="text-gray-600">
              We&apos;re analyzing your product, comparing with top competitors, and
              identifying sales issues. This may take 2-3 minutes.
            </p>
          </div>
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="space-y-8">
          {/* Summary Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Diagnostic Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">
                  {results.summary.criticalIssuesFound}
                </div>
                <div className="text-gray-600">Critical Issues</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">
                  {results.summary.keywordGapsIdentified}
                </div>
                <div className="text-gray-600">Keyword Gaps</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {results.summary.competitorsAnalyzed}
                </div>
                <div className="text-gray-600">Competitors Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {results.summary.optimizationSuggestions}
                </div>
                <div className="text-gray-600">Optimization Tips</div>
              </div>
            </div>
          </div>

          {/* Analysis Cards */}
          <div className="grid grid-cols-1 gap-8">
            <ProductInfoCard product={results.yourProduct} />
            <SalesProblemsCard problems={results.salesProblems} />
            <KeywordGapsCard gaps={results.keywordGaps} />
            <ListingOptimizationCard
              optimization={results.listingOptimization}
            />
            <TopPerformersCard competitors={results.topPerformers} />
          </div>
        </div>
      )}
    </div>
  );
}
