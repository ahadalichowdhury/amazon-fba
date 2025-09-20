import { type KeywordGaps } from "@/lib/api";
import { ArrowUp, Search, Target, TrendingUp } from "lucide-react";

interface KeywordGapsCardProps {
  gaps: KeywordGaps;
}

export function KeywordGapsCard({ gaps }: KeywordGapsCardProps) {
  const getVolumeColor = (volume: string) => {
    switch (volume.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCompetitionColor = (competition: string) => {
    switch (competition.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "hard":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "easy":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <Search className="w-6 h-6 mr-2 text-blue-600" />
        Keyword Gap Analysis
      </h2>

      <div className="space-y-8">
        {/* Missing High-Value Keywords */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-red-600" />
            Missing High-Value Keywords
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gaps.missingHighValueKeywords.map((keyword, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">
                    {keyword.keyword}
                  </h4>
                  <div className="flex space-x-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getVolumeColor(
                        keyword.searchVolume
                      )}`}
                    >
                      {keyword.searchVolume} volume
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getCompetitionColor(
                        keyword.competition
                      )}`}
                    >
                      {keyword.competition} competition
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {keyword.opportunity}
                </p>
                <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  Use in: {keyword.whereToUse}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Competitor Keyword Advantages */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
            Competitor Keyword Advantages
          </h3>
          <div className="space-y-4">
            {gaps.competitorKeywordAdvantages.map((advantage, index) => (
              <div
                key={index}
                className="border border-orange-200 rounded-lg p-4 bg-orange-50"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-orange-800 mb-1">
                      {advantage.competitor}
                    </h4>
                    <p className="text-sm text-orange-700 mb-2">
                      <strong>Keyword:</strong> {advantage.keywordAdvantage}
                    </p>
                    <p className="text-sm text-orange-600">
                      {advantage.whyItWorks}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-orange-800 mb-1">
                      How to Adopt:
                    </h5>
                    <p className="text-sm text-orange-700">
                      {advantage.howToAdopt}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Keyword Optimization Plan */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-green-600" />
            Keyword Optimization Plan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                key: "titleKeywords",
                title: "Title Keywords",
                color: "border-red-200 bg-red-50 text-red-800",
              },
              {
                key: "bulletKeywords",
                title: "Bullet Keywords",
                color: "border-yellow-200 bg-yellow-50 text-yellow-800",
              },
              {
                key: "descriptionKeywords",
                title: "Description Keywords",
                color: "border-green-200 bg-green-50 text-green-800",
              },
              {
                key: "backendKeywords",
                title: "Backend Keywords",
                color: "border-purple-200 bg-purple-50 text-purple-800",
              },
            ].map((section) => {
              const keywords =
                gaps.keywordOptimizationPlan[
                  section.key as keyof typeof gaps.keywordOptimizationPlan
                ];
              return (
                <div
                  key={section.key}
                  className={`border rounded-lg p-4 ${section.color}`}
                >
                  <h4 className="font-semibold mb-3">{section.title}</h4>
                  <div className="space-y-1">
                    {keywords.map((keyword, index) => (
                      <div
                        key={index}
                        className="text-sm bg-white bg-opacity-50 px-2 py-1 rounded"
                      >
                        {keyword}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ranking Opportunities */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ArrowUp className="w-5 h-5 mr-2 text-blue-600" />
            Ranking Opportunities
          </h3>
          <div className="space-y-4">
            {gaps.rankingOpportunities.map((opportunity, index) => (
              <div
                key={index}
                className="border border-blue-200 rounded-lg p-4 bg-blue-50"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div>
                    <h4 className="font-semibold text-blue-800">
                      {opportunity.keyword}
                    </h4>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-blue-600">Current Ranking</div>
                    <div className="text-lg font-bold text-red-600">
                      #{opportunity.currentRanking}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-blue-600">Target Ranking</div>
                    <div className="text-lg font-bold text-green-600">
                      #{opportunity.targetRanking}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-blue-600 mb-1">
                      Difficulty:{" "}
                      <span
                        className={`font-medium ${getDifficultyColor(
                          opportunity.difficulty
                        )}`}
                      >
                        {opportunity.difficulty.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-blue-700">
                      {opportunity.strategy}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
