import { OpenAIAnalyzer } from './openaiAnalyzer.js';

export class SalesDiagnostic {
    constructor(openaiApiKey) {
        this.analyzer = new OpenAIAnalyzer(openaiApiKey);
    }

    async diagnoseSalesProblems(yourProduct, topCompetitors) {
        try {
            const prompt = `
            CRITICAL SALES ANALYSIS: Analyze why this Amazon product is not selling well compared to successful competitors.

            YOUR PRODUCT (Low/No Sales):
            - Title: ${yourProduct.title}
            - Price: ${yourProduct.price}
            - Rating: ${yourProduct.rating}
            - Review Count: ${yourProduct.reviewCount}
            - Category: ${yourProduct.category}
            - Description: ${yourProduct.description}
            - Bullet Points: ${yourProduct.bulletPoints?.join(' | ')}
            - Images Available: ${yourProduct.images?.length || 0}

            TOP PERFORMING COMPETITORS:
            ${topCompetitors.slice(0, 5).map((comp, index) => `
            COMPETITOR ${index + 1} (HIGH SALES):
            - Title: ${comp.title}
            - Price: ${comp.price}
            - Rating: ${comp.rating}
            - Reviews: ${comp.reviewCount}
            `).join('')}

            IMPORTANT: Respond ONLY with valid JSON. Do not include any explanatory text, markdown formatting, or code blocks. Start your response with { and end with }.

            Analyze and provide specific reasons why the product isn't selling in this JSON format:
            {
                "criticalMistakes": [
                    {
                        "mistake": "specific mistake description",
                        "impact": "how this affects sales",
                        "severity": "high|medium|low",
                        "solution": "specific fix needed"
                    }
                ],
                "pricingIssues": {
                    "problem": "pricing problem description",
                    "competitorPriceRange": "competitor price analysis",
                    "recommendedPrice": "suggested price",
                    "pricingStrategy": "pricing strategy recommendation"
                },
                "listingProblems": {
                    "titleIssues": ["title problem 1", "title problem 2"],
                    "imageProblems": ["image issue 1", "image issue 2"],
                    "descriptionIssues": ["description problem 1", "description problem 2"],
                    "bulletPointIssues": ["bullet point issue 1", "bullet point issue 2"]
                },
                "keywordMistakes": {
                    "missingKeywords": ["important keyword 1", "important keyword 2"],
                    "wrongKeywords": ["ineffective keyword 1", "ineffective keyword 2"],
                    "keywordGaps": ["keyword gap 1", "keyword gap 2"],
                    "competitorKeywords": ["competitor keyword 1", "competitor keyword 2"]
                },
                "competitiveDisadvantages": [
                    {
                        "area": "disadvantage area",
                        "yourStatus": "your current status",
                        "competitorStatus": "competitor advantage",
                        "actionNeeded": "what to do"
                    }
                ],
                "trustSignals": {
                    "missing": ["missing trust signal 1", "missing trust signal 2"],
                    "weak": ["weak trust signal 1", "weak trust signal 2"],
                    "improvements": ["improvement 1", "improvement 2"]
                },
                "conversionKillers": [
                    {
                        "issue": "conversion killer description",
                        "fix": "how to fix it",
                        "priority": "high|medium|low"
                    }
                ],
                "immediateActions": [
                    {
                        "action": "immediate action needed",
                        "expectedImpact": "expected sales impact",
                        "timeToImplement": "implementation time",
                        "difficulty": "easy|medium|hard"
                    }
                ]
            }

            Focus on actionable insights that will directly improve sales performance.
            `;

            const response = await this.analyzer.openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: "You are an expert Amazon FBA consultant specializing in diagnosing why products fail to sell and providing actionable solutions to increase sales."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 2500
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
                console.error('Failed to parse sales diagnostic response:', content);
                console.error('Parse error:', parseError);
                
                // Return fallback structure
                return {
                    criticalMistakes: [
                        {
                            mistake: "Analysis in progress - please try again",
                            impact: "Unable to determine impact",
                            severity: "medium",
                            solution: "Retry analysis"
                        }
                    ],
                    pricingIssues: {
                        problem: "Analysis in progress",
                        competitorPriceRange: "Analysis in progress",
                        recommendedPrice: "Analysis in progress",
                        pricingStrategy: "Analysis in progress"
                    },
                    listingProblems: {
                        titleIssues: ["Analysis in progress"],
                        imageProblems: ["Analysis in progress"],
                        descriptionIssues: ["Analysis in progress"],
                        bulletPointIssues: ["Analysis in progress"]
                    },
                    keywordMistakes: {
                        missingKeywords: ["Analysis in progress"],
                        wrongKeywords: ["Analysis in progress"],
                        keywordGaps: ["Analysis in progress"],
                        competitorKeywords: ["Analysis in progress"]
                    },
                    competitiveDisadvantages: [
                        {
                            area: "Analysis in progress",
                            yourStatus: "Analysis in progress",
                            competitorStatus: "Analysis in progress",
                            actionNeeded: "Analysis in progress"
                        }
                    ],
                    trustSignals: {
                        missing: ["Analysis in progress"],
                        weak: ["Analysis in progress"],
                        improvements: ["Analysis in progress"]
                    },
                    conversionKillers: [
                        {
                            issue: "Analysis in progress",
                            fix: "Analysis in progress",
                            priority: "medium"
                        }
                    ],
                    immediateActions: [
                        {
                            action: "Retry analysis",
                            expectedImpact: "Better insights",
                            timeToImplement: "1 minute",
                            difficulty: "easy"
                        }
                    ]
                };
            }

        } catch (error) {
            console.error('Error diagnosing sales problems:', error);
            throw new Error(`Failed to diagnose sales problems: ${error.message}`);
        }
    }

    async analyzeKeywordGaps(yourProduct, topCompetitors) {
        try {
            const prompt = `
            KEYWORD GAP ANALYSIS: Find the missing keywords that successful competitors are using but your product is not.

            YOUR PRODUCT:
            Title: ${yourProduct.title}
            Current Keywords: ${yourProduct.bulletPoints?.join(' ') + ' ' + yourProduct.description}

            TOP COMPETITORS:
            ${topCompetitors.slice(0, 3).map((comp, index) => `
            COMPETITOR ${index + 1}:
            Title: ${comp.title}
            Estimated Keywords: ${comp.title.split(' ').join(', ')}
            `).join('')}

            IMPORTANT: Respond ONLY with valid JSON. Do not include any explanatory text, markdown formatting, or code blocks. Start your response with { and end with }.

            Provide keyword gap analysis in this JSON format:
            {
                "missingHighValueKeywords": [
                    {
                        "keyword": "missing keyword",
                        "searchVolume": "high|medium|low",
                        "competition": "high|medium|low",
                        "opportunity": "why this keyword is important",
                        "whereToUse": "title|bullets|description|backend"
                    }
                ],
                "competitorKeywordAdvantages": [
                    {
                        "competitor": "competitor name",
                        "keywordAdvantage": "keyword they use",
                        "whyItWorks": "why this keyword helps them",
                        "howToAdopt": "how you can use it"
                    }
                ],
                "keywordOptimizationPlan": {
                    "titleKeywords": ["keyword for title 1", "keyword for title 2"],
                    "bulletKeywords": ["keyword for bullets 1", "keyword for bullets 2"],
                    "descriptionKeywords": ["keyword for description 1", "keyword for description 2"],
                    "backendKeywords": ["backend keyword 1", "backend keyword 2"]
                },
                "rankingOpportunities": [
                    {
                        "keyword": "opportunity keyword",
                        "currentRanking": "estimated current position",
                        "targetRanking": "target position",
                        "difficulty": "easy|medium|hard",
                        "strategy": "how to rank for this keyword"
                    }
                ]
            }
            `;

            const response = await this.analyzer.openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: "You are an expert Amazon SEO specialist focusing on keyword gap analysis and ranking opportunities."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.6,
                max_tokens: 2000
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
                console.error('Failed to parse keyword gap analysis:', content);
                return {
                    missingHighValueKeywords: [
                        {
                            keyword: "Analysis in progress",
                            searchVolume: "medium",
                            competition: "medium",
                            opportunity: "Analysis in progress",
                            whereToUse: "title"
                        }
                    ],
                    competitorKeywordAdvantages: [
                        {
                            competitor: "Analysis in progress",
                            keywordAdvantage: "Analysis in progress",
                            whyItWorks: "Analysis in progress",
                            howToAdopt: "Analysis in progress"
                        }
                    ],
                    keywordOptimizationPlan: {
                        titleKeywords: ["Analysis in progress"],
                        bulletKeywords: ["Analysis in progress"],
                        descriptionKeywords: ["Analysis in progress"],
                        backendKeywords: ["Analysis in progress"]
                    },
                    rankingOpportunities: [
                        {
                            keyword: "Analysis in progress",
                            currentRanking: "Unknown",
                            targetRanking: "Top 10",
                            difficulty: "medium",
                            strategy: "Analysis in progress"
                        }
                    ]
                };
            }

        } catch (error) {
            console.error('Error analyzing keyword gaps:', error);
            throw new Error(`Failed to analyze keyword gaps: ${error.message}`);
        }
    }

    async generateListingOptimization(yourProduct, topPerformers) {
        try {
            const prompt = `
            LISTING OPTIMIZATION: Create optimized listing elements based on successful competitor analysis.

            YOUR CURRENT LISTING:
            Title: ${yourProduct.title}
            Bullet Points: ${yourProduct.bulletPoints?.join(' | ')}
            Description: ${yourProduct.description}
            Price: ${yourProduct.price}

            TOP PERFORMING COMPETITORS:
            ${topPerformers.slice(0, 3).map((comp, index) => `
            HIGH PERFORMER ${index + 1}:
            Title: ${comp.title}
            Price: ${comp.price}
            Rating: ${comp.rating} (${comp.reviewCount} reviews)
            `).join('')}

            IMPORTANT: Respond ONLY with valid JSON. Do not include any explanatory text, markdown formatting, or code blocks. Start your response with { and end with }.

            Provide optimized listing elements in this JSON format:
            {
                "optimizedTitle": {
                    "newTitle": "optimized title suggestion",
                    "improvements": ["improvement 1", "improvement 2"],
                    "keywordsAdded": ["keyword 1", "keyword 2"],
                    "charactersUsed": "character count"
                },
                "optimizedBulletPoints": [
                    {
                        "bulletPoint": "optimized bullet point text",
                        "focus": "what this bullet emphasizes",
                        "keywords": ["keywords in this bullet"]
                    }
                ],
                "optimizedDescription": {
                    "newDescription": "optimized product description",
                    "structure": "description structure explanation",
                    "keywordsIncluded": ["keyword 1", "keyword 2"]
                },
                "imageRecommendations": [
                    {
                        "imageType": "main|lifestyle|infographic|comparison",
                        "description": "what this image should show",
                        "priority": "high|medium|low"
                    }
                ],
                "pricingOptimization": {
                    "recommendedPrice": "suggested price",
                    "pricingReason": "why this price",
                    "competitivePosition": "how it compares to competitors"
                },
                "a9AlgorithmOptimization": {
                    "primaryKeywords": ["main keyword 1", "main keyword 2"],
                    "secondaryKeywords": ["secondary keyword 1", "secondary keyword 2"],
                    "keywordDensity": "keyword density recommendations",
                    "rankingFactors": ["ranking factor 1", "ranking factor 2"]
                }
            }
            `;

            const response = await this.analyzer.openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: "You are an expert Amazon listing optimization specialist with deep knowledge of the A9 algorithm and conversion optimization."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7,
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
                console.error('Failed to parse listing optimization:', content);
                return {
                    optimizedTitle: {
                        newTitle: "Analysis in progress",
                        improvements: ["Analysis in progress"],
                        keywordsAdded: ["Analysis in progress"],
                        charactersUsed: "Analysis in progress"
                    },
                    optimizedBulletPoints: [
                        {
                            bulletPoint: "Analysis in progress",
                            focus: "Analysis in progress",
                            keywords: ["Analysis in progress"]
                        }
                    ],
                    optimizedDescription: {
                        newDescription: "Analysis in progress",
                        structure: "Analysis in progress",
                        keywordsIncluded: ["Analysis in progress"]
                    },
                    imageRecommendations: [
                        {
                            imageType: "main",
                            description: "Analysis in progress",
                            priority: "high"
                        }
                    ],
                    pricingOptimization: {
                        recommendedPrice: "Analysis in progress",
                        pricingReason: "Analysis in progress",
                        competitivePosition: "Analysis in progress"
                    },
                    a9AlgorithmOptimization: {
                        primaryKeywords: ["Analysis in progress"],
                        secondaryKeywords: ["Analysis in progress"],
                        keywordDensity: "Analysis in progress",
                        rankingFactors: ["Analysis in progress"]
                    }
                };
            }

        } catch (error) {
            console.error('Error generating listing optimization:', error);
            throw new Error(`Failed to generate listing optimization: ${error.message}`);
        }
    }
}
