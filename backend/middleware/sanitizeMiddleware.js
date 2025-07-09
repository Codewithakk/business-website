const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const helmet = require('helmet');

exports.sanitize = [
    // Set security HTTP headers
    helmet(),

    // Data sanitization against NoSQL query injection
    mongoSanitize(),

    // Data sanitization against XSS
    xss(),
];