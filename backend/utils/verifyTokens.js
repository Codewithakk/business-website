const jwt = require('jsonwebtoken');
const config = require('../config/config');
const logger = require('./logger');

exports.verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, config.jwt.accessSecret);
    } catch (err) {
        logger.error('Access token verification error:', err);
        return null;
    }
};

exports.verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, config.jwt.refreshSecret);
    } catch (err) {
        logger.error('Refresh token verification error:', err);
        return null;
    }
};