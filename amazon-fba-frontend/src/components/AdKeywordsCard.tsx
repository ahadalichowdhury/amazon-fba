import { type AdKeywords } from "@/lib/api";
import { DollarSign, Minus, Target } from "lucide-react";

interface AdKeywordsCardProps {
  keywords: AdKeywords;
}

export function AdKeywordsCard({ keywords }: AdKeywordsCardProps) {
  const matchTypes = [
    {
      title: "Exact Match",
      description: "Precise keyword targeting for high-intent searches",
      data: keywords.exactMatch,
      color: "border-red-200 bg-red-50",
      textColor: "text-red-800",
      badgeColor: "bg-red-100 text-red-800",
    },
    {
      title: "Phrase Match",
      description: "Target phrases containing your keywords",
      data: keywords.phraseMatch,
      color: "border-yellow-200 bg-yellow-50",
      textColor: "text-yellow-800",
      badgeColor: "bg-yellow-100 text-yellow-800",
    },
    {
      title: "Broad Match",
      description: "Wider reach with related keyword variations",
      data: keywords.broadMatch,
      color: "border-green-200 bg-green-50",
      textColor: "text-green-800",
      badgeColor: "bg-green-100 text-green-800",
    },
  ];

  const priorities = [
    {
      key: "high_priority",
      label: "High Priority",
      color: "bg-red-100 text-red-800",
    },
    {
      key: "medium_priority",
      label: "Medium Priority",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      key: "low_priority",
      label: "Low Priority",
      color: "bg-green-100 text-green-800",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <Target className="w-6 h-6 mr-2 text-blue-600" />
        PPC Ad Keywords
      </h2>

      <div className="space-y-8">
        {/* Match Types */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {matchTypes.map((matchType) => (
            <div
              key={matchType.title}
              className={`border rounded-lg p-6 ${matchType.color}`}
            >
              <h3
                className={`text-lg font-semibold mb-2 ${matchType.textColor}`}
              >
                {matchType.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {matchType.description}
              </p>

              <div className="space-y-4">
                {priorities.map((priority) => {
                  const keywordList =
                    matchType.data[
                      priority.key as keyof typeof matchType.data
                    ] || [];
                  return (
                    <div key={priority.key}>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        {priority.label}
                      </h4>
                      <div className="space-y-1">
                        {keywordList.length > 0 ? (
                          keywordList.slice(0, 5).map((keyword, index) => (
                            <span
                              key={index}
                              className={`inline-block text-xs px-2 py-1 rounded-full mr-1 mb-1 ${priority.color}`}
                            >
                              {keyword}
                            </span>
                          ))
                        ) : (
                          <div className="text-xs text-gray-500">
                            No keywords
                          </div>
                        )}
                        {keywordList.length > 5 && (
                          <div className="text-xs text-gray-500">
                            +{keywordList.length - 5} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Negative Keywords */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Minus className="w-5 h-5 text-red-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">
              Negative Keywords
            </h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Keywords to exclude from your campaigns to avoid irrelevant clicks
          </p>
          <div className="space-y-2">
            {keywords.negativeKeywords.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {keywords.negativeKeywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-block text-sm px-3 py-1 bg-red-100 text-red-800 rounded-full"
                  >
                    -{keyword}
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                No negative keywords suggested
              </div>
            )}
          </div>
        </div>

        {/* Campaign Strategy */}
        <div className="border border-blue-200 rounded-lg p-6 bg-blue-50">
          <div className="flex items-center mb-4">
            <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-blue-800">
              Campaign Strategy
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Bid Strategy</h4>
              <p className="text-sm text-blue-700 bg-white bg-opacity-50 px-3 py-2 rounded">
                {keywords.campaignStrategy.bidStrategy ||
                  "No bid strategy provided"}
              </p>
            </div>

            <div>
              <h4 className="font-medium text-blue-800 mb-2">
                Campaign Strategy
              </h4>
              <div className="space-y-2">
                {keywords.campaignStrategy.recommendations?.length > 0 ? (
                  keywords.campaignStrategy.recommendations.map(
                    (recommendation, index) => (
                      <div
                        key={index}
                        className="text-sm text-blue-700 bg-white bg-opacity-50 px-3 py-2 rounded"
                      >
                        • {recommendation}
                      </div>
                    )
                  )
                ) : (
                  <div className="text-sm text-blue-600 opacity-70">
                    Campaign strategy available - check launch, scaling, and
                    defensive campaigns
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
