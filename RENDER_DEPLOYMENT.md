# ConfirmScholarship - Render.com Deployment Guide

## Overview
This guide helps you deploy ConfirmScholarship to Render.com for production testing before VPS deployment.

## Prerequisites
- Render.com account (free tier available)
- MongoDB Atlas account (for database)
- GitHub repository with your code

---

## Step 1: Prepare MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist all IPs: `0.0.0.0/0` (for Render access)
5. Get your connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/confirmscholarship?retryWrites=true&w=majority
   ```

---

## Step 2: Backend Deployment

### Create Web Service
1. Go to Render Dashboard → **New** → **Web Service**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `confirmscholarship-backend`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Instance Type**: Free

### Environment Variables
Add these in the Environment tab:
```
PORT=5005
MONGO_URI=<your-mongodb-atlas-connection-string>
JWT_SECRET=<generate-a-strong-secret>
NODE_ENV=production
```

### Important Notes
- Copy the backend URL (e.g., `https://confirmscholarship-backend.onrender.com`)
- Free tier services sleep after 15 minutes of inactivity
- First request after sleep takes ~30 seconds to wake up

---

## Step 3: Frontend Deployment

### Update Environment Variables
Before deploying, update `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=https://confirmscholarship-backend.onrender.com
```

### Create Web Service
1. Render Dashboard → **New** → **Web Service**
2. Connect same GitHub repository
3. Configure:
   - **Name**: `confirmscholarship-frontend`
   - **Region**: Same as backend
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### Environment Variables
Add in Environment tab:
```
NEXT_PUBLIC_API_URL=https://confirmscholarship-backend.onrender.com
NODE_ENV=production
```

---

## Step 4: Update Next.js Config for Production

Update `frontend/next.config.ts` to allow Render backend images:

```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Local development
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '5005',
        pathname: '/uploads/**',
      },
      // Render production
      {
        protocol: 'https',
        hostname: 'confirmscholarship-backend.onrender.com',
        pathname: '/uploads/**',
      },
      // Unsplash
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      }
    ],
    // ... rest of config
  }
};
```

---

## Step 5: Testing Checklist

### Backend Health Check
```bash
curl https://confirmscholarship-backend.onrender.com/health
```
Expected response:
```json
{
  "status": "OK",
  "timestamp": "2026-01-20T...",
  "db": "connected"
}
```

### Frontend Access
1. Visit: `https://confirmscholarship-frontend.onrender.com`
2. Check page source (View → Developer → View Source)
3. Verify HTML is pre-rendered (should see blog titles, not loading states)

### Full Feature Test
- [ ] Homepage loads with SSR
- [ ] Blog list page shows published blogs
- [ ] Single blog page loads correctly
- [ ] Images load from backend (`/uploads/`)
- [ ] Admin login works
- [ ] Blog publishing works
- [ ] Image upload works
- [ ] Comments submission works

### Performance Test
1. Run Lighthouse audit (Chrome DevTools)
2. Target scores:
   - Performance: 85+
   - Accessibility: 90+
   - Best Practices: 90+
   - SEO: 95+

---

## Step 6: Monitoring & Logs

### View Logs
- Render Dashboard → Select service → **Logs** tab
- Real-time log streaming
- Search and filter capabilities

### Monitor Performance
- Render Dashboard → Service → **Metrics** tab
- CPU usage
- Memory usage
- Request count

---

## Common Issues & Solutions

### Issue: Backend returns 503
**Cause**: Service is sleeping (free tier)
**Solution**: Wait 30 seconds for wake-up, or upgrade to paid tier

### Issue: Images not loading
**Cause**: CORS or Next.js image config
**Solution**: 
1. Check backend CORS allows frontend domain
2. Verify `next.config.ts` includes Render backend hostname

### Issue: Database connection failed
**Cause**: MongoDB Atlas IP whitelist
**Solution**: Ensure `0.0.0.0/0` is whitelisted in Atlas

### Issue: Build fails
**Cause**: Missing dependencies or environment variables
**Solution**: 
1. Check build logs in Render
2. Verify all env variables are set
3. Ensure `package.json` has correct scripts

---

## Upgrade to Paid Tier (Optional)

### Benefits
- **No sleep**: Always-on services
- **Faster**: Better CPU and memory
- **Custom domains**: Use your own domain
- **SSL**: Automatic HTTPS

### Pricing
- **Starter**: $7/month per service
- **Standard**: $25/month per service

---

## Migration to VPS

Once tested on Render, you can migrate to VPS using:
1. Export MongoDB data: `mongodump`
2. Follow `DEPLOYMENT.md` for VPS setup
3. Update DNS to point to VPS
4. Import data: `mongorestore`

---

## Support

- Render Docs: https://render.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
- Next.js Deployment: https://nextjs.org/docs/deployment
