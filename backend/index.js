const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Routes
const authRoutes = require('./routes/authRoutes');
const scholarshipRoutes = require('./routes/scholarshipRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const blogRoutes = require('./routes/blogRoutes');
const commentRoutes = require('./routes/commentRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const eligibilityRoutes = require('./routes/eligibilityRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');

// CORS Configuration - Allow Netlify, Render, and production domain
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'https://confirmscholarship.com',
      'http://confirmscholarship.com',
      /\.netlify\.app$/,  // Allow all Netlify subdomains
      /\.onrender\.com$/  // Allow all Render subdomains
    ];

    const isAllowed = allowedOrigins.some(pattern => {
      if (typeof pattern === 'string') {
        return origin === pattern;
      }
      return pattern.test(origin);
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve static files with caching
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  maxAge: '1y',
  etag: true,
  lastModified: true,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.webp') || filePath.endsWith('.jpg') || filePath.endsWith('.png')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
}));

// Request Logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Environment Variables Validation
if (!process.env.MONGO_URI) {
  console.error('ERROR: MONGO_URI environment variable is not set!');
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error('ERROR: JWT_SECRET environment variable is not set!');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
  .then(() => {
    console.log('✅ Connected to MongoDB Successfully');
    console.log('📊 Database Name:', mongoose.connection.name);
    console.log('🔌 Connection ReadyState:', mongoose.connection.readyState);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    // Don't exit in production, allow retries
    if (process.env.NODE_ENV === 'development') {
      process.exit(1);
    }
  });

// Monitor connection events
mongoose.connection.on('error', err => {
  console.error('❌ Mongoose connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ Mongoose disconnected. Attempting to reconnect...');
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ Mongoose reconnected successfully');
});

// Route Mounting
app.use('/api/auth', authRoutes);
app.use('/api/scholarships', scholarshipRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/eligibility', eligibilityRoutes);

const bracketRoutes = require('./routes/bracketRoutes');
app.use('/api/brackets', bracketRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'ConfirmScholarship API is running' });
});

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString(), db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found", path: req.url });
});

// Final Error Handler
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? "Internal Server Error" 
    : err.message;
  res.status(statusCode).json({ 
    message, 
    ...(process.env.NODE_ENV === 'development' && { error: err.message, stack: err.stack })
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
