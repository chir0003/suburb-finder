# CI/CD Setup Guide for Suburb Finder

This guide explains how to set up and use the CI/CD pipeline for your full-stack Suburb Finder application.

## 🏗️ Pipeline Overview

Your CI/CD pipeline includes:

### **Workflows Created:**
1. **`ci-cd.yml`** - Full pipeline for main branch deployments
2. **`pr-check.yml`** - Quick checks for pull requests

### **What Each Pipeline Does:**

#### **Full CI/CD Pipeline** (`ci-cd.yml`)
- **Triggers**: Push to `main`/`develop` branches, PRs to `main`
- **Frontend Job**:
  - Installs dependencies
  - Runs React tests with coverage
  - Builds production bundle
  - Uploads build artifacts
- **Backend Job**:
  - Sets up MongoDB test database
  - Installs dependencies
  - Runs tests (when implemented)
  - Performs health checks
- **Deploy Job**:
  - Only runs on `main` branch pushes
  - Downloads build artifacts
  - Ready for deployment to your hosting platform

#### **PR Checks** (`pr-check.yml`)
- **Triggers**: Pull requests
- **Purpose**: Fast feedback for code reviews
- **Actions**: Linting, testing, syntax checks, security audits

## 🚀 Setup Instructions

### 1. GitHub Repository Setup

```bash
# If not already done, initialize git and push to GitHub
git add .
git commit -m "Add CI/CD pipeline"
git push origin main
```

### 2. Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `OPENAI_API_KEY` | Your OpenAI API key | `sk-...` |
| `MONGODB_URI` | Production MongoDB URI | `mongodb+srv://...` |

### 3. Branch Protection (Recommended)

1. Go to Settings → Branches
2. Add rule for `main` branch:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date

## 📋 How to Use

### **For Development:**
1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and push: `git push origin feature/your-feature`
3. Create PR → Automatic checks run (`pr-check.yml`)
4. Merge PR → Full pipeline runs (`ci-cd.yml`)

### **Pipeline Status:**
- ✅ Green: All checks passed
- ❌ Red: Tests failed or build broke
- 🟡 Yellow: Pipeline running

## 🔧 Customization

### **Add Backend Tests:**
Update `smart-suburb-finder/backend/package.json`:
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

### **Add Health Check Endpoint:**
Add to your `server.js`:
```javascript
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString() 
  });
});
```

### **Configure Deployment:**
Replace the deployment section in `ci-cd.yml` with your hosting platform:

**For Vercel (Frontend):**
```yaml
- name: Deploy to Vercel
  uses: amondnet/vercel-action@v25
  with:
    vercel-token: ${{ secrets.VERCEL_TOKEN }}
    vercel-org-id: ${{ secrets.ORG_ID }}
    vercel-project-id: ${{ secrets.PROJECT_ID }}
```

**For Heroku (Backend):**
```yaml
- name: Deploy to Heroku
  uses: akhileshns/heroku-deploy@v3.12.12
  with:
    heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
    heroku_app_name: "your-app-name"
    heroku_email: "your-email@example.com"
```

## 🐛 Troubleshooting

### **Common Issues:**

1. **Tests failing?**
   - Check test files in `frontend/src`
   - Ensure all dependencies are in `package.json`

2. **Build failing?**
   - Check for TypeScript errors
   - Verify environment variables

3. **Deploy failing?**
   - Check if secrets are configured
   - Verify deployment commands

### **Debug Pipeline:**
1. Go to Actions tab in GitHub
2. Click on failed workflow
3. Expand failing step to see logs

## 📊 Pipeline Benefits

- **Automatic Testing**: Catches bugs before they reach production
- **Code Quality**: Enforces standards through linting
- **Fast Feedback**: Developers know immediately if changes break anything
- **Deployment Safety**: Only tested code reaches production
- **Collaboration**: Team members can review code with confidence

## 🔄 Next Steps

1. **Add more tests** to both frontend and backend
2. **Configure deployment** to your hosting platform
3. **Add code coverage** reporting
4. **Set up staging environment** for testing
5. **Add performance testing** for the API

Your CI/CD pipeline is now ready! 🎉 