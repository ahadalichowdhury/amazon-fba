import puppeteer from 'puppeteer';
import puppeteerCore from 'puppeteer-core';

export class AmazonScraper {
    constructor(options = {}) {
        this.browser = null;
        this.page = null;
        this.debug = options.debug || false;
        this.headless = options.headless !== false; // Default to headless unless explicitly set to false
    }

    async initialize() {
        // Vercel-compatible Puppeteer configuration
        const isProduction = process.env.NODE_ENV === 'production';
        
        let launchOptions = {
            headless: this.headless ? 'new' : false,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--single-process',
                '--disable-gpu',
                '--disable-web-security',
                '--disable-features=VizDisplayCompositor',
                '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            ]
        };

        // Use @sparticuz/chromium for production (Vercel)
        if (isProduction) {
            try {
                const chromium = await import('@sparticuz/chromium');
                launchOptions.executablePath = await chromium.default.executablePath();
                launchOptions.args = chromium.default.args.concat(launchOptions.args);
                
                // Use puppeteer-core for production
                this.browser = await puppeteerCore.launch(launchOptions);
            } catch (error) {
                console.log('Chromium not available, using default puppeteer:', error.message);
                this.browser = await puppeteer.launch(launchOptions);
            }
        } else {
            this.browser = await puppeteer.launch(launchOptions);
        }
        this.page = await this.browser.newPage();
        
        // Enhanced anti-detection measures
        await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
        
        // Set viewport to common resolution
        await this.page.setViewport({ width: 1920, height: 1080 });
        
        // Set additional headers
        await this.page.setExtraHTTPHeaders({
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
        });

        // Override navigator properties to avoid detection
        await this.page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, 'webdriver', {
                get: () => undefined,
            });
            Object.defineProperty(navigator, 'plugins', {
                get: () => [1, 2, 3, 4, 5],
            });
            Object.defineProperty(navigator, 'languages', {
                get: () => ['en-US', 'en'],
            });
        });
    }

    async scrapeProductData(amazonUrl) {
        try {
            if (!this.browser) {
                await this.initialize();
            }

            console.log(`Scraping product data from: ${amazonUrl}`);
            
            // Navigate to the product page
            await this.page.goto(amazonUrl, { 
                waitUntil: 'networkidle2',
                timeout: 30000 
            });

            // Wait for the main content to load
            await this.page.waitForSelector('#productTitle', { timeout: 10000 });

            // Extract product data
            const productData = await this.page.evaluate(() => {
                const getTextContent = (selector) => {
                    const element = document.querySelector(selector);
                    return element ? element.textContent.trim() : '';
                };

                const getMultipleTextContent = (selector) => {
                    const elements = document.querySelectorAll(selector);
                    return Array.from(elements).map(el => el.textContent.trim()).filter(text => text);
                };

                return {
                    title: getTextContent('#productTitle'),
                    price: getTextContent('.a-price-whole') || getTextContent('.a-offscreen'),
                    rating: getTextContent('.a-icon-alt'),
                    reviewCount: getTextContent('[data-hook="total-review-count"]'),
                    availability: getTextContent('#availability span'),
                    brand: getTextContent('#bylineInfo'),
                    category: getTextContent('#wayfinding-breadcrumbs_feature_div'),
                    bulletPoints: getMultipleTextContent('#feature-bullets ul span'),
                    description: getTextContent('#productDescription p') || getTextContent('#aplus_feature_div'),
                    images: Array.from(document.querySelectorAll('#altImages img')).map(img => img.src),
                    variants: getMultipleTextContent('#variation_style_name .selection'),
                    specifications: Array.from(document.querySelectorAll('#productDetails_techSpec_section_1 tr')).map(row => {
                        const cells = row.querySelectorAll('td');
                        return cells.length >= 2 ? {
                            key: cells[0].textContent.trim(),
                            value: cells[1].textContent.trim()
                        } : null;
                    }).filter(spec => spec),
                    asin: window.location.pathname.match(/\/dp\/([A-Z0-9]{10})/)?.[1] || ''
                };
            });

            // Get related products/competitors
            const relatedProducts = await this.scrapeRelatedProducts();

            return {
                ...productData,
                relatedProducts,
                scrapedAt: new Date().toISOString(),
                url: amazonUrl
            };

        } catch (error) {
            console.error('Error scraping product data:', error);
            throw new Error(`Failed to scrape product data: ${error.message}`);
        }
    }

    async scrapeRelatedProducts() {
        try {
            const relatedProducts = await this.page.evaluate(() => {
                const products = [];
                
                // Try different selectors for related products
                const selectors = [
                    '[data-component-type="s-search-result"]',
                    '.s-result-item',
                    '[cel_widget_id*="MAIN-SEARCH_RESULTS"]'
                ];

                for (const selector of selectors) {
                    const elements = document.querySelectorAll(selector);
                    if (elements.length > 0) {
                        Array.from(elements).slice(0, 10).forEach(element => {
                            const titleEl = element.querySelector('h2 a span') || element.querySelector('.s-size-mini span');
                            const priceEl = element.querySelector('.a-price-whole') || element.querySelector('.a-offscreen');
                            const ratingEl = element.querySelector('.a-icon-alt');
                            const linkEl = element.querySelector('h2 a');

                            if (titleEl && titleEl.textContent.trim()) {
                                products.push({
                                    title: titleEl.textContent.trim(),
                                    price: priceEl ? priceEl.textContent.trim() : '',
                                    rating: ratingEl ? ratingEl.textContent.trim() : '',
                                    link: linkEl ? linkEl.href : ''
                                });
                            }
                        });
                        break; // If we found products with one selector, don't try others
                    }
                }

                return products;
            });

            return relatedProducts;
        } catch (error) {
            console.error('Error scraping related products:', error);
            return [];
        }
    }

    async searchCompetitors(searchQuery, maxResults = 10) {
        try {
            if (!this.browser) {
                await this.initialize();
            }

            const searchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(searchQuery)}&ref=sr_pg_1`;
            console.log(`Searching Amazon for: "${searchQuery}" at ${searchUrl}`);
            
            // Add random delay to seem more human
            await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000));
            
            await this.page.goto(searchUrl, { 
                waitUntil: 'networkidle2',
                timeout: 30000 
            });

            // Wait for search results to load
            try {
                await this.page.waitForSelector('[data-component-type="s-search-result"], .s-result-item, [data-cy="title-recipe-title"]', { timeout: 10000 });
            } catch (waitError) {
                console.log('Search results selector not found, trying alternative approach...');
            }

            // Take a screenshot for debugging (optional)
            // await this.page.screenshot({ path: `debug-search-${Date.now()}.png` });

            const competitors = await this.page.evaluate((maxResults) => {
                const products = [];
                console.log('Starting product extraction...');

                // Multiple selector strategies for different Amazon layouts
                const selectorStrategies = [
                    // Strategy 1: Standard search results
                    {
                        container: '[data-component-type="s-search-result"]',
                        title: 'h2 a span, h2 span, .a-size-base-plus, .a-size-medium',
                        price: '.a-price .a-offscreen, .a-price-whole, .a-price-symbol, .a-price-range',
                        rating: '.a-icon-alt, .a-star-5 .a-icon-alt',
                        reviewCount: '.a-size-base, .a-link-normal',
                        link: 'h2 a, .a-link-normal',
                        image: '.s-image, img'
                    },
                    // Strategy 2: Alternative layout
                    {
                        container: '.s-result-item',
                        title: 'h2 a span, .s-size-mini span, .a-size-base-plus',
                        price: '.a-price-whole, .a-price .a-offscreen',
                        rating: '.a-icon-alt',
                        reviewCount: '.a-size-base',
                        link: 'h2 a, .a-link-normal',
                        image: '.s-image, img'
                    },
                    // Strategy 3: New Amazon layout
                    {
                        container: '[data-cy="title-recipe-title"], .puisg-row',
                        title: '[data-cy="title-recipe-title"] span, h2 span, .a-size-base-plus',
                        price: '.a-price-whole, .a-price .a-offscreen',
                        rating: '.a-icon-alt',
                        reviewCount: '.a-size-base, .a-link-normal span',
                        link: 'h2 a, .a-link-normal',
                        image: '.s-image, img'
                    }
                ];

                for (const strategy of selectorStrategies) {
                    const containers = document.querySelectorAll(strategy.container);
                    console.log(`Strategy: ${strategy.container} - Found ${containers.length} containers`);

                    if (containers.length > 0) {
                        Array.from(containers).slice(0, maxResults).forEach((element, index) => {
                            try {
                                // Helper function to try multiple selectors
                                const findElement = (selectors) => {
                                    const selectorList = selectors.split(', ');
                                    for (const selector of selectorList) {
                                        const el = element.querySelector(selector.trim());
                                        if (el) return el;
                                    }
                                    return null;
                                };

                                const titleEl = findElement(strategy.title);
                                const priceEl = findElement(strategy.price);
                                const ratingEl = findElement(strategy.rating);
                                const reviewCountEl = findElement(strategy.reviewCount);
                                const linkEl = findElement(strategy.link);
                                const imageEl = findElement(strategy.image);

                                if (titleEl && titleEl.textContent.trim()) {
                                    const title = titleEl.textContent.trim();
                                    const price = priceEl ? priceEl.textContent.trim() : '';
                                    const rating = ratingEl ? ratingEl.textContent.trim() : '';
                                    const reviewCount = reviewCountEl ? reviewCountEl.textContent.trim() : '';
                                    const link = linkEl ? linkEl.getAttribute('href') : '';
                                    const image = imageEl ? imageEl.src || imageEl.getAttribute('data-src') : '';

                                    // Extract ASIN from link - try multiple patterns
                                    let asin = '';
                                    if (link) {
                                        const asinMatch = link.match(/\/dp\/([A-Z0-9]{10})/) || 
                                                         link.match(/\/gp\/product\/([A-Z0-9]{10})/) ||
                                                         link.match(/asin=([A-Z0-9]{10})/);
                                        asin = asinMatch ? asinMatch[1] : '';
                                    }

                                    // Clean up rating text (remove "out of 5 stars" etc.)
                                    const cleanRating = rating.match(/(\d+\.?\d*)/)?.[1] || '';
                                    
                                    // Clean up review count (extract numbers only)
                                    const cleanReviewCount = reviewCount.match(/([\d,]+)/)?.[1] || '';

                                    const product = {
                                        title: title,
                                        price: price,
                                        rating: cleanRating,
                                        reviewCount: cleanReviewCount,
                                        link: link.startsWith('http') ? link : `https://amazon.com${link}`,
                                        image: image,
                                        asin: asin
                                    };

                                    products.push(product);
                                    console.log(`Product ${index + 1}: ${title.substring(0, 50)}...`);
                                }
                            } catch (elementError) {
                                console.error(`Error processing element ${index}:`, elementError);
                            }
                        });

                        if (products.length > 0) {
                            console.log(`Successfully extracted ${products.length} products using strategy: ${strategy.container}`);
                            break; // Stop trying other strategies if we found products
                        }
                    }
                }

                console.log(`Total products found: ${products.length}`);
                return products;
            }, maxResults);

            console.log(`Scraped ${competitors.length} competitors for query: "${searchQuery}"`);
            
            // Log first few results for debugging
            if (competitors.length > 0) {
                console.log('Sample results:');
                competitors.slice(0, 3).forEach((comp, i) => {
                    console.log(`${i + 1}. ${comp.title.substring(0, 60)}... - ${comp.price} - ${comp.rating}⭐ (${comp.reviewCount} reviews)`);
                });
            } else {
                console.log('No competitors found - this might indicate scraping issues or no results for the query');
            }

            return competitors;
        } catch (error) {
            console.error('Error searching competitors:', error);
            return [];
        }
    }

    async testSearch(searchQuery = "water dispenser pump") {
        try {
            console.log(`\n🧪 Testing Amazon search for: "${searchQuery}"`);
            
            if (!this.browser) {
                await this.initialize();
            }

            const searchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(searchQuery)}`;
            console.log(`📍 Navigating to: ${searchUrl}`);
            
            await this.page.goto(searchUrl, { 
                waitUntil: 'networkidle2',
                timeout: 30000 
            });

            // Take screenshot for debugging
            if (this.debug) {
                await this.page.screenshot({ path: `debug-test-${Date.now()}.png`, fullPage: true });
                console.log('📸 Screenshot saved for debugging');
            }

            // Check what's on the page
            const pageInfo = await this.page.evaluate(() => {
                return {
                    title: document.title,
                    url: window.location.href,
                    hasSearchResults: !!document.querySelector('[data-component-type="s-search-result"]'),
                    hasAlternativeResults: !!document.querySelector('.s-result-item'),
                    hasNewLayout: !!document.querySelector('[data-cy="title-recipe-title"]'),
                    totalElements: document.querySelectorAll('*').length,
                    bodyText: document.body.textContent.substring(0, 500)
                };
            });

            console.log('📄 Page Info:', pageInfo);

            // Try to find products
            const products = await this.searchCompetitors(searchQuery, 5);
            
            console.log(`✅ Test completed. Found ${products.length} products.`);
            
            if (products.length > 0) {
                console.log('\n📦 Sample products:');
                products.forEach((product, i) => {
                    console.log(`${i + 1}. ${product.title}`);
                    console.log(`   Price: ${product.price} | Rating: ${product.rating} | Reviews: ${product.reviewCount}`);
                });
            } else {
                console.log('❌ No products found. This indicates a scraping issue.');
                
                // Additional debugging
                const debugInfo = await this.page.evaluate(() => {
                    const selectors = [
                        '[data-component-type="s-search-result"]',
                        '.s-result-item',
                        '[data-cy="title-recipe-title"]',
                        '.puisg-row',
                        'h2',
                        '.a-size-base-plus'
                    ];
                    
                    const results = {};
                    selectors.forEach(selector => {
                        const elements = document.querySelectorAll(selector);
                        results[selector] = elements.length;
                    });
                    
                    return results;
                });
                
                console.log('🔍 Debug - Element counts:', debugInfo);
            }

            return products;
        } catch (error) {
            console.error('❌ Test failed:', error);
            return [];
        }
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
            this.page = null;
        }
    }
}
