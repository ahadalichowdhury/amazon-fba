const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://your-backend-app.vercel.app" // Replace with your actual backend URL after deployment
    : "http://localhost:3001");

export interface ProductData {
  title: string;
  brand: string;
  price: string;
  rating: string;
  reviewCount: string;
  category: string;
  asin: string;
  url?: string;
}

export interface KeywordAnalysis {
  primaryKeywords: string[];
  longTailKeywords: string[];
  brandKeywords: string[];
  categoryKeywords: string[];
  competitorKeywords: string[];
  searchVolumeEstimate: {
    high: string[];
    medium: string[];
    low: string[];
  };
  keywordDifficulty: {
    easy: string[];
    medium: string[];
    hard: string[];
  };
  seasonalKeywords: string[];
  buyerIntentKeywords: string[];
  rankingStrategy: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
  contentOptimization: {
    titleSuggestions: string[];
    bulletPointKeywords: string[];
    backendKeywords: string[];
  };
}

export interface Competitor {
  title: string;
  price: string;
  rating: string;
  reviewCount: string;
  link: string;
  image: string;
  asin: string;
}

export interface CompetitorAnalysis {
  competitivePosition: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats?: string[];
  };
}

export interface AdKeywords {
  exactMatch: {
    high_priority: string[];
    medium_priority: string[];
    low_priority: string[];
  };
  phraseMatch: {
    high_priority: string[];
    medium_priority: string[];
    low_priority: string[];
  };
  broadMatch: {
    high_priority: string[];
    medium_priority: string[];
    low_priority: string[];
  };
  negativeKeywords: string[];
  campaignStrategy: {
    recommendations: string[];
    bidStrategy: string;
  };
}

export interface SalesStrategy {
  immediateActions: Array<{
    action: string;
    impact: string;
    timeframe: string;
  }>;
  shortTermStrategy: Array<{
    action: string;
    impact: string;
    timeframe: string;
  }>;
  longTermStrategy: Array<{
    action: string;
    impact: string;
    timeframe: string;
  }>;
}

export interface BasicAnalysisResponse {
  success: boolean;
  timestamp: string;
  productData: ProductData;
  keywordAnalysis: KeywordAnalysis;
  competitors: Competitor[];
  competitorAnalysis: CompetitorAnalysis;
  adKeywords: AdKeywords;
  salesStrategy: SalesStrategy;
  summary: {
    totalKeywords: number;
    competitorsAnalyzed: number;
    adKeywordsGenerated: number;
  };
}

export interface SalesProblems {
  criticalMistakes: Array<{
    mistake: string;
    impact: string;
    severity: string;
    solution: string;
  }>;
  pricingIssues: {
    problem: string;
    competitorPriceRange: string;
    recommendedPrice: string;
    pricingStrategy: string;
  };
  listingProblems: {
    titleIssues: string[];
    imageProblems: string[];
    descriptionIssues: string[];
    bulletPointIssues: string[];
  };
  keywordMistakes: {
    missingKeywords: string[];
    wrongKeywords: string[];
    keywordGaps: string[];
    competitorKeywords: string[];
  };
  competitiveDisadvantages: Array<{
    area: string;
    yourStatus: string;
    competitorStatus: string;
    actionNeeded: string;
  }>;
  trustSignals: {
    missing: string[];
    weak: string[];
    improvements: string[];
  };
  conversionKillers: Array<{
    issue: string;
    fix: string;
    priority: string;
  }>;
  immediateActions: Array<{
    action: string;
    expectedImpact: string;
    timeToImplement: string;
    difficulty: string;
  }>;
}

export interface KeywordGaps {
  missingHighValueKeywords: Array<{
    keyword: string;
    searchVolume: string;
    competition: string;
    opportunity: string;
    whereToUse: string;
  }>;
  competitorKeywordAdvantages: Array<{
    competitor: string;
    keywordAdvantage: string;
    whyItWorks: string;
    howToAdopt: string;
  }>;
  keywordOptimizationPlan: {
    titleKeywords: string[];
    bulletKeywords: string[];
    descriptionKeywords: string[];
    backendKeywords: string[];
  };
  rankingOpportunities: Array<{
    keyword: string;
    currentRanking: string;
    targetRanking: string;
    difficulty: string;
    strategy: string;
  }>;
}

export interface ListingOptimization {
  optimizedTitle: {
    newTitle: string;
    improvements: string[];
    keywordsAdded: string[];
    charactersUsed: string;
  };
  optimizedBulletPoints: Array<{
    bulletPoint: string;
    focus: string;
    keywords: string[];
  }>;
  optimizedDescription: {
    newDescription: string;
    structure: string;
    keywordsIncluded: string[];
  };
  imageRecommendations: Array<{
    imageType: string;
    description: string;
    priority: string;
  }>;
  pricingOptimization: {
    recommendedPrice: string;
    pricingReason: string;
    competitivePosition: string;
  };
  a9AlgorithmOptimization: {
    primaryKeywords: string[];
    secondaryKeywords: string[];
    keywordDensity: string;
    rankingFactors: string[];
  };
}

export interface DiagnosticResponse {
  success: boolean;
  timestamp: string;
  yourProduct: ProductData;
  topPerformers: Competitor[];
  salesProblems: SalesProblems;
  keywordGaps: KeywordGaps;
  listingOptimization: ListingOptimization;
  keywordAnalysis: KeywordAnalysis;
  summary: {
    criticalIssuesFound: number;
    keywordGapsIdentified: number;
    competitorsAnalyzed: number;
    optimizationSuggestions: number;
  };
}

export interface ProductInfo {
  productName: string;
  category: string;
  targetAudience?: string;
  priceRange?: string;
  brand?: string;
  launchBudget?: string;
  keyFeatures: string[];
  uniqueSellingPoints: string[];
  material?: string;
}

export interface OptimizedListing {
  title:
    | string
    | {
        optimizedTitle: string;
        improvements?: string[];
        keywordsUsed?: string[];
        charactersUsed?: number;
        seoScore?: number;
      };
  optimizedTitle?: {
    title: string;
    keywordsUsed?: string[];
    charactersUsed?: string;
    whyOptimal?: string;
  };
  bulletPoints: Array<
    | string
    | {
        bulletPoint?: string;
        point?: string;
        focus?: string;
        keywords?: string[];
        emotionalTrigger?: string;
        proofElement?: string;
      }
  >;
  productDescription: {
    shortDescription?: string;
    detailedDescription?: string;
    description?: string;
    structure?: string[];
    seoStrategy?: string[];
    emotionalHooks?: string[];
    socialProof?: string[];
    callToAction?: string;
  };
  description?: string;
  backendKeywords?:
    | string[]
    | {
        searchTerms?: string[];
        totalCharacters?: string;
        strategy?: string;
      };
  competitorKeywordAnalysis?: {
    mostUsedKeywords?: Array<{
      keyword: string;
      frequency: number;
      avgRating: number;
      opportunity: string;
    }>;
    highConvertingKeywords?: Array<{
      keyword: string;
      avgRating: number;
      reviewCount: number;
      whyEffective: string;
    }>;
    longTailOpportunities?: Array<{
      keyword: string;
      competition: string;
      searchIntent: string;
      howToUse: string;
    }>;
    keywordGaps?: Array<{
      keyword: string;
      competitorUsage: string;
      yourAdvantage: string;
    }>;
    categoryKeywords?: string[];
    featureKeywords?: string[];
    benefitKeywords?: string[];
  };
}

export interface NewProductOptimizerResponse {
  success: boolean;
  timestamp: string;
  productInfo: {
    name: string;
    category: string;
    targetAudience?: string;
    priceRange?: string;
  };
  competitorAnalysis: {
    totalCompetitorsFound: number;
    topPerformers: Competitor[];
    insights: {
      marketGaps?: Array<{
        gap: string;
        opportunity: string;
        difficulty: string;
        impact: string;
      }>;
      competitorWeaknesses?: Array<{
        competitor: string;
        weakness: string;
        howToExploit: string;
        keywords?: string[];
      }>;
      pricingAnalysis?: {
        averagePrice: string;
        priceRange: string;
        recommendedPrice: string;
        pricingStrategy: string;
      };
      keywordOpportunities?: Array<{
        keyword: string;
        searchVolume: string;
        competition: string;
        whyOpportunity: string;
        howToRank: string;
      }>;
      differentiationStrategy?: {
        primaryDifferentiators?: string[];
        messagingStrategy?: string;
        targetKeywords?: string[];
        competitiveAdvantages?: string[];
      };
      launchTiming?: {
        bestTimeToLaunch: string;
        seasonalFactors: string;
        marketConditions: string;
        competitiveActivity: string;
      };
    };
  };
  optimizedListing: OptimizedListing;
  keywordStrategy?: {
    primaryKeywords: string[];
    longTailKeywords: string[];
    rankingStrategy: {
      immediate: string[];
      shortTerm: string[];
      longTerm: string[];
    };
  };
  launchPlan?: {
    prelaunchPhase?: {
      duration: string;
      tasks?: Array<{
        task: string;
        timeline: string;
        priority: string;
        expectedOutcome: string;
      }>;
    };
    launchWeek?: {
      duration: string;
      dailyTasks?: Record<string, string[]>;
      keyMetrics?: string[];
      successCriteria?: string[];
    };
    month1Strategy?: {
      duration: string;
      weeklyGoals?: Array<{
        week: string;
        goals: string[];
        actions: string[];
      }>;
      advertisingStrategy?: {
        budget: string;
        campaigns: string[];
        targetKeywords: string[];
      };
    };
    month2_3Strategy?: {
      duration: string;
      objectives: string[];
      scalingStrategy: string[];
      optimizationFocus: string[];
    };
    budgetAllocation?: Record<string, string>;
    riskMitigation?: Array<{
      risk: string;
      probability: string;
      impact: string;
      mitigation: string;
    }>;
    successMetrics?: Record<string, Record<string, string>>;
  };
  summary?: {
    competitorsAnalyzed: number;
    keywordsGenerated: number;
    bulletPointsCreated?: number;
    launchPhases?: number;
    estimatedLaunchReadiness?: string;
  };
}

// API Functions
export async function analyzeProduct(
  amazonUrl: string
): Promise<BasicAnalysisResponse> {
  const response = await fetch(`${API_BASE_URL}/api/analyze-product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amazonUrl }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || error.error || "Analysis failed");
  }

  return response.json();
}

export async function diagnoseSalesProblems(
  amazonUrl: string
): Promise<DiagnosticResponse> {
  const response = await fetch(`${API_BASE_URL}/api/diagnose-sales-problems`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amazonUrl }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || error.error || "Diagnostic failed");
  }

  return response.json();
}

export async function optimizeNewProduct(productInfo: {
  productName: string;
  category: string;
  features: string[] | string;
  targetAudience?: string;
  priceRange?: string;
  uniqueSellingPoints?: string[] | string;
  keywords?: string[] | string;
}): Promise<NewProductOptimizerResponse> {
  const response = await fetch(`${API_BASE_URL}/api/optimize-new-product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productInfo }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.error || `HTTP error! status: ${response.status}`
    );
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || "Failed to optimize product");
  }

  return data;
}
