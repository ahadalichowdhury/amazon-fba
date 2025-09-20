import { type ProductData } from "@/lib/api";
import { ExternalLink, MessageCircle, Package, Star, Tag } from "lucide-react";

interface ProductInfoCardProps {
  product: ProductData;
}

export function ProductInfoCard({ product }: ProductInfoCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <Package className="w-6 h-6 mr-2 text-blue-600" />
        Product Information
      </h2>

      <div className="space-y-6">
        {/* Product Title */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {product.title}
          </h3>
          {product.url && (
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm"
            >
              View on Amazon
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          )}
        </div>

        {/* Product Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Tag className="w-4 h-4 text-gray-600 mr-1" />
              <span className="text-sm text-gray-600">Price</span>
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {product.price || "N/A"}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="text-sm text-gray-600">Rating</span>
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {product.rating || "N/A"}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <MessageCircle className="w-4 h-4 text-blue-500 mr-1" />
              <span className="text-sm text-gray-600">Reviews</span>
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {product.reviewCount || "N/A"}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Package className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-gray-600">ASIN</span>
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {product.asin || "N/A"}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Brand</h4>
            <p className="text-gray-600">{product.brand || "Unknown"}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Category</h4>
            <p className="text-gray-600">{product.category || "Unknown"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
