# ConfirmScholarship Deployment Guide

## Prerequisites
- Ubuntu 20.04+ VPS
- Node.js 18+ installed
- MongoDB running (local or Atlas)
- PM2 installed globally: `npm install -g pm2`
- Nginx installed: `sudo apt install nginx`

## Deployment Steps

### 1. Clone and Setup
```bash
cd /var/www
git clone <your-repo-url> confirmscholarship
cd confirmscholarship

# Install dependencies
cd backend && npm install
cd ../frontend && npm install && npm run build
cd ..
```

### 2. Environment Configuration

**Backend (.env)**
```env
PORT=5005
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=production
```

**Frontend (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:5005
```

### 3. Create Log Directory
```bash
mkdir -p logs
```

### 4. Start with PM2
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 5. Configure Nginx
```bash
sudo cp nginx.conf /etc/nginx/sites-available/confirmscholarship
sudo ln -s /etc/nginx/sites-available/confirmscholarship /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 6. SSL Certificate (Production)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## Monitoring

### View Logs
```bash
pm2 logs confirmscholarship-backend
pm2 logs confirmscholarship-frontend
```

### Monitor Resources
```bash
pm2 monit
```

### Restart Services
```bash
pm2 restart all
```

## Performance Optimization

### Enable Redis Caching (Optional)
```bash
sudo apt install redis-server
sudo systemctl enable redis-server
```

Then update backend to use Redis for caching blog posts and scholarships.

### Database Indexes
Connect to MongoDB and create indexes:
```javascript
db.blogs.createIndex({ slug: 1 }, { unique: true });
db.blogs.createIndex({ status: 1, createdAt: -1 });
db.comments.createIndex({ blogPost: 1, status: 1 });
```

## Troubleshooting

### Frontend not loading
- Check PM2 logs: `pm2 logs confirmscholarship-frontend`
- Verify build: `cd frontend && npm run build`
- Check port 3000: `netstat -tulpn | grep 3000`

### Backend API errors
- Check PM2 logs: `pm2 logs confirmscholarship-backend`
- Verify MongoDB connection
- Check port 5005: `netstat -tulpn | grep 5005`

### Images not loading
- Verify uploads directory exists: `ls backend/uploads/images`
- Check Nginx configuration for `/uploads/` location
- Verify file permissions: `chmod -R 755 backend/uploads`
