# Amazon FBA Keyword Research Tool

A comprehensive AI-powered tool for Amazon FBA sellers to analyze products, find ranking keywords, analyze competitors, and optimize their listings for better sales performance.

## 🚀 Features

### Basic Analysis

- **Product Analysis**: Scrape and analyze Amazon product data
- **Keyword Research**: AI-powered keyword discovery using OpenAI GPT-4
- **Competitor Analysis**: Find and analyze competitor products
- **Ad Keywords**: Generate PPC advertising keywords with match types
- **Sales Strategy**: Get actionable recommendations to improve sales

### Advanced Sales Diagnostic

- **Sales Problem Detection**: Identify exactly why your product isn't selling
- **Mistake Analysis**: Compare your listing to top performers and find critical errors
- **Keyword Gap Analysis**: Discover high-value keywords your competitors use but you don't
- **Listing Optimization**: Get specific suggestions to improve title, bullets, images
- **Top Performer Comparison**: Analyze what successful competitors do differently
- **Critical Issue Prioritization**: Focus on high-impact problems first

### New Product Launch Optimizer (NEW!)

- **SEO-Optimized Listing Creation**: Generate complete Amazon listings that outrank competitors
- **Advanced Competitor Research**: Automatically find and analyze 15-20 top performers in your category
- **Competitor Keyword Intelligence**: Extract and analyze the exact keywords your competitors use to rank
- **Market Gap Analysis**: Identify opportunities competitors are missing
- **Pricing Strategy**: Get optimal pricing recommendations based on market analysis
- **90-Day Launch Plan**: Comprehensive pre-launch, launch, and scaling strategy
- **Backend Keywords**: Generate search terms for maximum discoverability
- **Image Strategy**: Recommendations for main, lifestyle, and infographic images

### Beautiful UI

- **Modern Interface**: Clean, responsive web design
- **Triple Analysis Modes**: Basic analysis, sales diagnostic, and new product optimizer
- **Tabbed Results**: Organized insights across multiple categories
- **Mobile Friendly**: Works perfectly on all devices

## 📋 What This Tool Provides

### 1. Keyword Analysis

- **Primary Keywords**: Main ranking keywords for your product
- **Long Tail Keywords**: Specific, lower competition phrases
- **Brand Keywords**: Brand-related search terms
- **Category Keywords**: Category-specific terms
- **Buyer Intent Keywords**: Purchase-ready search terms
- **Seasonal Keywords**: Time-sensitive keywords

### 2. Competitor Intelligence

- **Top Competitors**: Find similar products in your niche
- **Competitor Keyword Analysis**: Extract exact keywords competitors use to rank
- **High-Converting Keywords**: Identify keywords from top-performing products
- **Long-Tail Opportunities**: Discover untapped keyword phrases
- **Keyword Gaps**: Find keywords competitors miss that you can exploit
- **Competitive Position**: Understand your strengths and weaknesses
- **Pricing Strategy**: Get pricing recommendations
- **Market Opportunities**: Discover gaps in the market

### 3. Advertising Keywords

- **Exact Match**: Precise targeting keywords
- **Phrase Match**: Broader phrase targeting
- **Broad Match**: Wide reach keywords
- **Negative Keywords**: Terms to exclude
- **Bid Recommendations**: Suggested bidding strategy

### 4. Sales Improvement Strategy

- **Immediate Actions**: Quick wins (1-2 weeks)
- **Short Term Strategy**: Medium-term goals (1-3 months)
- **Long Term Strategy**: Growth planning (3-6 months)
- **Listing Optimization**: Title, bullets, description improvements

## 🛠️ Installation

### Prerequisites

- Node.js (v16 or higher)
- OpenAI API key

### Setup Steps

1. **Clone or download the project**

   ```bash
   cd data-key
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   - Copy `env.example` to `.env`
   - Add your OpenAI API key:

   ```
   OPENAI_API_KEY=your_actual_openai_api_key_here
   PORT=3001
   ```

4. **Start the server**

   ```bash
   # Development mode (with auto-reload)
   npm run dev

   # Production mode
   npm start
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3001`
   - Enter an Amazon product URL and start analyzing!

## 🔧 API Endpoints

### Main Analysis Endpoint

```
POST /api/analyze-product
Body: { "amazonUrl": "https://amazon.com/dp/XXXXXXXXXX" }
```

### Advanced Sales Diagnostic Endpoint (NEW!)

```
POST /api/diagnose-sales-problems
Body: { "amazonUrl": "https://amazon.com/dp/XXXXXXXXXX" }
```

### Quick Keyword Analysis

```
POST /api/quick-keywords
Body: {
  "productTitle": "Product Name",
  "category": "Electronics",
  "description": "Product description",
  "price": "$29.99"
}
```

### Competitor Search

```
POST /api/competitor-search
Body: {
  "searchQuery": "wireless headphones",
  "maxResults": 10
}
```

### Generate Ad Keywords

```
POST /api/generate-ad-keywords
Body: {
  "productData": {...},
  "keywordAnalysis": {...}
}
```

## 📊 How to Use

### Basic Analysis

1. **Enter Amazon URL**: Paste any Amazon product URL
2. **Click "Basic Analysis"**: Get comprehensive keyword and competitor insights
3. **Review Results**: Explore the different tabs:
   - **Overview**: Product information and summary
   - **Keywords**: Comprehensive keyword analysis
   - **Competitors**: Competitor products and analysis
   - **Ad Keywords**: PPC advertising keywords
   - **Strategy**: Sales improvement recommendations

### Advanced Sales Diagnostic (For Products Not Selling)

1. **Enter Amazon URL**: Paste your underperforming product URL
2. **Click "Why No Sales?"**: Get deep diagnostic analysis
3. **Review Critical Issues**: Focus on the new tabs:
   - **Sales Problems**: Critical mistakes killing your sales
   - **Optimization**: Specific listing improvements needed
   - **Overview**: Your product vs. top performers comparison

### Which Analysis to Choose?

- **Use Basic Analysis** for: Existing products, market research, general optimization
- **Use Sales Diagnostic** for: Products with low/no sales, conversion problems, ranking issues
- **Use New Product Optimizer** for: Launching new products, creating SEO-friendly listings, competitive positioning

## 🎯 Use Cases

### For New Products

- Find the best keywords to target for ranking
- Understand your competitive landscape
- Get pricing strategy recommendations
- Plan your launch campaign

### For Existing Products

- Discover new keyword opportunities
- Analyze why competitors are outranking you
- Optimize your listing for better performance
- Plan advertising campaigns

### For Market Research

- Understand market demand and competition
- Find profitable niches
- Analyze pricing strategies
- Identify market gaps

## 🔍 Example Analysis Output

The tool provides comprehensive analysis including:

```json
{
  "keywordAnalysis": {
    "primaryKeywords": ["wireless headphones", "bluetooth earbuds"],
    "longTailKeywords": ["noise cancelling wireless headphones for gym"],
    "rankingStrategy": {
      "immediate": ["bluetooth headphones", "wireless earbuds"],
      "shortTerm": ["noise cancelling headphones"],
      "longTerm": ["premium wireless headphones"]
    }
  },
  "competitorAnalysis": {
    "competitivePosition": {
      "strengths": ["Better price point", "Higher rating"],
      "weaknesses": ["Fewer reviews", "Limited color options"],
      "opportunities": ["Target fitness market", "Emphasize battery life"]
    }
  },
  "adKeywords": {
    "exactMatch": {
      "high_priority": ["bluetooth headphones", "wireless earbuds"]
    }
  },
  "salesStrategy": {
    "immediateActions": [
      {
        "action": "Optimize main product image",
        "impact": "15-25% increase in conversion rate",
        "timeframe": "1-2 weeks"
      }
    ]
  }
}
```

## 🚨 Important Notes

- **Rate Limits**: Amazon may block requests if you analyze too many products quickly
- **OpenAI Costs**: Each analysis uses OpenAI API credits (typically $0.10-0.50 per analysis)
- **Accuracy**: Results are AI-generated suggestions, not guarantees
- **Compliance**: Use responsibly and follow Amazon's terms of service

## 🛡️ Error Handling

The tool includes comprehensive error handling for:

- Invalid Amazon URLs
- Network timeouts
- OpenAI API errors
- Scraping failures

## 📈 Performance Tips

1. **Use specific product URLs**: Direct product page URLs work best
2. **Avoid restricted products**: Some categories may be harder to scrape
3. **Monitor API usage**: Keep track of your OpenAI API costs
4. **Cache results**: Save analysis results for future reference

## 🔧 Troubleshooting

### Common Issues

1. **"OpenAI API key not configured"**

   - Make sure you've added your API key to the `.env` file
   - Restart the server after adding the key

2. **"Failed to scrape product data"**

   - Check if the Amazon URL is valid and accessible
   - Some products may have anti-scraping protection

3. **Analysis takes too long**

   - This is normal for the first analysis (1-2 minutes)
   - Complex products with many competitors take longer

4. **"Analysis failed" errors**
   - Check your internet connection
   - Verify your OpenAI API key has sufficient credits
   - Try with a different product URL

## 📝 License

MIT License - feel free to modify and use for your business needs.

## 🤝 Support

For issues or questions:

1. Check the troubleshooting section above
2. Review the error messages in the browser console
3. Ensure all dependencies are properly installed

---

**Happy selling! 🎉**

Transform your Amazon FBA business with AI-powered keyword research and competitive intelligence.
