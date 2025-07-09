require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { xss } = require('express-xss-sanitizer'); // Changed from xss-clean
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

// Initialize Express app
const app = express();

// Connect to MongoDB - Updated connection without deprecated options
connectDB();

// Security Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

// Body parsers
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Cookie parser
app.use(cookieParser());

// Security sanitizers - NEW IMPLEMENTATION
app.use((req, res, next) => {
    // Manual query sanitization
    if (req.query) {
        req.query = mongoSanitize.sanitize(req.query);
    }
    next();
});

app.use(xss()); // XSS protection

// Import routes AFTER middleware
const authRoutes = require('./routes/authRoutes');
const sliderRoutes = require('./routes/sliderRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const testimonialsRoutes = require('./routes/testimonialsRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/slider', sliderRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/contact', contactRoutes);

// Health endpoints
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

app.get('/', (req, res) => {
    res.send('Welcome to the Business Website API');
});

// Error handler - MUST be last
app.use(errorHandler.errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
    logger.error(`Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
});