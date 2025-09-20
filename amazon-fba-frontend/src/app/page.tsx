import {
  AlertTriangle,
  BarChart3,
  Rocket,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Product Analysis",
    description:
      "Comprehensive keyword analysis and competitor research for existing products",
    icon: BarChart3,
    href: "/analysis",
    color: "from-blue-500 to-blue-600",
    benefits: [
      "Keyword research",
      "Competitor analysis",
      "Ad keyword suggestions",
      "Sales strategy",
    ],
  },
  {
    title: "Sales Diagnostic",
    description:
      "Identify why your product isn't selling and get actionable improvement strategies",
    icon: AlertTriangle,
    href: "/diagnostic",
    color: "from-red-500 to-red-600",
    benefits: [
      "Sales problem diagnosis",
      "Keyword gap analysis",
      "Listing optimization",
      "Competitor insights",
    ],
  },
  {
    title: "Launch Optimizer",
    description:
      "Create SEO-optimized listings for new products with competitor intelligence",
    icon: Rocket,
    href: "/optimizer",
    color: "from-green-500 to-green-600",
    benefits: [
      "SEO-optimized titles",
      "Competitor keyword analysis",
      "Launch strategy",
      "Market positioning",
    ],
  },
];

const stats = [
  { label: "Keywords Analyzed", value: "10,000+", icon: Target },
  { label: "Products Optimized", value: "500+", icon: TrendingUp },
  { label: "Happy Sellers", value: "100+", icon: Users },
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Amazon FBA
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}
              Keyword Research
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced AI-powered tools to analyze keywords, diagnose sales
            problems, and optimize your Amazon listings for maximum visibility
            and sales.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Analysis Tool
          </h2>
          <p className="text-lg text-gray-600">
            Select the right tool for your Amazon FBA needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.title}
                href={feature.href}
                className="group block"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 h-full border border-gray-100 hover:border-gray-200">
                  <div className="space-y-6">
                    {/* Icon */}
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">
                        Key Features:
                      </h4>
                      <ul className="space-y-1">
                        {feature.benefits.map((benefit) => (
                          <li
                            key={benefit}
                            className="flex items-center text-sm text-gray-600"
                          >
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <div className="pt-4">
                      <div className="inline-flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                        Get Started
                        <svg
                          className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600">
            Simple 3-step process to optimize your Amazon listings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Input Product Info
            </h3>
            <p className="text-gray-600">
              Provide your Amazon product URL or product details for new
              launches
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-blue-600">2</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              AI Analysis
            </h3>
            <p className="text-gray-600">
              Our AI analyzes competitors, keywords, and market opportunities
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-blue-600">3</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Get Results
            </h3>
            <p className="text-gray-600">
              Receive actionable insights and optimized content for better
              rankings
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
