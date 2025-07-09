const jwt = require('jsonwebtoken');
const config = require('../config/config');
const logger = require('../utils/logger');

exports.protect = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, config.jwt.accessSecret);
        req.userId = decoded.id;
        next();
    } catch (err) {
        logger.error('JWT verification error:', err);
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};