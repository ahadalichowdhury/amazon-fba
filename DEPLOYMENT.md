# 🚀 Deployment Guide - Amazon FBA Keyword Research Tool

## Project Structure

```
data-key/
├── server.js                    # Backend (Node.js/Express)
├── vercel.json                  # Backend Vercel config
├── package.json                 # Backend dependencies
├── services/                    # Backend services
├── amazon-fba-frontend/         # Frontend (Next.js)
│   ├── src/                     # Frontend source
│   ├── package.json             # Frontend dependencies
│   └── next.config.js           # Next.js config
└── .gitignore                   # Monorepo gitignore
```

## 📋 Pre-Deployment Checklist

### 1. Environment Variables Setup

**Backend (.env):**

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
MAX_FILE_SIZE=10485760
ENABLE_TRANSLATION=true
```

**Frontend (.env.local):**

```env
NEXT_PUBLIC_API_URL=https://your-backend-app.vercel.app
```

### 2. Push to GitHub

```bash
git add .
git commit -m "feat: Amazon FBA Keyword Research Tool - Ready for deployment"
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main
```

## 🌐 Vercel Deployment Steps

### Step 1: Deploy Backend (Node.js API)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. **Configure Backend Project:**

   - **Project Name**: `amazon-fba-backend` (or your choice)
   - **Framework Preset**: Other
   - **Root Directory**: `.` (root directory)
   - **Build Command**: `npm install`
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

5. **Add Environment Variables:**

   - `OPENAI_API_KEY`: Your OpenAI API key
   - `NODE_ENV`: `production`
   - `PORT`: `3001`

6. Click **Deploy**

7. **Copy the deployment URL** (e.g., `https://amazon-fba-backend.vercel.app`)

### Step 2: Deploy Frontend (Next.js)

1. Create **another new project** in Vercel
2. Import the **same GitHub repository**
3. **Configure Frontend Project:**

   - **Project Name**: `amazon-fba-frontend` (or your choice)
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `amazon-fba-frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (auto-detected)

4. **Add Environment Variables:**

   - `NEXT_PUBLIC_API_URL`: Your backend URL from Step 1

5. Click **Deploy**

### Step 3: Update API Configuration

After backend deployment, update the frontend API configuration:

1. Edit `amazon-fba-frontend/src/lib/api.ts`
2. Replace `'https://your-backend-app.vercel.app'` with your actual backend URL
3. Commit and push the changes
4. Vercel will auto-redeploy the frontend

## 🔧 Configuration Files Explained

### vercel.json (Backend)

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  },
  "functions": {
    "server.js": {
      "maxDuration": 30
    }
  }
}
```

## 🎯 Final URLs

After successful deployment:

- **Frontend**: `https://your-frontend-app.vercel.app`
- **Backend**: `https://your-backend-app.vercel.app`

## 🔍 Testing Deployment

1. Visit your frontend URL
2. Test all three analysis modes:
   - Basic Product Analysis
   - Sales Diagnostic
   - Launch Optimizer
3. Check browser console for any API connection errors

## 🛠️ Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure backend CORS is configured for your frontend domain
2. **API Connection Failed**: Verify `NEXT_PUBLIC_API_URL` environment variable
3. **OpenAI Errors**: Check `OPENAI_API_KEY` in backend environment variables
4. **Build Failures**: Check package.json dependencies and Node.js version compatibility

### Environment Variables Check:

```bash
# Backend should have:
OPENAI_API_KEY=sk-...
NODE_ENV=production

# Frontend should have:
NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app
```

## 🚀 Success!

Your Amazon FBA Keyword Research Tool is now live and ready to help sellers optimize their listings!

**Features Available:**

- ✅ Product URL Analysis
- ✅ Keyword Research & Optimization
- ✅ Competitor Analysis
- ✅ Sales Problem Diagnosis
- ✅ New Product Launch Optimization
- ✅ SEO-Optimized Listing Generation
