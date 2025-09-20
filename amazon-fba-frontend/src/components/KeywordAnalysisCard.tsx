import { type KeywordAnalysis } from "@/lib/api";
import {
  Calendar,
  Search,
  ShoppingCart,
  Target,
  TrendingUp,
} from "lucide-react";

interface KeywordAnalysisCardProps {
  analysis: KeywordAnalysis;
}

export function KeywordAnalysisCard({ analysis }: KeywordAnalysisCardProps) {
  const keywordSections = [
    {
      title: "Primary Keywords",
      keywords: analysis.primaryKeywords,
      icon: Target,
      color: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      title: "Long-tail Keywords",
      keywords: analysis.longTailKeywords,
      icon: Search,
      color: "bg-green-50 text-green-700 border-green-200",
    },
    {
      title: "Brand Keywords",
      keywords: analysis.brandKeywords,
      icon: TrendingUp,
      color: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      title: "Category Keywords",
      keywords: analysis.categoryKeywords,
      icon: Target,
      color: "bg-orange-50 text-orange-700 border-orange-200",
    },
    {
      title: "Seasonal Keywords",
      keywords: analysis.seasonalKeywords,
      icon: Calendar,
      color: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
    {
      title: "Buyer Intent Keywords",
      keywords: analysis.buyerIntentKeywords,
      icon: ShoppingCart,
      color: "bg-red-50 text-red-700 border-red-200",
    },
  ];

  const volumeSections = [
    {
      title: "High Volume",
      keywords: analysis.searchVolumeEstimate.high,
      color: "bg-red-100 text-red-800",
    },
    {
      title: "Medium Volume",
      keywords: analysis.searchVolumeEstimate.medium,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      title: "Low Volume",
      keywords: analysis.searchVolumeEstimate.low,
      color: "bg-green-100 text-green-800",
    },
  ];

  const difficultySections = [
    {
      title: "Easy",
      keywords: analysis.keywordDifficulty.easy,
      color: "bg-green-100 text-green-800",
    },
    {
      title: "Medium",
      keywords: analysis.keywordDifficulty.medium,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      title: "Hard",
      keywords: analysis.keywordDifficulty.hard,
      color: "bg-red-100 text-red-800",
    },
  ];

  const strategySections = [
    {
      title: "Immediate Focus",
      keywords: analysis.rankingStrategy.immediate,
      color: "bg-red-100 text-red-800",
    },
    {
      title: "Short Term",
      keywords: analysis.rankingStrategy.shortTerm,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      title: "Long Term",
      keywords: analysis.rankingStrategy.longTerm,
      color: "bg-blue-100 text-blue-800",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <Search className="w-6 h-6 mr-2 text-blue-600" />
        Keyword Analysis
      </h2>

      <div className="space-y-8">
        {/* Keyword Categories */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Keyword Categories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keywordSections.map((section) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.title}
                  className={`border rounded-lg p-4 ${section.color}`}
                >
                  <div className="flex items-center mb-3">
                    <Icon className="w-5 h-5 mr-2" />
                    <h4 className="font-semibold">{section.title}</h4>
                  </div>
                  <div className="space-y-1">
                    {section.keywords.length > 0 ? (
                      section.keywords.slice(0, 5).map((keyword, index) => (
                        <div
                          key={index}
                          className="text-sm bg-white bg-opacity-50 px-2 py-1 rounded"
                        >
                          {keyword}
                        </div>
                      ))
                    ) : (
                      <div className="text-sm opacity-70">
                        No keywords found
                      </div>
                    )}
                    {section.keywords.length > 5 && (
                      <div className="text-sm opacity-70">
                        +{section.keywords.length - 5} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Search Volume Estimate */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Search Volume Estimate
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {volumeSections.map((section) => (
              <div
                key={section.title}
                className="border border-gray-200 rounded-lg p-4"
              >
                <h4 className="font-semibold text-gray-900 mb-2">
                  {section.title}
                </h4>
                <div className="space-y-1">
                  {section.keywords.length > 0 ? (
                    section.keywords.slice(0, 3).map((keyword, index) => (
                      <span
                        key={index}
                        className={`inline-block text-xs px-2 py-1 rounded-full mr-1 mb-1 ${section.color}`}
                      >
                        {keyword}
                      </span>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500">No keywords</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Keyword Difficulty */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Keyword Difficulty
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {difficultySections.map((section) => (
              <div
                key={section.title}
                className="border border-gray-200 rounded-lg p-4"
              >
                <h4 className="font-semibold text-gray-900 mb-2">
                  {section.title}
                </h4>
                <div className="space-y-1">
                  {section.keywords.length > 0 ? (
                    section.keywords.slice(0, 3).map((keyword, index) => (
                      <span
                        key={index}
                        className={`inline-block text-xs px-2 py-1 rounded-full mr-1 mb-1 ${section.color}`}
                      >
                        {keyword}
                      </span>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500">No keywords</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ranking Strategy */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Ranking Strategy
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {strategySections.map((section) => (
              <div
                key={section.title}
                className="border border-gray-200 rounded-lg p-4"
              >
                <h4 className="font-semibold text-gray-900 mb-2">
                  {section.title}
                </h4>
                <div className="space-y-1">
                  {section.keywords.length > 0 ? (
                    section.keywords.slice(0, 3).map((keyword, index) => (
                      <span
                        key={index}
                        className={`inline-block text-xs px-2 py-1 rounded-full mr-1 mb-1 ${section.color}`}
                      >
                        {keyword}
                      </span>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500">No keywords</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Optimization */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Content Optimization
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                Title Suggestions
              </h4>
              <div className="space-y-1">
                {analysis.contentOptimization.titleSuggestions.length > 0 ? (
                  analysis.contentOptimization.titleSuggestions
                    .slice(0, 3)
                    .map((suggestion, index) => (
                      <div
                        key={index}
                        className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded"
                      >
                        {suggestion}
                      </div>
                    ))
                ) : (
                  <div className="text-sm text-gray-500">No suggestions</div>
                )}
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                Bullet Point Keywords
              </h4>
              <div className="space-y-1">
                {analysis.contentOptimization.bulletPointKeywords.length > 0 ? (
                  analysis.contentOptimization.bulletPointKeywords
                    .slice(0, 5)
                    .map((keyword, index) => (
                      <span
                        key={index}
                        className="inline-block text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full mr-1 mb-1"
                      >
                        {keyword}
                      </span>
                    ))
                ) : (
                  <div className="text-sm text-gray-500">No keywords</div>
                )}
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                Backend Keywords
              </h4>
              <div className="space-y-1">
                {analysis.contentOptimization.backendKeywords.length > 0 ? (
                  analysis.contentOptimization.backendKeywords
                    .slice(0, 5)
                    .map((keyword, index) => (
                      <span
                        key={index}
                        className="inline-block text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full mr-1 mb-1"
                      >
                        {keyword}
                      </span>
                    ))
                ) : (
                  <div className="text-sm text-gray-500">No keywords</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
