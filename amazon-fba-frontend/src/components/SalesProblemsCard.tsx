import { type SalesProblems } from "@/lib/api";
import {
  AlertTriangle,
  Clock,
  DollarSign,
  FileText,
  Image,
  List,
  Shield,
  Target,
  Zap,
} from "lucide-react";

interface SalesProblemsCardProps {
  problems: SalesProblems;
}

export function SalesProblemsCard({ problems }: SalesProblemsCardProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
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
        <AlertTriangle className="w-6 h-6 mr-2 text-red-600" />
        Sales Problems Identified
      </h2>

      <div className="space-y-8">
        {/* Critical Mistakes */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-red-600" />
            Critical Mistakes
          </h3>
          <div className="space-y-4">
            {problems.criticalMistakes.map((mistake, index) => (
              <div
                key={index}
                className={`border rounded-lg p-4 ${getSeverityColor(
                  mistake.severity
                )}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{mistake.mistake}</h4>
                  <span
                    className={`text-xs px-2 py-1 rounded-full border ${getSeverityColor(
                      mistake.severity
                    )}`}
                  >
                    {mistake.severity.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm mb-2">
                  <strong>Impact:</strong> {mistake.impact}
                </p>
                <p className="text-sm">
                  <strong>Solution:</strong> {mistake.solution}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Issues */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-green-600" />
            Pricing Analysis
          </h3>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Current Issue
                </h4>
                <p className="text-gray-700">
                  {problems.pricingIssues.problem}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Recommended Price
                </h4>
                <p className="text-green-600 font-semibold">
                  {problems.pricingIssues.recommendedPrice}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Competitor Range
                </h4>
                <p className="text-gray-700">
                  {problems.pricingIssues.competitorPriceRange}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Strategy</h4>
                <p className="text-gray-700">
                  {problems.pricingIssues.pricingStrategy}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Listing Problems */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-600" />
            Listing Problems
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { key: "titleIssues", title: "Title Issues", icon: FileText },
              { key: "imageProblems", title: "Image Problems", icon: Image },
              {
                key: "descriptionIssues",
                title: "Description Issues",
                icon: FileText,
              },
              {
                key: "bulletPointIssues",
                title: "Bullet Point Issues",
                icon: List,
              },
            ].map((section) => {
              const Icon = section.icon;
              const issues =
                problems.listingProblems[
                  section.key as keyof typeof problems.listingProblems
                ];
              return (
                <div
                  key={section.key}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Icon className="w-4 h-4 mr-2" />
                    {section.title}
                  </h4>
                  <ul className="space-y-1">
                    {Array.isArray(issues) && issues.length > 0 ? (
                      issues.map((issue, index) => (
                        <li key={index} className="text-sm text-gray-700">
                          • {issue}
                        </li>
                      ))
                    ) : (
                      <li className="text-sm text-gray-500">
                        No issues identified
                      </li>
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Keyword Mistakes */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-purple-600" />
            Keyword Mistakes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-red-200 rounded-lg p-4 bg-red-50">
              <h4 className="font-semibold text-red-800 mb-2">
                Missing Keywords
              </h4>
              <div className="flex flex-wrap gap-2">
                {problems.keywordMistakes.missingKeywords.map(
                  (keyword, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-red-200 text-red-800 rounded-full"
                    >
                      {keyword}
                    </span>
                  )
                )}
              </div>
            </div>
            <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
              <h4 className="font-semibold text-yellow-800 mb-2">
                Wrong Keywords
              </h4>
              <div className="flex flex-wrap gap-2">
                {problems.keywordMistakes.wrongKeywords.map(
                  (keyword, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full"
                    >
                      {keyword}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Trust Signals */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-blue-600" />
            Trust Signals Analysis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-red-200 rounded-lg p-4 bg-red-50">
              <h4 className="font-semibold text-red-800 mb-2">Missing</h4>
              <ul className="space-y-1">
                {problems.trustSignals.missing.map((item, index) => (
                  <li key={index} className="text-sm text-red-700">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
              <h4 className="font-semibold text-yellow-800 mb-2">Weak</h4>
              <ul className="space-y-1">
                {problems.trustSignals.weak.map((item, index) => (
                  <li key={index} className="text-sm text-yellow-700">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-green-200 rounded-lg p-4 bg-green-50">
              <h4 className="font-semibold text-green-800 mb-2">
                Improvements
              </h4>
              <ul className="space-y-1">
                {problems.trustSignals.improvements.map((item, index) => (
                  <li key={index} className="text-sm text-green-700">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Conversion Killers */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-red-600" />
            Conversion Killers
          </h3>
          <div className="space-y-4">
            {problems.conversionKillers.map((killer, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">
                    {killer.issue}
                  </h4>
                  <span
                    className={`text-sm font-medium ${getPriorityColor(
                      killer.priority
                    )}`}
                  >
                    {killer.priority.toUpperCase()} PRIORITY
                  </span>
                </div>
                <p className="text-sm text-gray-700">
                  <strong>Fix:</strong> {killer.fix}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Immediate Actions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-green-600" />
            Immediate Actions Required
          </h3>
          <div className="space-y-4">
            {problems.immediateActions.map((action, index) => (
              <div
                key={index}
                className="border border-green-200 rounded-lg p-4 bg-green-50"
              >
                <h4 className="font-semibold text-green-800 mb-2">
                  Action {index + 1}: {action.action}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-green-700">
                      Expected Impact:
                    </span>
                    <p className="text-green-600">{action.expectedImpact}</p>
                  </div>
                  <div>
                    <span className="font-medium text-green-700">
                      Time to Implement:
                    </span>
                    <p className="text-green-600">{action.timeToImplement}</p>
                  </div>
                  <div>
                    <span className="font-medium text-green-700">
                      Difficulty:
                    </span>
                    <span
                      className={`font-medium ${getDifficultyColor(
                        action.difficulty
                      )}`}
                    >
                      {action.difficulty.toUpperCase()}
                    </span>
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
