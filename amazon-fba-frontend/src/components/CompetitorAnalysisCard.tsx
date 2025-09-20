import { type Competitor, type CompetitorAnalysis } from "@/lib/api";
import {
  AlertTriangle,
  ExternalLink,
  Lightbulb,
  MessageCircle,
  Star,
  Tag,
  ThumbsUp,
  TrendingUp,
  Users,
} from "lucide-react";

interface CompetitorAnalysisCardProps {
  competitors: Competitor[];
  analysis: CompetitorAnalysis;
}

export function CompetitorAnalysisCard({
  competitors,
  analysis,
}: CompetitorAnalysisCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <Users className="w-6 h-6 mr-2 text-blue-600" />
        Competitor Analysis
      </h2>

      <div className="space-y-8">
        {/* Competitors List */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Top Competitors ({competitors.length})
          </h3>
          {competitors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {competitors.map((competitor, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 line-clamp-2">
                      {competitor.title}
                    </h4>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Tag className="w-4 h-4 text-gray-500 mr-1" />
                          <span className="text-gray-700">
                            {competitor.price || "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="text-gray-700">
                            {competitor.rating || "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="w-4 h-4 text-blue-500 mr-1" />
                          <span className="text-gray-700">
                            {competitor.reviewCount || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {competitor.asin && (
                      <div className="text-xs text-gray-500">
                        ASIN: {competitor.asin}
                      </div>
                    )}

                    {competitor.link && (
                      <a
                        href={competitor.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm"
                      >
                        View Product
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No competitors found</p>
            </div>
          )}
        </div>

        {/* Competitive Analysis */}
        {analysis.competitivePosition && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Competitive Position
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Strengths */}
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <div className="flex items-center mb-3">
                  <ThumbsUp className="w-5 h-5 text-green-600 mr-2" />
                  <h4 className="font-semibold text-green-800">
                    Your Strengths
                  </h4>
                </div>
                <div className="space-y-2">
                  {analysis.competitivePosition.strengths.length > 0 ? (
                    analysis.competitivePosition.strengths.map(
                      (strength, index) => (
                        <div
                          key={index}
                          className="text-sm text-green-700 bg-white bg-opacity-50 px-2 py-1 rounded"
                        >
                          {strength}
                        </div>
                      )
                    )
                  ) : (
                    <div className="text-sm text-green-600 opacity-70">
                      No strengths identified
                    </div>
                  )}
                </div>
              </div>

              {/* Weaknesses */}
              <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                <div className="flex items-center mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                  <h4 className="font-semibold text-red-800">
                    Areas to Improve
                  </h4>
                </div>
                <div className="space-y-2">
                  {analysis.competitivePosition.weaknesses.length > 0 ? (
                    analysis.competitivePosition.weaknesses.map(
                      (weakness, index) => (
                        <div
                          key={index}
                          className="text-sm text-red-700 bg-white bg-opacity-50 px-2 py-1 rounded"
                        >
                          {weakness}
                        </div>
                      )
                    )
                  ) : (
                    <div className="text-sm text-red-600 opacity-70">
                      No weaknesses identified
                    </div>
                  )}
                </div>
              </div>

              {/* Opportunities */}
              <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                <div className="flex items-center mb-3">
                  <Lightbulb className="w-5 h-5 text-blue-600 mr-2" />
                  <h4 className="font-semibold text-blue-800">Opportunities</h4>
                </div>
                <div className="space-y-2">
                  {analysis.competitivePosition.opportunities.length > 0 ? (
                    analysis.competitivePosition.opportunities.map(
                      (opportunity, index) => (
                        <div
                          key={index}
                          className="text-sm text-blue-700 bg-white bg-opacity-50 px-2 py-1 rounded"
                        >
                          {opportunity}
                        </div>
                      )
                    )
                  ) : (
                    <div className="text-sm text-blue-600 opacity-70">
                      No opportunities identified
                    </div>
                  )}
                </div>
              </div>

              {/* Threats */}
              <div className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                <div className="flex items-center mb-3">
                  <TrendingUp className="w-5 h-5 text-orange-600 mr-2" />
                  <h4 className="font-semibold text-orange-800">
                    Market Threats
                  </h4>
                </div>
                <div className="space-y-2">
                  {analysis.competitivePosition.threats &&
                  analysis.competitivePosition.threats.length > 0 ? (
                    analysis.competitivePosition.threats.map(
                      (threat, index) => (
                        <div
                          key={index}
                          className="text-sm text-orange-700 bg-white bg-opacity-50 px-2 py-1 rounded"
                        >
                          {threat}
                        </div>
                      )
                    )
                  ) : (
                    <div className="text-sm text-orange-600 opacity-70">
                      No threats identified
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
