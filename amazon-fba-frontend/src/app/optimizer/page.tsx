"use client";

import type { NewProductOptimizerResponse } from "@/lib/api";
import { optimizeNewProduct } from "@/lib/api";
import { Loader2, Plus, Rocket, Target, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function OptimizerPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<NewProductOptimizerResponse | null>(
    null
  );
  const [activeTab, setActiveTab] = useState("listing");

  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    features: "",
    targetAudience: "",
    priceRange: "",
    uniqueSellingPoints: "",
    keywords: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults(null);

    try {
      // Transform the form data to match backend expectations
      const transformedData = {
        ...formData,
        features: formData.features.split("\n").filter((f) => f.trim()),
        uniqueSellingPoints: formData.uniqueSellingPoints
          ? formData.uniqueSellingPoints.split("\n").filter((usp) => usp.trim())
          : [],
        keywords: formData.keywords
          ? formData.keywords
              .split(",")
              .map((k) => k.trim())
              .filter((k) => k)
          : [],
      };

      const response = await optimizeNewProduct(transformedData);
      setResults(response);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to optimize product"
      );
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formData.productName && formData.category && formData.features;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-xl mb-4">
          <Rocket className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Launch Optimizer</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Create SEO-optimized listings for new products with competitor
          intelligence
        </p>
      </div>

      {/* Product Information Form */}
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 mb-6">
          <Plus className="w-6 h-6 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            New Product Information
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                placeholder="e.g., Wireless Bluetooth Headphones"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="e.g., Electronics, Home & Kitchen"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Audience
              </label>
              <input
                type="text"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleInputChange}
                placeholder="e.g., Fitness enthusiasts, Working professionals"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <input
                type="text"
                name="priceRange"
                value={formData.priceRange}
                onChange={handleInputChange}
                placeholder="e.g., $25-35"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Key Features *
            </label>
            <textarea
              name="features"
              value={formData.features}
              onChange={handleInputChange}
              placeholder="List the main features of your product (one per line)"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unique Selling Points
            </label>
            <textarea
              name="uniqueSellingPoints"
              value={formData.uniqueSellingPoints}
              onChange={handleInputChange}
              placeholder="What makes your product different from competitors?"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Initial Keywords (Optional)
            </label>
            <input
              type="text"
              name="keywords"
              value={formData.keywords}
              onChange={handleInputChange}
              placeholder="e.g., wireless headphones, bluetooth earbuds"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !isFormValid}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Optimizing Product...</span>
              </>
            ) : (
              <>
                <Target className="w-5 h-5" />
                <span>Optimize Product Listing</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-6 h-6" />
              <h2 className="text-xl font-bold">Optimization Complete</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {results.summary?.competitorsAnalyzed || 0}
                </div>
                <div className="text-green-100">Competitors Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {results.summary?.keywordsGenerated || 0}
                </div>
                <div className="text-green-100">Keywords Generated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {results.summary?.launchPhases || 0}
                </div>
                <div className="text-green-100">Launch Phases</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {results.summary?.estimatedLaunchReadiness || "High"}
                </div>
                <div className="text-green-100">Launch Readiness</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: "listing", label: "Optimized Listing", icon: "📝" },
                  { id: "strategy", label: "Launch Strategy", icon: "🚀" },
                  { id: "insights", label: "Market Insights", icon: "💡" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? "border-green-500 text-green-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === "listing" && results.optimizedListing && (
                <div className="space-y-6">
                  {/* Optimized Title */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">
                      Optimized Title
                    </h3>
                    <div className="bg-white p-4 rounded border">
                      <p className="font-medium text-gray-900">
                        {typeof results.optimizedListing.title === "string"
                          ? results.optimizedListing.title
                          : results.optimizedListing.title?.optimizedTitle ||
                            results.optimizedListing.optimizedTitle?.title}
                      </p>
                    </div>
                    <div className="mt-3 text-sm text-blue-700">
                      <p>
                        <strong>Characters:</strong>{" "}
                        {(typeof results.optimizedListing.title === "string"
                          ? results.optimizedListing.title
                          : results.optimizedListing.title?.optimizedTitle ||
                            results.optimizedListing.optimizedTitle?.title
                        )?.length ||
                          results.optimizedListing.optimizedTitle
                            ?.charactersUsed ||
                          0}
                        /200
                      </p>
                      {typeof results.optimizedListing.title === "object" &&
                        results.optimizedListing.title?.seoScore && (
                          <p>
                            <strong>SEO Score:</strong>{" "}
                            {results.optimizedListing.title.seoScore}%
                          </p>
                        )}
                    </div>
                    {typeof results.optimizedListing.title === "object" &&
                      results.optimizedListing.title?.improvements && (
                        <div className="mt-3">
                          <h4 className="font-medium text-blue-800 mb-2">
                            Improvements:
                          </h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            {results.optimizedListing.title.improvements.map(
                              (improvement, idx) => (
                                <li key={idx}>• {improvement}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                  </div>

                  {/* Bullet Points */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-900 mb-3">
                      Bullet Points
                    </h3>
                    <div className="space-y-3">
                      {results.optimizedListing.bulletPoints?.map(
                        (bullet, index) => (
                          <div
                            key={index}
                            className="bg-white p-4 rounded border"
                          >
                            <p className="font-medium text-gray-900">
                              •{" "}
                              {typeof bullet === "string"
                                ? bullet
                                : bullet.bulletPoint ||
                                  bullet.point ||
                                  "Bullet point"}
                            </p>
                            {typeof bullet === "object" && bullet.focus && (
                              <p className="text-sm text-green-600 mt-1">
                                <strong>Focus:</strong> {bullet.focus}
                              </p>
                            )}
                            {typeof bullet === "object" &&
                              bullet.emotionalTrigger && (
                                <p className="text-sm text-green-600 mt-1">
                                  <strong>Emotional Trigger:</strong>{" "}
                                  {bullet.emotionalTrigger}
                                </p>
                              )}
                            {typeof bullet === "object" &&
                              bullet.keywords &&
                              bullet.keywords.length > 0 && (
                                <p className="text-sm text-blue-600 mt-1">
                                  <strong>Keywords:</strong>{" "}
                                  {bullet.keywords.join(", ")}
                                </p>
                              )}
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Product Description */}
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-purple-900 mb-3">
                      Product Description
                    </h3>
                    <div className="bg-white p-4 rounded border space-y-4">
                      {results.optimizedListing.productDescription
                        ?.shortDescription && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">
                            Hook:
                          </h4>
                          <p className="text-gray-700">
                            {
                              results.optimizedListing.productDescription
                                .shortDescription
                            }
                          </p>
                        </div>
                      )}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Full Description:
                        </h4>
                        <div className="text-gray-700 whitespace-pre-line">
                          {results.optimizedListing.productDescription
                            ?.detailedDescription ||
                            results.optimizedListing.productDescription
                              ?.description ||
                            results.optimizedListing.description ||
                            "No description available"}
                        </div>
                      </div>
                      {results.optimizedListing.productDescription
                        ?.emotionalHooks &&
                        results.optimizedListing.productDescription
                          .emotionalHooks.length > 0 && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">
                              Emotional Hooks:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {results.optimizedListing.productDescription.emotionalHooks.map(
                                (hook, idx) => (
                                  <span
                                    key={idx}
                                    className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm"
                                  >
                                    {hook}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      {results.optimizedListing.productDescription
                        ?.callToAction && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">
                            Call to Action:
                          </h4>
                          <p className="text-gray-700 font-medium">
                            {
                              results.optimizedListing.productDescription
                                .callToAction
                            }
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Backend Keywords */}
                  {results.optimizedListing.backendKeywords && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Backend Keywords
                      </h3>
                      <div className="bg-white p-4 rounded border space-y-3">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">
                            Search Terms:
                          </h4>
                          <p className="text-gray-700">
                            {Array.isArray(
                              results.optimizedListing.backendKeywords
                            )
                              ? results.optimizedListing.backendKeywords.join(
                                  ", "
                                )
                              : results.optimizedListing.backendKeywords.searchTerms?.join(
                                  ", "
                                ) || "No backend keywords available"}
                          </p>
                        </div>
                        {!Array.isArray(
                          results.optimizedListing.backendKeywords
                        ) &&
                          results.optimizedListing.backendKeywords
                            .totalCharacters && (
                            <div className="text-sm text-gray-600">
                              <strong>Total Characters:</strong>{" "}
                              {
                                results.optimizedListing.backendKeywords
                                  .totalCharacters
                              }
                              /250
                            </div>
                          )}
                        {!Array.isArray(
                          results.optimizedListing.backendKeywords
                        ) &&
                          results.optimizedListing.backendKeywords.strategy && (
                            <div className="text-sm text-gray-600">
                              <strong>Strategy:</strong>{" "}
                              {
                                results.optimizedListing.backendKeywords
                                  .strategy
                              }
                            </div>
                          )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "strategy" && results.launchPlan && (
                <div className="space-y-6">
                  {/* Launch Plan Overview */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-900 mb-4">
                      🚀 Launch Plan Overview
                    </h3>

                    {/* Pre-launch Phase */}
                    {results.launchPlan.prelaunchPhase && (
                      <div className="mb-6">
                        <h4 className="font-medium text-green-800 mb-3">
                          Pre-Launch Phase (
                          {results.launchPlan.prelaunchPhase.duration})
                        </h4>
                        <div className="space-y-3">
                          {results.launchPlan.prelaunchPhase.tasks?.map(
                            (task, index) => (
                              <div
                                key={index}
                                className="bg-white p-4 rounded border"
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <h5 className="font-medium text-gray-900">
                                    {task.task}
                                  </h5>
                                  <span
                                    className={`px-2 py-1 rounded text-xs ${
                                      task.priority === "high"
                                        ? "bg-red-100 text-red-700"
                                        : task.priority === "medium"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-green-100 text-green-700"
                                    }`}
                                  >
                                    {task.priority} priority
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-1">
                                  <strong>Timeline:</strong> {task.timeline}
                                </p>
                                <p className="text-sm text-gray-600">
                                  <strong>Expected Outcome:</strong>{" "}
                                  {task.expectedOutcome}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* Launch Week */}
                    {results.launchPlan.launchWeek && (
                      <div className="mb-6">
                        <h4 className="font-medium text-green-800 mb-3">
                          Launch Week Strategy
                        </h4>
                        <div className="bg-white p-4 rounded border">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            {Object.entries(
                              results.launchPlan.launchWeek.dailyTasks || {}
                            ).map(([day, tasks]) => (
                              <div
                                key={day}
                                className="border-l-4 border-green-500 pl-3"
                              >
                                <h6 className="font-medium text-gray-900 capitalize">
                                  {day}
                                </h6>
                                <ul className="text-sm text-gray-600 mt-1">
                                  {tasks.map((task, idx) => (
                                    <li key={idx}>• {task}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h6 className="font-medium text-gray-900 mb-2">
                                Key Metrics
                              </h6>
                              <ul className="text-sm text-gray-600">
                                {results.launchPlan.launchWeek.keyMetrics?.map(
                                  (metric, idx) => (
                                    <li key={idx}>• {metric}</li>
                                  )
                                )}
                              </ul>
                            </div>
                            <div>
                              <h6 className="font-medium text-gray-900 mb-2">
                                Success Criteria
                              </h6>
                              <ul className="text-sm text-gray-600">
                                {results.launchPlan.launchWeek.successCriteria?.map(
                                  (criteria, idx) => (
                                    <li key={idx}>• {criteria}</li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Success Metrics */}
                    {results.launchPlan.successMetrics && (
                      <div>
                        <h4 className="font-medium text-green-800 mb-3">
                          Success Targets
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {Object.entries(
                            results.launchPlan.successMetrics
                          ).map(([period, targets]) => (
                            <div
                              key={period}
                              className="bg-white p-4 rounded border"
                            >
                              <h6 className="font-medium text-gray-900 mb-2 capitalize">
                                {period.replace("Targets", "")}
                              </h6>
                              {typeof targets === "object" &&
                                Object.entries(targets).map(
                                  ([metric, value]) => (
                                    <p
                                      key={metric}
                                      className="text-sm text-gray-600"
                                    >
                                      <strong className="capitalize">
                                        {metric}:
                                      </strong>{" "}
                                      {value}
                                    </p>
                                  )
                                )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Keyword Strategy */}
                  {results.keywordStrategy && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-blue-900 mb-4">
                        🎯 Keyword Strategy
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-blue-800 mb-3">
                            Primary Keywords
                          </h4>
                          <div className="space-y-2">
                            {results.keywordStrategy.primaryKeywords?.map(
                              (keyword, index) => (
                                <span
                                  key={index}
                                  className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                                >
                                  {keyword}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-800 mb-3">
                            Long-Tail Keywords
                          </h4>
                          <div className="space-y-2">
                            {results.keywordStrategy.longTailKeywords?.map(
                              (keyword, index) => (
                                <span
                                  key={index}
                                  className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                                >
                                  {keyword}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      </div>

                      {results.keywordStrategy.rankingStrategy && (
                        <div className="mt-6">
                          <h4 className="font-medium text-blue-800 mb-3">
                            Ranking Strategy Timeline
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {Object.entries(
                              results.keywordStrategy.rankingStrategy
                            ).map(([phase, keywords]) => (
                              <div
                                key={phase}
                                className="bg-white p-4 rounded border"
                              >
                                <h6 className="font-medium text-gray-900 mb-2 capitalize">
                                  {phase}
                                </h6>
                                <div className="space-y-1">
                                  {keywords.map((keyword, idx) => (
                                    <span
                                      key={idx}
                                      className="block text-sm text-gray-600"
                                    >
                                      • {keyword}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "insights" &&
                results.competitorAnalysis?.insights && (
                  <div className="space-y-6">
                    {/* Market Gaps */}
                    {results.competitorAnalysis.insights.marketGaps && (
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-purple-900 mb-4">
                          🎯 Market Gaps & Opportunities
                        </h3>
                        <div className="space-y-4">
                          {results.competitorAnalysis.insights.marketGaps.map(
                            (gap, index) => (
                              <div
                                key={index}
                                className="bg-white p-4 rounded border"
                              >
                                <h4 className="font-medium text-gray-900 mb-2">
                                  {gap.gap}
                                </h4>
                                <p className="text-gray-700 mb-3">
                                  {gap.opportunity}
                                </p>
                                <div className="flex justify-between items-center text-sm">
                                  <span
                                    className={`px-2 py-1 rounded ${
                                      gap.difficulty === "high"
                                        ? "bg-red-100 text-red-700"
                                        : gap.difficulty === "medium"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-green-100 text-green-700"
                                    }`}
                                  >
                                    {gap.difficulty} difficulty
                                  </span>
                                  <span className="text-purple-600 font-medium">
                                    {gap.impact}
                                  </span>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* Pricing Analysis */}
                    {results.competitorAnalysis.insights.pricingAnalysis && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-green-900 mb-4">
                          💰 Pricing Analysis
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="bg-white p-4 rounded border text-center">
                            <div className="text-2xl font-bold text-green-600">
                              {
                                results.competitorAnalysis.insights
                                  .pricingAnalysis.averagePrice
                              }
                            </div>
                            <div className="text-sm text-gray-600">
                              Average Price
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded border text-center">
                            <div className="text-2xl font-bold text-blue-600">
                              {
                                results.competitorAnalysis.insights
                                  .pricingAnalysis.priceRange
                              }
                            </div>
                            <div className="text-sm text-gray-600">
                              Price Range
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded border text-center">
                            <div className="text-2xl font-bold text-purple-600">
                              {
                                results.competitorAnalysis.insights
                                  .pricingAnalysis.recommendedPrice
                              }
                            </div>
                            <div className="text-sm text-gray-600">
                              Recommended Price
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded border">
                            <div className="text-sm text-gray-600 mb-1">
                              Strategy:
                            </div>
                            <div className="text-xs text-gray-700">
                              {
                                results.competitorAnalysis.insights
                                  .pricingAnalysis.pricingStrategy
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Competitor Weaknesses */}
                    {results.competitorAnalysis.insights
                      .competitorWeaknesses && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-red-900 mb-4">
                          🎪 Competitor Weaknesses
                        </h3>
                        <div className="space-y-4">
                          {results.competitorAnalysis.insights.competitorWeaknesses.map(
                            (weakness, index) => (
                              <div
                                key={index}
                                className="bg-white p-4 rounded border"
                              >
                                <h4 className="font-medium text-gray-900 mb-2">
                                  {weakness.competitor}
                                </h4>
                                <p className="text-gray-700 mb-3">
                                  <strong>Weakness:</strong> {weakness.weakness}
                                </p>
                                <p className="text-gray-700 mb-3">
                                  <strong>How to Exploit:</strong>{" "}
                                  {weakness.howToExploit}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {weakness.keywords?.map((keyword, idx) => (
                                    <span
                                      key={idx}
                                      className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm"
                                    >
                                      {keyword}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* Keyword Opportunities */}
                    {results.competitorAnalysis.insights
                      .keywordOpportunities && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-blue-900 mb-4">
                          🔍 Keyword Opportunities
                        </h3>
                        <div className="space-y-4">
                          {results.competitorAnalysis.insights.keywordOpportunities.map(
                            (opportunity, index) => (
                              <div
                                key={index}
                                className="bg-white p-4 rounded border"
                              >
                                <div className="flex justify-between items-start mb-3">
                                  <h4 className="font-medium text-gray-900">
                                    {opportunity.keyword}
                                  </h4>
                                  <div className="flex gap-2">
                                    <span
                                      className={`px-2 py-1 rounded text-xs ${
                                        opportunity.searchVolume === "high"
                                          ? "bg-green-100 text-green-700"
                                          : opportunity.searchVolume ===
                                            "medium"
                                          ? "bg-yellow-100 text-yellow-700"
                                          : "bg-gray-100 text-gray-700"
                                      }`}
                                    >
                                      {opportunity.searchVolume} volume
                                    </span>
                                    <span
                                      className={`px-2 py-1 rounded text-xs ${
                                        opportunity.competition === "low"
                                          ? "bg-green-100 text-green-700"
                                          : opportunity.competition === "medium"
                                          ? "bg-yellow-100 text-yellow-700"
                                          : "bg-red-100 text-red-700"
                                      }`}
                                    >
                                      {opportunity.competition} competition
                                    </span>
                                  </div>
                                </div>
                                <p className="text-gray-700 mb-2">
                                  <strong>Why it&apos;s an opportunity:</strong>{" "}
                                  {opportunity.whyOpportunity}
                                </p>
                                <p className="text-gray-700">
                                  <strong>How to rank:</strong>{" "}
                                  {opportunity.howToRank}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* Differentiation Strategy */}
                    {results.competitorAnalysis.insights
                      .differentiationStrategy && (
                      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-indigo-900 mb-4">
                          🚀 Differentiation Strategy
                        </h3>
                        <div className="bg-white p-4 rounded border">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-3">
                                Primary Differentiators
                              </h4>
                              <ul className="space-y-1">
                                {results.competitorAnalysis.insights.differentiationStrategy.primaryDifferentiators?.map(
                                  (diff, idx) => (
                                    <li key={idx} className="text-gray-700">
                                      • {diff}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-3">
                                Competitive Advantages
                              </h4>
                              <ul className="space-y-1">
                                {results.competitorAnalysis.insights.differentiationStrategy.competitiveAdvantages?.map(
                                  (advantage, idx) => (
                                    <li key={idx} className="text-gray-700">
                                      • {advantage}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                          <div className="mt-4">
                            <h4 className="font-medium text-gray-900 mb-2">
                              Messaging Strategy
                            </h4>
                            <p className="text-gray-700">
                              {
                                results.competitorAnalysis.insights
                                  .differentiationStrategy.messagingStrategy
                              }
                            </p>
                          </div>
                          <div className="mt-4">
                            <h4 className="font-medium text-gray-900 mb-2">
                              Target Keywords
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {results.competitorAnalysis.insights.differentiationStrategy.targetKeywords?.map(
                                (keyword, idx) => (
                                  <span
                                    key={idx}
                                    className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-sm"
                                  >
                                    {keyword}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Top Performers */}
                    {results.competitorAnalysis.topPerformers && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-yellow-900 mb-4">
                          🏆 Top Performing Competitors (
                          {results.competitorAnalysis.totalCompetitorsFound}{" "}
                          found)
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {results.competitorAnalysis.topPerformers
                            .slice(0, 6)
                            .map((competitor, index) => (
                              <div
                                key={index}
                                className="bg-white p-4 rounded border"
                              >
                                <div className="flex items-start space-x-3">
                                  {competitor.image && (
                                    <Image
                                      src={competitor.image}
                                      alt={competitor.title}
                                      width={64}
                                      height={64}
                                      className="w-16 h-16 object-cover rounded"
                                    />
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2">
                                      {competitor.title}
                                    </h4>
                                    <div className="flex justify-between items-center text-sm">
                                      <span className="font-bold text-green-600">
                                        {competitor.price}
                                      </span>
                                      <div className="flex items-center space-x-1">
                                        <span className="text-yellow-500">
                                          ⭐
                                        </span>
                                        <span className="text-gray-600">
                                          {competitor.rating}
                                        </span>
                                        <span className="text-gray-500">
                                          ({competitor.reviewCount})
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
