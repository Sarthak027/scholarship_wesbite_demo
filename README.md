# Production Deployment Guide

This guide will help you deploy the ConfirmScholarship website to a VPS.

## Prerequisites

- VPS with Ubuntu 20.04+ or similar Linux distribution
- Domain name (confirmscholarship.com) pointing to your VPS IP
- MongoDB Atlas account or MongoDB instance
- Node.js 18+ and npm installed
- PM2 installed globally (`npm install -g pm2`)
- Nginx installed

## Environment Variables

### Backend (.env file in backend directory)

```env
# MongoDB Connection
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/confirmscholarship?retryWrites=true&w=majority

# JWT Secret (generate a strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Port
PORT=5005

# Node Environment
NODE_ENV=production
```

### Frontend (.env.local file in frontend directory)

```env
# Backend API URL
NEXT_PUBLIC_API_URL=https://confirmscholarship.com
```

## Deployment Steps

### 1. Clone and Install Dependencies

```bash
# Clone repository
git clone <your-repo-url>
cd cholarship_wesbite_demo

# Install backend dependencies
cd backend
npm install --production
cd ..

# Install frontend dependencies
cd frontend
npm install --production
npm run build
cd ..
```

### 2. Set Up Environment Variables

```bash
# Backend
cd backend
nano .env
# Add your environment variables (see above)
cd ..

# Frontend
cd frontend
nano .env.local
# Add NEXT_PUBLIC_API_URL=https://confirmscholarship.com
cd ..
```

### 3. Configure Nginx

```bash
# Copy nginx config
sudo cp nginx.conf /etc/nginx/sites-available/confirmscholarship

# Create symlink
sudo ln -s /etc/nginx/sites-available/confirmscholarship /etc/nginx/sites-enabled/

# Test nginx configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

### 4. Set Up SSL Certificate (Let's Encrypt)

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d confirmscholarship.com -d www.confirmscholarship.com

# Auto-renewal is set up automatically
```

### 5. Start Applications with PM2

```bash
# Start both backend and frontend
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Set up PM2 to start on boot
pm2 startup
# Follow the instructions shown
```

### 6. Create Logs Directory

```bash
mkdir -p logs
```

### 7. Verify Deployment

- Check backend: `curl http://localhost:5005/health`
- Check frontend: `curl http://localhost:3000`
- Check nginx: Visit `https://confirmscholarship.com`

## Monitoring

### PM2 Commands

```bash
# View status
pm2 status

# View logs
pm2 logs

# Restart applications
pm2 restart all

# Stop applications
pm2 stop all
```

### Nginx Logs

```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log
```

## Troubleshooting

### Backend not starting
- Check MongoDB connection: Verify MONGO_URI is correct
- Check port: Ensure port 5005 is not in use
- Check logs: `pm2 logs confirmscholarship-backend`

### Frontend not starting
- Check build: Ensure `npm run build` completed successfully
- Check port: Ensure port 3000 is not in use
- Check logs: `pm2 logs confirmscholarship-frontend`

### Nginx errors
- Test config: `sudo nginx -t`
- Check error logs: `sudo tail -f /var/log/nginx/error.log`
- Verify upstreams: Check that backend (5005) and frontend (3000) are running

### CORS errors
- Verify confirmscholarship.com is in CORS allowed origins in backend/index.js
- Check that NEXT_PUBLIC_API_URL matches the domain

## Security Checklist

- [ ] Change default admin password
- [ ] Use strong JWT_SECRET (at least 32 characters)
- [ ] Enable HTTPS with SSL certificate
- [ ] Set up firewall (UFW) to allow only necessary ports
- [ ] Keep dependencies updated
- [ ] Set up regular backups of MongoDB
- [ ] Monitor logs regularly
- [ ] Use environment variables for all secrets

## Backup

### MongoDB Backup

```bash
# Backup command (adjust connection string)
mongodump --uri="your-mongodb-connection-string" --out=/path/to/backup
```

### Application Backup

```bash
# Backup entire application directory
tar -czf confirmscholarship-backup-$(date +%Y%m%d).tar.gz /path/to/application
```

## Updates

To update the application:

```bash
# Pull latest changes
git pull

# Rebuild frontend
cd frontend
npm install
npm run build
cd ..

# Restart PM2
pm2 restart all
```

## Support

For issues or questions, check:
- Application logs: `pm2 logs`
- Nginx logs: `/var/log/nginx/`
- MongoDB connection: Check MONGO_URI in backend/.env
