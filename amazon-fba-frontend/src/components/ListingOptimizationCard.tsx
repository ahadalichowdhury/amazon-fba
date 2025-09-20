import { type ListingOptimization } from "@/lib/api";
import {
  DollarSign,
  FileText,
  Heading,
  Image as ImageIcon,
  List,
  Search,
} from "lucide-react";

interface ListingOptimizationCardProps {
  optimization: ListingOptimization;
}

export function ListingOptimizationCard({
  optimization,
}: ListingOptimizationCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <FileText className="w-6 h-6 mr-2 text-green-600" />
        Listing Optimization
      </h2>

      <div className="space-y-8">
        {/* Optimized Title */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Heading className="w-5 h-5 mr-2 text-blue-600" />
            Optimized Title
          </h3>
          <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
            <div className="mb-4">
              <h4 className="font-semibold text-blue-800 mb-2">New Title:</h4>
              <p className="text-blue-700 bg-white p-3 rounded border">
                {optimization.optimizedTitle.newTitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-blue-700">
                  Characters Used:
                </span>
                <p className="text-blue-600">
                  {optimization.optimizedTitle.charactersUsed}
                </p>
              </div>
              <div>
                <span className="font-medium text-blue-700">
                  Keywords Added:
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {optimization.optimizedTitle.keywordsAdded?.map(
                    (keyword, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-blue-200 text-blue-800 rounded-full"
                      >
                        {keyword}
                      </span>
                    )
                  )}
                </div>
              </div>
              <div>
                <span className="font-medium text-blue-700">Improvements:</span>
                <ul className="text-blue-600 mt-1">
                  {optimization.optimizedTitle.improvements?.map(
                    (improvement, index) => (
                      <li key={index} className="text-xs">
                        • {improvement}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Optimized Bullet Points */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <List className="w-5 h-5 mr-2 text-green-600" />
            Optimized Bullet Points
          </h3>
          <div className="space-y-4">
            {optimization.optimizedBulletPoints.map((bullet, index) => (
              <div
                key={index}
                className="border border-green-200 rounded-lg p-4 bg-green-50"
              >
                <div className="mb-2">
                  <span className="text-sm font-medium text-green-700">
                    Bullet {index + 1}:
                  </span>
                  <p className="text-green-800 mt-1">{bullet.bulletPoint}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-green-700">Focus:</span>
                    <p className="text-green-600">{bullet.focus}</p>
                  </div>
                  <div>
                    <span className="font-medium text-green-700">
                      Keywords:
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {bullet.keywords?.map((keyword, keyIndex) => (
                        <span
                          key={keyIndex}
                          className="text-xs px-2 py-1 bg-green-200 text-green-800 rounded-full"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optimized Description */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-purple-600" />
            Optimized Description
          </h3>
          <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
            <div className="mb-4">
              <h4 className="font-semibold text-purple-800 mb-2">
                New Description:
              </h4>
              <div className="text-purple-700 bg-white p-4 rounded border max-h-40 overflow-y-auto">
                {optimization.optimizedDescription.newDescription}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-purple-700">Structure:</span>
                <p className="text-purple-600">
                  {optimization.optimizedDescription.structure}
                </p>
              </div>
              <div>
                <span className="font-medium text-purple-700">
                  Keywords Included:
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {optimization.optimizedDescription.keywordsIncluded?.map(
                    (keyword, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-purple-200 text-purple-800 rounded-full"
                      >
                        {keyword}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Recommendations */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ImageIcon className="w-5 h-5 mr-2 text-orange-600" />
            Image Recommendations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {optimization.imageRecommendations.map((image, index) => (
              <div
                key={index}
                className="border border-orange-200 rounded-lg p-4 bg-orange-50"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-orange-800 capitalize">
                    {image.imageType} Image
                  </h4>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
                      image.priority
                    )}`}
                  >
                    {image.priority.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-orange-700">{image.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Optimization */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-green-600" />
            Pricing Optimization
          </h3>
          <div className="border border-green-200 rounded-lg p-4 bg-green-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold text-green-800 mb-1">
                  Recommended Price
                </h4>
                <p className="text-2xl font-bold text-green-600">
                  {optimization.pricingOptimization.recommendedPrice}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-green-800 mb-1">Reasoning</h4>
                <p className="text-sm text-green-700">
                  {optimization.pricingOptimization.pricingReason}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-green-800 mb-1">
                  Competitive Position
                </h4>
                <p className="text-sm text-green-700">
                  {optimization.pricingOptimization.competitivePosition}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* A9 Algorithm Optimization */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Search className="w-5 h-5 mr-2 text-indigo-600" />
            A9 Algorithm Optimization
          </h3>
          <div className="border border-indigo-200 rounded-lg p-4 bg-indigo-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-indigo-800 mb-2">
                  Primary Keywords
                </h4>
                <div className="bg-yellow-100 p-3 rounded">
                  <div className="flex flex-wrap gap-1">
                    {optimization.a9AlgorithmOptimization.primaryKeywords?.map(
                      (keyword, index) => (
                        <span
                          key={index}
                          className="text-sm px-2 py-1 bg-yellow-200 text-yellow-800 rounded"
                        >
                          {keyword}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-indigo-800 mb-2">
                  Secondary Keywords
                </h4>
                <div className="bg-blue-100 p-3 rounded">
                  <div className="flex flex-wrap gap-1">
                    {optimization.a9AlgorithmOptimization.secondaryKeywords?.map(
                      (keyword, index) => (
                        <span
                          key={index}
                          className="text-sm px-2 py-1 bg-blue-200 text-blue-800 rounded"
                        >
                          {keyword}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-indigo-700">
                  Keyword Density:
                </span>
                <p className="text-indigo-600">
                  {optimization.a9AlgorithmOptimization.keywordDensity}
                </p>
              </div>
              <div>
                <span className="font-medium text-indigo-700">
                  Ranking Factors:
                </span>
                <p className="text-indigo-600">
                  {optimization.a9AlgorithmOptimization.rankingFactors?.join(
                    ", "
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
