import { type Competitor } from "@/lib/api";
import { ExternalLink, MessageCircle, Star, Tag, Trophy } from "lucide-react";
import Image from "next/image";

interface TopPerformersCardProps {
  competitors: Competitor[];
}

export function TopPerformersCard({ competitors }: TopPerformersCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <Trophy className="w-6 h-6 mr-2 text-yellow-600" />
        Top Performing Competitors
      </h2>

      {competitors.length > 0 ? (
        <div className="space-y-6">
          <p className="text-gray-600">
            These are the top-performing products in your category. Study their
            strategies to improve your own listing.
          </p>

          <div className="grid grid-cols-1 gap-6">
            {competitors.map((competitor, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 text-yellow-600 rounded-full mr-3 font-bold">
                        #{index + 1}
                      </div>
                      <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">
                        {competitor.title}
                      </h3>
                    </div>
                  </div>
                  {competitor.image && (
                    <Image
                      src={competitor.image}
                      alt={competitor.title}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover rounded-lg ml-4"
                    />
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center">
                    <Tag className="w-4 h-4 text-green-600 mr-2" />
                    <div>
                      <div className="text-xs text-gray-500">Price</div>
                      <div className="font-semibold text-green-600">
                        {competitor.price || "N/A"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-2" />
                    <div>
                      <div className="text-xs text-gray-500">Rating</div>
                      <div className="font-semibold text-gray-900">
                        {competitor.rating || "N/A"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 text-blue-500 mr-2" />
                    <div>
                      <div className="text-xs text-gray-500">Reviews</div>
                      <div className="font-semibold text-gray-900">
                        {competitor.reviewCount || "N/A"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Trophy className="w-4 h-4 text-purple-500 mr-2" />
                    <div>
                      <div className="text-xs text-gray-500">ASIN</div>
                      <div className="font-semibold text-gray-900 text-xs">
                        {competitor.asin || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>

                {competitor.link && (
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-600">
                      Analyze this competitor&apos;s listing strategy
                    </div>
                    <a
                      href={competitor.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View Product
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Analysis Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-800 mb-3">
              💡 How to Use This Competitor Data
            </h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>
                • <strong>Study their titles:</strong> Look for keyword patterns
                and positioning strategies
              </li>
              <li>
                • <strong>Analyze their pricing:</strong> Position your product
                competitively
              </li>
              <li>
                • <strong>Review their images:</strong> Identify opportunities
                to create better visuals
              </li>
              <li>
                • <strong>Read their reviews:</strong> Find pain points you can
                address in your listing
              </li>
              <li>
                • <strong>Check their bullet points:</strong> Learn what
                features customers value most
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-500 mb-2">
            No Competitors Found
          </h3>
          <p className="text-gray-400">
            We couldn&apos;t find competing products for analysis. This might
            indicate a unique market opportunity.
          </p>
        </div>
      )}
    </div>
  );
}
