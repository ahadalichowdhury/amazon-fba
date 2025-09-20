import OpenAI from 'openai';

export class OpenAIAnalyzer {
    constructor(apiKey) {
        this.openai = new OpenAI({
            apiKey: apiKey
        });
    }

    async analyzeProductForKeywords(productData) {
        try {
            const prompt = `
            Analyze this Amazon product and provide comprehensive keyword research for ranking optimization:

            Product Details:
            - Title: ${productData.title}
            - Brand: ${productData.brand}
            - Category: ${productData.category}
            - Price: ${productData.price}
            - Rating: ${productData.rating}
            - Review Count: ${productData.reviewCount}
            - Description: ${productData.description}
            - Bullet Points: ${productData.bulletPoints?.join(', ')}
            - ASIN: ${productData.asin}

            IMPORTANT: Respond ONLY with valid JSON. Do not include any explanatory text, markdown formatting, or code blocks. Start your response with { and end with }.

            Provide the analysis in this exact JSON format:
            {
                "primaryKeywords": ["keyword1", "keyword2", "keyword3"],
                "longTailKeywords": ["long tail keyword 1", "long tail keyword 2"],
                "brandKeywords": ["brand related keyword 1", "brand related keyword 2"],
                "categoryKeywords": ["category keyword 1", "category keyword 2"],
                "competitorKeywords": ["competitor keyword 1", "competitor keyword 2"],
                "searchVolumeEstimate": {
                    "high": ["high volume keywords"],
                    "medium": ["medium volume keywords"],
                    "low": ["low volume keywords"]
                },
                "keywordDifficulty": {
                    "easy": ["easy to rank keywords"],
                    "medium": ["medium difficulty keywords"],
                    "hard": ["hard to rank keywords"]
                },
                "seasonalKeywords": ["seasonal keyword 1", "seasonal keyword 2"],
                "buyerIntentKeywords": ["buy intent keyword 1", "buy intent keyword 2"],
                "rankingStrategy": {
                    "immediate": ["keywords to target immediately"],
                    "shortTerm": ["keywords for 1-3 months"],
                    "longTerm": ["keywords for 6+ months"]
                },
                "contentOptimization": {
                    "titleSuggestions": ["optimized title suggestion 1", "optimized title suggestion 2"],
                    "bulletPointKeywords": ["keyword for bullet 1", "keyword for bullet 2"],
                    "backendKeywords": ["backend keyword 1", "backend keyword 2"]
                }
            }

            Focus on keywords that will actually help this product rank higher on Amazon. Consider search volume, competition, and relevance.
            `;

            const response = await this.openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: "You are an expert Amazon SEO specialist with deep knowledge of keyword research, product ranking, and Amazon's A9 algorithm. Provide actionable, data-driven keyword recommendations."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 2000
            });

            let content = response.choices[0].message.content.trim();
            
            // Try to extract JSON from the response if it's wrapped in markdown or other text
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                content = jsonMatch[0];
            }
            
            // Remove any markdown code blocks
            content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '');
            
            try {
                const analysis = JSON.parse(content);
                return analysis;
            } catch (parseError) {
                console.error('Failed to parse OpenAI response:', content);
                console.error('Parse error:', parseError);
                
                // Return a fallback structure if parsing fails
                return {
                    primaryKeywords: ["keyword analysis", "product optimization"],
                    longTailKeywords: ["long tail keyword research"],
                    brandKeywords: ["brand related terms"],
                    categoryKeywords: ["category specific keywords"],
                    competitorKeywords: ["competitor analysis"],
                    searchVolumeEstimate: {
                        high: ["high volume terms"],
                        medium: ["medium volume terms"],
                        low: ["low volume terms"]
                    },
                    keywordDifficulty: {
                        easy: ["easy ranking keywords"],
                        medium: ["medium difficulty keywords"],
                        hard: ["hard ranking keywords"]
                    },
                    seasonalKeywords: ["seasonal terms"],
                    buyerIntentKeywords: ["buy intent keywords"],
                    rankingStrategy: {
                        immediate: ["immediate focus keywords"],
                        shortTerm: ["short term keywords"],
                        longTerm: ["long term keywords"]
                    },
                    contentOptimization: {
                        titleSuggestions: ["optimized title suggestions"],
                        bulletPointKeywords: ["bullet point keywords"],
                        backendKeywords: ["backend search terms"]
                    }
                };
            }

        } catch (error) {
            console.error('Error analyzing product for keywords:', error);
            throw new Error(`Failed to analyze product: ${error.message}`);
        }
    }

    async analyzeCompetitors(productData, competitors) {
        try {
            const competitorInfo = competitors.slice(0, 5).map(comp => ({
                title: comp.title,
                price: comp.price,
                rating: comp.rating,
                reviewCount: comp.reviewCount
            }));

            const prompt = `
            Analyze this product against its competitors and provide strategic insights:

            Your Product:
            - Title: ${productData.title}
            - Price: ${productData.price}
            - Rating: ${productData.rating}
            - Review Count: ${productData.reviewCount}

            Top Competitors:
            ${competitorInfo.map((comp, index) => `
            ${index + 1}. ${comp.title}
               Price: ${comp.price}
               Rating: ${comp.rating}
               Reviews: ${comp.reviewCount}
            `).join('')}

            IMPORTANT: Respond ONLY with valid JSON. Do not include any explanatory text, markdown formatting, or code blocks. Start your response with { and end with }.

            Provide analysis in this JSON format:
            {
                "competitivePosition": {
                    "strengths": ["strength 1", "strength 2"],
                    "weaknesses": ["weakness 1", "weakness 2"],
                    "opportunities": ["opportunity 1", "opportunity 2"]
                },
                "pricingStrategy": {
                    "currentPosition": "premium|competitive|budget",
                    "recommendation": "pricing recommendation",
                    "priceRange": "suggested price range"
                },
                "keywordGaps": ["keyword gap 1", "keyword gap 2"],
                "competitorKeywords": ["competitor keyword 1", "competitor keyword 2"],
                "differentiationStrategy": ["differentiation point 1", "differentiation point 2"],
                "marketingAngles": ["marketing angle 1", "marketing angle 2"],
                "improvementAreas": ["improvement area 1", "improvement area 2"]
            }
            `;

            const response = await this.openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: "You are an expert Amazon marketplace analyst specializing in competitive analysis and market positioning."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 1500
            });

            let content = response.choices[0].message.content.trim();
            
            // Try to extract JSON from the response if it's wrapped in markdown or other text
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                content = jsonMatch[0];
            }
            
            // Remove any markdown code blocks
            content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '');
            
            try {
                return JSON.parse(content);
            } catch (parseError) {
                console.error('Failed to parse OpenAI response:', content);
                console.error('Parse error:', parseError);
                
                // Return a fallback structure
                return {
                    competitivePosition: {
                        strengths: ["Analysis in progress"],
                        weaknesses: ["Analysis in progress"],
                        opportunities: ["Analysis in progress"]
                    },
                    pricingStrategy: {
                        currentPosition: "competitive",
                        recommendation: "Analysis in progress",
                        priceRange: "Analysis in progress"
                    },
                    keywordGaps: ["Analysis in progress"],
                    competitorKeywords: ["Analysis in progress"],
                    differentiationStrategy: ["Analysis in progress"],
                    marketingAngles: ["Analysis in progress"],
                    improvementAreas: ["Analysis in progress"]
                };
            }

        } catch (error) {
            console.error('Error analyzing competitors:', error);
            throw new Error(`Failed to analyze competitors: ${error.message}`);
        }
    }

    async generateAdKeywords(productData, keywordAnalysis) {
        try {
            const prompt = `
            Based on this product and keyword analysis, generate Amazon PPC advertising keywords:

            Product: ${productData.title}
            Category: ${productData.category}
            Primary Keywords: ${keywordAnalysis.primaryKeywords?.join(', ')}
            Long Tail Keywords: ${keywordAnalysis.longTailKeywords?.join(', ')}

            IMPORTANT: Respond ONLY with valid JSON. Do not include any explanatory text, markdown formatting, or code blocks. Start your response with { and end with }.

            Generate advertising keywords in this JSON format:
            {
                "exactMatch": {
                    "high_priority": ["exact keyword 1", "exact keyword 2"],
                    "medium_priority": ["exact keyword 3", "exact keyword 4"],
                    "low_priority": ["exact keyword 5", "exact keyword 6"]
                },
                "phraseMatch": {
                    "high_priority": ["phrase keyword 1", "phrase keyword 2"],
                    "medium_priority": ["phrase keyword 3", "phrase keyword 4"],
                    "low_priority": ["phrase keyword 5", "phrase keyword 6"]
                },
                "broadMatch": {
                    "high_priority": ["broad keyword 1", "broad keyword 2"],
                    "medium_priority": ["broad keyword 3", "broad keyword 4"],
                    "low_priority": ["broad keyword 5", "broad keyword 6"]
                },
                "negativeKeywords": ["negative keyword 1", "negative keyword 2"],
                "campaignStrategy": {
                    "launchCampaign": ["keywords for launch"],
                    "scalingCampaign": ["keywords for scaling"],
                    "defensiveCampaign": ["brand protection keywords"]
                },
                "bidRecommendations": {
                    "highBid": ["high bid keywords"],
                    "mediumBid": ["medium bid keywords"],
                    "lowBid": ["low bid keywords"]
                }
            }

            Focus on keywords that will drive profitable sales, not just traffic.
            `;

            const response = await this.openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: "You are an expert Amazon PPC specialist with extensive experience in keyword bidding, campaign optimization, and profitable advertising strategies."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.6,
                max_tokens: 1500
            });

            let content = response.choices[0].message.content.trim();
            
            // Try to extract JSON from the response if it's wrapped in markdown or other text
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                content = jsonMatch[0];
            }
            
            // Remove any markdown code blocks
            content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '');
            
            try {
                return JSON.parse(content);
            } catch (parseError) {
                console.error('Failed to parse OpenAI response:', content);
                console.error('Parse error:', parseError);
                
                // Return ad keywords fallback structure
                return {
                    exactMatch: {
                        high_priority: ["product keywords", "brand keywords"],
                        medium_priority: ["category keywords"],
                        low_priority: ["general keywords"]
                    },
                    phraseMatch: {
                        high_priority: ["product phrase keywords"],
                        medium_priority: ["category phrase keywords"],
                        low_priority: ["general phrase keywords"]
                    },
                    broadMatch: {
                        high_priority: ["broad product keywords"],
                        medium_priority: ["broad category keywords"],
                        low_priority: ["broad general keywords"]
                    },
                    negativeKeywords: ["irrelevant terms"],
                    campaignStrategy: {
                        launchCampaign: ["launch keywords"],
                        scalingCampaign: ["scaling keywords"],
                        defensiveCampaign: ["brand protection keywords"]
                    },
                    bidRecommendations: {
                        highBid: ["high value keywords"],
                        mediumBid: ["medium value keywords"],
                        lowBid: ["low value keywords"]
                    }
                };
            }

        } catch (error) {
            console.error('Error generating ad keywords:', error);
            throw new Error(`Failed to generate ad keywords: ${error.message}`);
        }
    }

    async generateSalesImprovementStrategy(productData, competitorAnalysis, keywordAnalysis) {
        try {
            const prompt = `
            Create a comprehensive sales improvement strategy for this Amazon product:

            Product: ${productData.title}
            Current Rating: ${productData.rating}
            Review Count: ${productData.reviewCount}
            Price: ${productData.price}

            Competitive Position: ${JSON.stringify(competitorAnalysis.competitivePosition)}
            Key Opportunities: ${competitorAnalysis.opportunities?.join(', ')}

            IMPORTANT: Respond ONLY with valid JSON. Do not include any explanatory text, markdown formatting, or code blocks. Start your response with { and end with }.

            Provide strategy in this JSON format:
            {
                "immediateActions": [
                    {
                        "action": "action description",
                        "impact": "expected impact",
                        "timeframe": "1-2 weeks"
                    }
                ],
                "shortTermStrategy": [
                    {
                        "action": "action description",
                        "impact": "expected impact",
                        "timeframe": "1-3 months"
                    }
                ],
                "longTermStrategy": [
                    {
                        "action": "action description",
                        "impact": "expected impact",
                        "timeframe": "3-6 months"
                    }
                ],
                "listingOptimization": {
                    "title": "optimized title suggestion",
                    "bulletPoints": ["bullet point 1", "bullet point 2"],
                    "description": "optimized description strategy",
                    "images": ["image improvement 1", "image improvement 2"]
                },
                "pricingStrategy": {
                    "currentAnalysis": "pricing analysis",
                    "recommendation": "pricing recommendation",
                    "promotionalStrategy": "promotional strategy"
                },
                "reviewStrategy": {
                    "targetReviewCount": "target number",
                    "reviewAcquisitionPlan": ["plan step 1", "plan step 2"],
                    "qualityImprovements": ["improvement 1", "improvement 2"]
                },
                "inventoryManagement": {
                    "stockLevels": "stock level recommendation",
                    "seasonalPlanning": "seasonal strategy",
                    "demandForecasting": "demand forecast insights"
                }
            }
            `;

            const response = await this.openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: "You are an expert Amazon FBA consultant specializing in sales optimization, listing improvement, and marketplace growth strategies."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 2000
            });

            let content = response.choices[0].message.content.trim();
            
            // Try to extract JSON from the response if it's wrapped in markdown or other text
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                content = jsonMatch[0];
            }
            
            // Remove any markdown code blocks
            content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '');
            
            try {
                return JSON.parse(content);
            } catch (parseError) {
                console.error('Failed to parse OpenAI response:', content);
                console.error('Parse error:', parseError);
                
                // Return sales strategy fallback structure
                return {
                    immediateActions: [
                        {
                            action: "Optimize product images",
                            impact: "Improve conversion rate",
                            timeframe: "1-2 weeks"
                        }
                    ],
                    shortTermStrategy: [
                        {
                            action: "Improve product listing",
                            impact: "Better search ranking",
                            timeframe: "1-3 months"
                        }
                    ],
                    longTermStrategy: [
                        {
                            action: "Build brand presence",
                            impact: "Long-term growth",
                            timeframe: "3-6 months"
                        }
                    ],
                    listingOptimization: {
                        title: "Optimized title suggestion",
                        bulletPoints: ["Improved bullet point 1", "Improved bullet point 2"],
                        description: "Enhanced description strategy",
                        images: ["Better main image", "Additional lifestyle images"]
                    },
                    pricingStrategy: {
                        currentAnalysis: "Competitive pricing analysis",
                        recommendation: "Adjust pricing strategy",
                        promotionalStrategy: "Promotional recommendations"
                    },
                    reviewStrategy: {
                        targetReviewCount: "100+ reviews",
                        reviewAcquisitionPlan: ["Follow up with customers", "Improve product quality"],
                        qualityImprovements: ["Product improvements", "Customer service enhancements"]
                    },
                    inventoryManagement: {
                        stockLevels: "Maintain adequate inventory",
                        seasonalPlanning: "Plan for seasonal demand",
                        demandForecasting: "Monitor demand trends"
                    }
                };
            }

        } catch (error) {
            console.error('Error generating sales improvement strategy:', error);
            throw new Error(`Failed to generate sales strategy: ${error.message}`);
        }
    }
}
