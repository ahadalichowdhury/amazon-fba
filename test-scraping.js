#!/usr/bin/env node

import { AmazonScraper } from './services/amazonScraper.js';

async function testScraping() {
    console.log('🚀 Starting Amazon Scraping Test\n');
    
    // Create scraper with debug mode and visible browser
    const scraper = new AmazonScraper({ 
        debug: true, 
        headless: false // This will show the browser so you can see what's happening
    });
    
    try {
        // Test different search queries
        const testQueries = [
            'water dispenser pump',
            'manual water pump',
            'Home & Kitchen',
            'water bottle pump'
        ];
        
        for (const query of testQueries) {
            console.log(`\n${'='.repeat(50)}`);
            console.log(`🔍 Testing query: "${query}"`);
            console.log(`${'='.repeat(50)}`);
            
            const results = await scraper.testSearch(query);
            
            if (results.length > 0) {
                console.log(`✅ SUCCESS: Found ${results.length} products`);
                console.log('\n📦 Sample results:');
                results.slice(0, 3).forEach((product, i) => {
                    console.log(`\n${i + 1}. ${product.title}`);
                    console.log(`   💰 Price: ${product.price}`);
                    console.log(`   ⭐ Rating: ${product.rating}`);
                    console.log(`   📝 Reviews: ${product.reviewCount}`);
                    console.log(`   🔗 ASIN: ${product.asin}`);
                });
                
                // If we found results, we can stop testing
                console.log('\n🎉 Scraping is working! The issue might be with specific search terms.');
                break;
            } else {
                console.log(`❌ No results found for "${query}"`);
            }
        }
        
    } catch (error) {
        console.error('❌ Test failed:', error);
    } finally {
        await scraper.close();
        console.log('\n🏁 Test completed. Browser closed.');
    }
}

// Run the test
testScraping().catch(console.error);
