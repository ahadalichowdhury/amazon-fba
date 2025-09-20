#!/usr/bin/env node

import fs from 'fs';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🚀 Amazon FBA Keyword Research Tool Setup\n');

// Check if .env file exists
if (!fs.existsSync('.env')) {
    console.log('Creating .env file...');
    
    rl.question('Enter your OpenAI API key: ', (apiKey) => {
        if (!apiKey.trim()) {
            console.log('❌ OpenAI API key is required!');
            console.log('Get your API key from: https://platform.openai.com/api-keys');
            process.exit(1);
        }

        const envContent = `# OpenAI Configuration (Required)
OPENAI_API_KEY=${apiKey.trim()}

# Server Configuration
PORT=3001

# Upload Configuration
MAX_FILE_SIZE=10485760

# Translation Configuration (Uses free translation service)
ENABLE_TRANSLATION=true
`;

        fs.writeFileSync('.env', envContent);
        console.log('✅ .env file created successfully!');
        console.log('\n🎉 Setup complete! You can now run:');
        console.log('   npm run dev');
        console.log('\n🌐 Then open: http://localhost:3001');
        
        rl.close();
    });
} else {
    console.log('✅ .env file already exists');
    console.log('\n🎉 Setup complete! You can now run:');
    console.log('   npm run dev');
    console.log('\n🌐 Then open: http://localhost:3001');
    rl.close();
}
