"use client";

import { AdKeywordsCard } from "@/components/AdKeywordsCard";
import { CompetitorAnalysisCard } from "@/components/CompetitorAnalysisCard";
import { KeywordAnalysisCard } from "@/components/KeywordAnalysisCard";
import { ProductInfoCard } from "@/components/ProductInfoCard";
import { analyzeProduct, type BasicAnalysisResponse } from "@/lib/api";
import { BarChart3, Loader2 } from "lucide-react";
import { useState } from "react";

export default function AnalysisPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<BasicAnalysisResponse | null>(null);

  const handleAnalyze = async () => {
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
      const data = await analyzeProduct(url);
      setResults(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Analysis failed";

      if (
        errorMessage.includes("scrape") ||
        errorMessage.includes("selector")
      ) {
        setError(
          "Basic analysis failed due to Amazon's anti-bot measures. Try using the Sales Diagnostic instead, which uses advanced techniques to analyze your product."
        );
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl mb-4">
          <BarChart3 className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Product Analysis</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Analyze your Amazon product for keywords, competitors, and sales
          opportunities
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={loading || !url.trim()}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Analyzing Product...</span>
              </>
            ) : (
              <>
                <BarChart3 className="w-5 h-5" />
                <span>Analyze Product</span>
              </>
            )}
          </button>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-700 text-sm">
              <strong>Recommended:</strong> Use the Sales Diagnostic for more
              reliable analysis with advanced competitor insights and problem
              identification.
            </p>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-900">
              Analyzing Your Product
            </h3>
            <p className="text-gray-600">
              This may take 1-2 minutes. We&apos;re scraping data, analyzing
              keywords, and finding competitors.
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
              Analysis Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {results.summary.totalKeywords}
                </div>
                <div className="text-gray-600">Keywords Found</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {results.summary.competitorsAnalyzed}
                </div>
                <div className="text-gray-600">Competitors Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {results.summary.adKeywordsGenerated}
                </div>
                <div className="text-gray-600">Ad Keywords Generated</div>
              </div>
            </div>
          </div>

          {/* Analysis Cards */}
          <div className="grid grid-cols-1 gap-8">
            <ProductInfoCard product={results.productData} />
            <KeywordAnalysisCard analysis={results.keywordAnalysis} />
            <CompetitorAnalysisCard
              competitors={results.competitors}
              analysis={results.competitorAnalysis}
            />
            <AdKeywordsCard keywords={results.adKeywords} />
          </div>
        </div>
      )}
    </div>
  );
}
