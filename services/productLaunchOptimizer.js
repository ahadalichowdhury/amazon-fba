import { OpenAIAnalyzer } from './openaiAnalyzer.js';

export class ProductLaunchOptimizer {
    constructor(openaiApiKey) {
        this.analyzer = new OpenAIAnalyzer(openaiApiKey);
    }

    async optimizeNewProductListing(productInfo, competitors) {
        try {
            const prompt = `
            CREATE SEO-OPTIMIZED AMAZON LISTING: Generate a complete, SEO-friendly Amazon product listing that will outrank competitors.

            NEW PRODUCT INFORMATION:
            - Product Name: ${productInfo.productName}
            - Category: ${productInfo.category}
            - Key Features: ${productInfo.keyFeatures?.join(', ')}
            - Target Audience: ${productInfo.targetAudience}
            - Unique Selling Points: ${productInfo.uniqueSellingPoints?.join(', ')}
            - Price Range: ${productInfo.priceRange}
            - Product Dimensions: ${productInfo.dimensions || 'Not specified'}
            - Material/Composition: ${productInfo.material || 'Not specified'}
            - Brand: ${productInfo.brand || 'Generic'}

            TOP COMPETITORS ANALYSIS (${competitors.length} competitors analyzed):
            ${competitors.slice(0, 15).map((comp, index) => `
            COMPETITOR ${index + 1}:
            - Title: ${comp.title}
            - Price: ${comp.price}
            - Rating: ${comp.rating}
            - Reviews: ${comp.reviewCount}
            `).join('')}

            COMPETITOR TITLE ANALYSIS:
            Common patterns in successful titles: ${competitors.slice(0, 10).map(c => c.title).join(' | ')}
            
            COMPETITOR KEYWORD EXTRACTION:
            Extract high-performing keywords from competitor titles and identify:
            1. Most frequently used keywords across all competitors
            2. High-converting keywords (from top-rated products)
            3. Long-tail keywords competitors are targeting
            4. Category-specific keywords
            5. Brand positioning keywords
            6. Feature-based keywords
            7. Benefit-focused keywords
            
            MARKET INSIGHTS:
            - Total competitors analyzed: ${competitors.length}
            - Average rating: ${(competitors.reduce((sum, c) => sum + (parseFloat(c.rating) || 0), 0) / competitors.length).toFixed(1)}
            - Price range observed: ${competitors.map(c => c.price).filter(p => p).join(', ')}

            IMPORTANT: Respond ONLY with valid JSON. Do not include any explanatory text, markdown formatting, or code blocks. Start your response with { and end with }.

            Generate optimized listing in this JSON format:
            {
                "optimizedTitle": {
                    "title": "SEO-optimized title under 200 characters",
                    "keywordsUsed": ["keyword1", "keyword2", "keyword3"],
                    "charactersUsed": "character count",
                    "whyOptimal": "explanation of title strategy"
                },
                "bulletPoints": [
                    {
                        "bulletPoint": "optimized bullet point text with emotional triggers and benefits",
                        "focus": "what this bullet emphasizes (benefit/feature/solution)",
                        "keywords": ["keywords in this bullet"],
                        "competitiveAdvantage": "how this beats competitors",
                        "emotionalTrigger": "emotional appeal used",
                        "proofElement": "credibility element included"
                    }
                ],
                "productDescription": {
                    "shortDescription": "compelling 2-3 sentence hook that grabs attention",
                    "detailedDescription": "comprehensive 4-6 paragraph description with storytelling, benefits, features, and social proof",
                    "structure": "description organization strategy (hook, problem, solution, benefits, proof, call-to-action)",
                    "keywordsIncluded": ["keyword1", "keyword2", "keyword3"],
                    "seoStrategy": "SEO optimization approach with keyword density and placement",
                    "emotionalHooks": ["emotional trigger 1", "emotional trigger 2"],
                    "socialProof": "credibility elements included",
                    "callToAction": "compelling call-to-action phrase"
                },
                "backendKeywords": {
                    "searchTerms": ["backend keyword 1", "backend keyword 2"],
                    "totalCharacters": "character count used",
                    "strategy": "backend keyword strategy"
                },
                "competitorKeywordAnalysis": {
                    "mostUsedKeywords": [
                        {
                            "keyword": "keyword phrase",
                            "frequency": "number of competitors using it",
                            "avgRating": "average rating of products using this keyword",
                            "opportunity": "why this keyword is valuable"
                        }
                    ],
                    "highConvertingKeywords": [
                        {
                            "keyword": "keyword phrase",
                            "competitorRating": "rating of competitor using it",
                            "competitorReviews": "review count",
                            "whyEffective": "reason it works well"
                        }
                    ],
                    "longTailOpportunities": [
                        {
                            "keyword": "long tail keyword phrase",
                            "competition": "low/medium/high",
                            "searchIntent": "buyer intent level",
                            "howToUse": "where to place this keyword"
                        }
                    ],
                    "keywordGaps": [
                        {
                            "keyword": "missed keyword opportunity",
                            "competitorUsage": "how competitors use it",
                            "yourAdvantage": "how you can use it better"
                        }
                    ],
                    "categoryKeywords": ["category-specific keywords"],
                    "featureKeywords": ["feature-based keywords"],
                    "benefitKeywords": ["benefit-focused keywords"]
                },
                "competitivePositioning": {
                    "priceStrategy": "recommended pricing approach",
                    "differentiators": ["differentiator 1", "differentiator 2"],
                    "targetKeywords": ["target keyword 1", "target keyword 2"],
                    "rankingStrategy": "how to outrank competitors"
                },
                "imageRecommendations": [
                    {
                        "imageType": "main|lifestyle|infographic|comparison|detail",
                        "description": "what this image should show",
                        "priority": "high|medium|low",
                        "competitiveEdge": "how this image beats competitors"
                    }
                ],
                "launchStrategy": {
                    "phase1": ["launch week actions"],
                    "phase2": ["month 1 actions"],
                    "phase3": ["month 2-3 actions"],
                    "keyMetrics": ["metric to track 1", "metric to track 2"]
                }
            }

            CRITICAL REQUIREMENTS FOR CONTENT CREATION:
            
            1. TITLE OPTIMIZATION:
            - Must be under 200 characters
            - Include 3-4 primary keywords naturally
            - Start with most important keyword
            - Include emotional triggers (Premium, Professional, Ultimate, etc.)
            - Mention key benefit or unique feature
            - Be more compelling than competitor titles
            
            2. BULLET POINTS (Create exactly 5 bullets):
            - Each bullet should be 150-200 characters
            - Start with BENEFIT, then explain feature
            - Include emotional triggers and power words
            - Address customer pain points from competitor analysis
            - Include proof elements (certifications, guarantees, etc.)
            - Use action words and sensory language
            - Each bullet should target different customer concerns
            
            3. PRODUCT DESCRIPTION:
            - Short Description: 2-3 compelling sentences that hook the reader
            - Detailed Description: 4-6 paragraphs following this structure:
              * Paragraph 1: Hook + Problem identification
              * Paragraph 2: Solution + Key benefits
              * Paragraph 3: Features + How it works
              * Paragraph 4: Social proof + Credibility
              * Paragraph 5: Guarantee/Risk reversal
              * Paragraph 6: Call to action
            - Include storytelling elements
            - Use emotional language and sensory words
            - Include social proof and credibility indicators
            - Naturally integrate keywords (2-3% density)
            - Address objections and concerns
            - Create urgency and desire
            
            4. SEO REQUIREMENTS:
            - Primary keyword should appear in title, first bullet, and first paragraph
            - Secondary keywords distributed throughout content
            - Long-tail keywords in bullets and description
            - Semantic keywords for topic authority
            - Local/demographic keywords if applicable
            
            5. COMPETITIVE KEYWORD ANALYSIS:
            - Extract ALL keywords from competitor titles (analyze every word and phrase)
            - Identify the most frequently used keywords across competitors
            - Find high-converting keywords from top-rated products (4.5+ stars)
            - Discover long-tail keyword opportunities competitors are targeting
            - Identify keyword gaps where competitors are weak
            - Categorize keywords by: features, benefits, category, brand positioning
            - Analyze keyword patterns in successful vs unsuccessful products
            - Find semantic and related keywords competitors use
            
            6. COMPETITIVE ADVANTAGE:
            - Analyze competitor weaknesses and address them
            - Highlight unique selling propositions
            - Use superior emotional triggers
            - Include elements competitors are missing
            - Position as premium/better value
            - Use competitor keywords strategically while differentiating
            
            Focus on creating content that uses the best competitor keywords while significantly outperforming them in both ranking and conversion.
            `;

            const response = await this.analyzer.openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: "You are a world-class Amazon listing copywriter and SEO specialist with 10+ years of experience creating listings that consistently rank #1 and convert at 25%+ rates. You understand consumer psychology, emotional triggers, and the Amazon A9 algorithm. You analyze competitor weaknesses and create superior content that dominates search results and drives maximum sales. Your listings combine compelling storytelling, powerful emotional triggers, social proof, and strategic keyword placement to outperform all competitors."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 3000
            });

            let content = response.choices[0].message.content.trim();
            
            // Try to extract JSON from the response
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                content = jsonMatch[0];
            }
            
            // Remove any markdown code blocks
            content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '');
            
            try {
                return JSON.parse(content);
            } catch (parseError) {
                console.error('Failed to parse product optimization response:', content);
                console.error('Parse error:', parseError);
                
                // Return fallback structure
                return {
                    optimizedTitle: {
                        title: `${productInfo.productName} - Premium Quality ${productInfo.category}`,
                        keywordsUsed: [productInfo.productName, productInfo.category],
                        charactersUsed: "Analysis in progress",
                        whyOptimal: "Analysis in progress"
                    },
                    bulletPoints: [
                        {
                            bulletPoint: `Premium ${productInfo.productName} with superior quality`,
                            focus: "Quality emphasis",
                            keywords: [productInfo.productName],
                            competitiveAdvantage: "Analysis in progress"
                        }
                    ],
                    productDescription: {
                        description: `High-quality ${productInfo.productName} designed for ${productInfo.targetAudience}`,
                        structure: "Analysis in progress",
                        keywordsIncluded: [productInfo.productName],
                        seoStrategy: "Analysis in progress"
                    },
                    backendKeywords: {
                        searchTerms: [productInfo.productName, productInfo.category],
                        totalCharacters: "Analysis in progress",
                        strategy: "Analysis in progress"
                    },
                    competitivePositioning: {
                        priceStrategy: "Analysis in progress",
                        differentiators: ["Analysis in progress"],
                        targetKeywords: [productInfo.productName],
                        rankingStrategy: "Analysis in progress"
                    },
                    imageRecommendations: [
                        {
                            imageType: "main",
                            description: "Clear product image on white background",
                            priority: "high",
                            competitiveEdge: "Analysis in progress"
                        }
                    ],
                    launchStrategy: {
                        phase1: ["Set up listing", "Initial keyword targeting"],
                        phase2: ["Monitor performance", "Optimize based on data"],
                        phase3: ["Scale advertising", "Expand keyword targeting"],
                        keyMetrics: ["Conversion rate", "Keyword ranking"]
                    }
                };
            }

        } catch (error) {
            console.error('Error optimizing product listing:', error);
            throw new Error(`Failed to optimize product listing: ${error.message}`);
        }
    }

    async generateCompetitorInsights(productInfo, competitors) {
        try {
            const prompt = `
            COMPETITIVE INTELLIGENCE ANALYSIS: Analyze competitors to identify opportunities for a new product launch.

            YOUR NEW PRODUCT:
            - Product: ${productInfo.productName}
            - Category: ${productInfo.category}
            - Target Audience: ${productInfo.targetAudience}
            - Unique Features: ${productInfo.uniqueSellingPoints?.join(', ')}

            COMPETITOR ANALYSIS:
            ${competitors.slice(0, 8).map((comp, index) => `
            COMPETITOR ${index + 1}:
            - Title: ${comp.title}
            - Price: ${comp.price}
            - Rating: ${comp.rating}
            - Reviews: ${comp.reviewCount}
            `).join('')}

            IMPORTANT: Respond ONLY with valid JSON. Do not include any explanatory text, markdown formatting, or code blocks. Start your response with { and end with }.

            Provide competitive analysis in this JSON format:
            {
                "marketGaps": [
                    {
                        "gap": "market gap description",
                        "opportunity": "how to exploit this gap",
                        "difficulty": "easy|medium|hard",
                        "impact": "potential impact on sales"
                    }
                ],
                "competitorWeaknesses": [
                    {
                        "competitor": "competitor name",
                        "weakness": "weakness description",
                        "howToExploit": "strategy to capitalize",
                        "keywords": ["keywords they're missing"]
                    }
                ],
                "pricingAnalysis": {
                    "averagePrice": "average competitor price",
                    "priceRange": "lowest to highest price",
                    "recommendedPrice": "optimal price for your product",
                    "pricingStrategy": "pricing strategy explanation"
                },
                "keywordOpportunities": [
                    {
                        "keyword": "opportunity keyword",
                        "searchVolume": "high|medium|low",
                        "competition": "high|medium|low",
                        "whyOpportunity": "why this is an opportunity",
                        "howToRank": "strategy to rank for this keyword"
                    }
                ],
                "differentiationStrategy": {
                    "primaryDifferentiators": ["differentiator 1", "differentiator 2"],
                    "messagingStrategy": "how to communicate advantages",
                    "targetKeywords": ["keyword to target 1", "keyword to target 2"],
                    "competitiveAdvantages": ["advantage 1", "advantage 2"]
                },
                "launchTiming": {
                    "bestTimeToLaunch": "optimal launch timing",
                    "seasonalFactors": "seasonal considerations",
                    "marketConditions": "current market analysis",
                    "competitiveActivity": "competitor activity analysis"
                }
            }
            `;

            const response = await this.analyzer.openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: "You are an expert market research analyst specializing in Amazon marketplace competitive intelligence and product launch strategy."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.6,
                max_tokens: 2500
            });

            let content = response.choices[0].message.content.trim();
            
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                content = jsonMatch[0];
            }
            
            content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '');
            
            try {
                return JSON.parse(content);
            } catch (parseError) {
                console.error('Failed to parse competitor insights:', content);
                return {
                    marketGaps: [
                        {
                            gap: "Analysis in progress",
                            opportunity: "Analysis in progress",
                            difficulty: "medium",
                            impact: "Analysis in progress"
                        }
                    ],
                    competitorWeaknesses: [
                        {
                            competitor: "Analysis in progress",
                            weakness: "Analysis in progress",
                            howToExploit: "Analysis in progress",
                            keywords: ["Analysis in progress"]
                        }
                    ],
                    pricingAnalysis: {
                        averagePrice: "Analysis in progress",
                        priceRange: "Analysis in progress",
                        recommendedPrice: "Analysis in progress",
                        pricingStrategy: "Analysis in progress"
                    },
                    keywordOpportunities: [
                        {
                            keyword: "Analysis in progress",
                            searchVolume: "medium",
                            competition: "medium",
                            whyOpportunity: "Analysis in progress",
                            howToRank: "Analysis in progress"
                        }
                    ],
                    differentiationStrategy: {
                        primaryDifferentiators: ["Analysis in progress"],
                        messagingStrategy: "Analysis in progress",
                        targetKeywords: ["Analysis in progress"],
                        competitiveAdvantages: ["Analysis in progress"]
                    },
                    launchTiming: {
                        bestTimeToLaunch: "Analysis in progress",
                        seasonalFactors: "Analysis in progress",
                        marketConditions: "Analysis in progress",
                        competitiveActivity: "Analysis in progress"
                    }
                };
            }

        } catch (error) {
            console.error('Error generating competitor insights:', error);
            throw new Error(`Failed to generate competitor insights: ${error.message}`);
        }
    }

    async generateLaunchPlan(productInfo, competitorInsights, optimizedListing) {
        try {
            const prompt = `
            CREATE COMPREHENSIVE PRODUCT LAUNCH PLAN: Generate a detailed 90-day launch strategy for maximum success.

            PRODUCT INFORMATION:
            - Product: ${productInfo.productName}
            - Category: ${productInfo.category}
            - Target Price: ${productInfo.priceRange}
            - Launch Budget: ${productInfo.launchBudget || 'Not specified'}

            COMPETITIVE INSIGHTS:
            - Recommended Price: ${competitorInsights.pricingAnalysis?.recommendedPrice}
            - Key Opportunities: ${competitorInsights.keywordOpportunities?.slice(0, 3).map(k => k.keyword).join(', ')}
            - Market Gaps: ${competitorInsights.marketGaps?.slice(0, 2).map(g => g.gap).join(', ')}

            OPTIMIZED LISTING:
            - Title: ${optimizedListing.optimizedTitle?.title}
            - Target Keywords: ${optimizedListing.competitivePositioning?.targetKeywords?.join(', ')}

            IMPORTANT: Respond ONLY with valid JSON. Do not include any explanatory text, markdown formatting, or code blocks. Start your response with { and end with }.

            Generate launch plan in this JSON format:
            {
                "prelaunchPhase": {
                    "duration": "2-4 weeks before launch",
                    "tasks": [
                        {
                            "task": "task description",
                            "timeline": "when to complete",
                            "priority": "high|medium|low",
                            "expectedOutcome": "what this achieves"
                        }
                    ]
                },
                "launchWeek": {
                    "duration": "Week 1",
                    "dailyTasks": {
                        "day1": ["task 1", "task 2"],
                        "day2": ["task 1", "task 2"],
                        "day7": ["task 1", "task 2"]
                    },
                    "keyMetrics": ["metric 1", "metric 2"],
                    "successCriteria": ["criteria 1", "criteria 2"]
                },
                "month1Strategy": {
                    "duration": "Weeks 2-4",
                    "weeklyGoals": [
                        {
                            "week": "Week 2",
                            "goals": ["goal 1", "goal 2"],
                            "actions": ["action 1", "action 2"]
                        }
                    ],
                    "advertisingStrategy": {
                        "budget": "recommended weekly budget",
                        "campaigns": ["campaign type 1", "campaign type 2"],
                        "targetKeywords": ["keyword 1", "keyword 2"]
                    }
                },
                "month2_3Strategy": {
                    "duration": "Months 2-3",
                    "objectives": ["objective 1", "objective 2"],
                    "scalingStrategy": ["scaling tactic 1", "scaling tactic 2"],
                    "optimizationFocus": ["optimization area 1", "optimization area 2"]
                },
                "budgetAllocation": {
                    "advertising": "percentage for ads",
                    "inventory": "percentage for inventory",
                    "promotions": "percentage for promotions",
                    "contingency": "percentage for unexpected costs"
                },
                "riskMitigation": [
                    {
                        "risk": "potential risk",
                        "probability": "high|medium|low",
                        "impact": "high|medium|low",
                        "mitigation": "how to prevent/handle"
                    }
                ],
                "successMetrics": {
                    "week1Targets": {"sales": "target", "ranking": "target"},
                    "month1Targets": {"sales": "target", "ranking": "target"},
                    "month3Targets": {"sales": "target", "ranking": "target"}
                }
            }
            `;

            const response = await this.analyzer.openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: "You are an expert Amazon product launch strategist with extensive experience in successful product launches and scaling strategies."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 3000
            });

            let content = response.choices[0].message.content.trim();
            
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                content = jsonMatch[0];
            }
            
            content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '');
            
            try {
                return JSON.parse(content);
            } catch (parseError) {
                console.error('Failed to parse launch plan:', content);
                return {
                    prelaunchPhase: {
                        duration: "2-4 weeks before launch",
                        tasks: [
                            {
                                task: "Finalize product listing optimization",
                                timeline: "2 weeks before launch",
                                priority: "high",
                                expectedOutcome: "SEO-optimized listing ready"
                            }
                        ]
                    },
                    launchWeek: {
                        duration: "Week 1",
                        dailyTasks: {
                            day1: ["Launch product", "Start advertising campaigns"],
                            day2: ["Monitor performance", "Adjust bids"],
                            day7: ["Weekly performance review", "Plan week 2"]
                        },
                        keyMetrics: ["Sales velocity", "Keyword ranking"],
                        successCriteria: ["First sale within 24 hours", "Top 100 ranking for main keyword"]
                    },
                    month1Strategy: {
                        duration: "Weeks 2-4",
                        weeklyGoals: [
                            {
                                week: "Week 2",
                                goals: ["Increase daily sales", "Improve keyword rankings"],
                                actions: ["Optimize ad campaigns", "Monitor competitor activity"]
                            }
                        ],
                        advertisingStrategy: {
                            budget: "Analysis in progress",
                            campaigns: ["Sponsored Products", "Sponsored Brands"],
                            targetKeywords: ["Analysis in progress"]
                        }
                    },
                    month2_3Strategy: {
                        duration: "Months 2-3",
                        objectives: ["Scale profitably", "Expand keyword targeting"],
                        scalingStrategy: ["Increase ad budget", "Launch additional campaigns"],
                        optimizationFocus: ["Conversion rate", "Profit margins"]
                    },
                    budgetAllocation: {
                        advertising: "40-50%",
                        inventory: "30-40%",
                        promotions: "10-15%",
                        contingency: "5-10%"
                    },
                    riskMitigation: [
                        {
                            risk: "Low initial sales",
                            probability: "medium",
                            impact: "high",
                            mitigation: "Aggressive promotional pricing and advertising"
                        }
                    ],
                    successMetrics: {
                        week1Targets: {sales: "Analysis in progress", ranking: "Analysis in progress"},
                        month1Targets: {sales: "Analysis in progress", ranking: "Analysis in progress"},
                        month3Targets: {sales: "Analysis in progress", ranking: "Analysis in progress"}
                    }
                };
            }

        } catch (error) {
            console.error('Error generating launch plan:', error);
            throw new Error(`Failed to generate launch plan: ${error.message}`);
        }
    }
}
