# Netlify Deployment Guide

## Quick Fix for "Could not connect to server" Error

### Problem
The frontend on Netlify cannot connect to the backend on Render because:
1. Environment variables not set in Netlify
2. CORS not configured for Netlify domain

### Solution

#### Step 1: Set Netlify Environment Variables
1. Go to Netlify Dashboard → Your Site → **Site settings** → **Environment variables**
2. Add this variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-name.onrender.com
   ```
3. Click **Save**
4. Trigger a new deploy: **Deploys** → **Trigger deploy** → **Deploy site**

#### Step 2: Update Backend CORS (Already Done)
The backend `index.js` has been updated to allow Netlify domains automatically.

#### Step 3: Verify Backend URL
Make sure your Render backend URL is correct:
- Go to Render Dashboard → Your backend service
- Copy the URL (e.g., `https://confirmscholarship-backend.onrender.com`)
- Use this exact URL in Netlify environment variables

#### Step 4: Test
After redeployment:
1. Visit your Netlify site
2. Go to `/admin/login`
3. Try logging in with:
   - Username: `admin`
   - Password: `admin123`

---

## Full Netlify Deployment Steps

### Prerequisites
- Backend deployed on Render
- GitHub repository
- Netlify account

### Deploy to Netlify

1. **Connect Repository**
   - Netlify Dashboard → **Add new site** → **Import an existing project**
   - Connect to GitHub
   - Select your repository

2. **Configure Build Settings**
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/.next`
   - **Functions directory**: (leave empty)

3. **Environment Variables**
   Add in **Site settings** → **Environment variables**:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
   NODE_ENV=production
   ```

4. **Deploy**
   - Click **Deploy site**
   - Wait for build to complete (~2-3 minutes)

### Post-Deployment

#### Update Next.js Config
Ensure `next.config.ts` includes Netlify-friendly settings:
```typescript
const nextConfig: NextConfig = {
  output: 'standalone', // Optional: for better performance
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.onrender.com',
        pathname: '/uploads/**',
      },
      // ... other patterns
    ],
  },
};
```

#### Custom Domain (Optional)
1. Netlify Dashboard → **Domain settings**
2. Add custom domain
3. Follow DNS configuration steps

---

## Troubleshooting

### Build Fails
**Error**: `Module not found` or `Cannot find module`
**Solution**: 
```bash
# Locally test the build
cd frontend
rm -rf .next node_modules
npm install
npm run build
```

### Images Not Loading
**Error**: Images return 403 or don't load
**Solution**: 
1. Check `next.config.ts` has correct `remotePatterns`
2. Verify backend CORS allows Netlify domain
3. Check backend `/uploads` route is accessible

### API Calls Fail
**Error**: Network errors or CORS errors
**Solution**:
1. Check environment variable in Netlify: `NEXT_PUBLIC_API_URL`
2. Verify backend is running on Render
3. Check browser console for exact error
4. Ensure backend CORS includes `*.netlify.app`

### Admin Login Fails
**Error**: "Could not connect to the server"
**Solution**:
1. Verify `NEXT_PUBLIC_API_URL` is set correctly
2. Check backend health: `curl https://your-backend.onrender.com/health`
3. Clear browser cache and localStorage
4. Check Network tab in DevTools for actual error

---

## Performance Optimization

### Enable Netlify Edge Functions (Optional)
For even faster response times, consider using Netlify Edge Functions for API routes.

### Configure Caching
Netlify automatically caches static assets. For dynamic content:
1. **Site settings** → **Build & deploy** → **Post processing**
2. Enable **Asset optimization**
3. Enable **Pretty URLs**

---

## Monitoring

### Netlify Analytics
- **Site settings** → **Analytics**
- View traffic, performance, and errors

### Deploy Notifications
- **Site settings** → **Build & deploy** → **Deploy notifications**
- Set up Slack/Email notifications for failed builds

---

## Cost
- **Free tier**: 100GB bandwidth, 300 build minutes/month
- **Pro tier**: $19/month for unlimited builds and more bandwidth

---

## Migration Checklist
- [x] Backend deployed on Render
- [x] Frontend code updated with centralized API
- [x] CORS configured for Netlify
- [ ] Environment variables set in Netlify
- [ ] Site deployed and tested
- [ ] Admin login working
- [ ] All features tested
