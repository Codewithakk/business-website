const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');
const logger = require('../utils/logger');
const { validationResult } = require('express-validator');

// Generate JWT Tokens
const generateTokens = (userId) => {
    const accessToken = jwt.sign({ id: userId }, config.jwt.accessSecret, {
        expiresIn: config.jwt.accessExpiration,
    });
    const refreshToken = jwt.sign({ id: userId }, config.jwt.refreshSecret, {
        expiresIn: config.jwt.refreshExpiration,
    });
    return { accessToken, refreshToken };
};

exports.register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        // Create new user
        const user = new User({ email, password });
        await user.save();

        // Generate tokens
        const { accessToken, refreshToken } = generateTokens(user._id);

        // Set refresh token cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
        });

        // Respond with access token and user info
        res.status(201).json({
            accessToken,
            user: {
                id: user._id,
                email: user.email,
            },
        });
    } catch (err) {
        logger.error('Register error:', err);
        next(err);
    }
};

exports.login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const { accessToken, refreshToken } = generateTokens(user._id);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
        });

        res.json({
            accessToken,
            user: {
                id: user._id,
                email: user.email,
            },
        });
    } catch (err) {
        logger.error('Login error:', err);
        next(err);
    }
};

exports.refreshToken = async (req, res, next) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token is required' });
    }

    try {
        const decoded = jwt.verify(refreshToken, config.jwt.refreshSecret);
        const { accessToken } = generateTokens(decoded.id);
        res.json({ accessToken });
    } catch (err) {
        logger.error('Refresh token error:', err);
        res.status(401).json({ message: 'Invalid refresh token' });
    }
};

exports.logout = (req, res) => {
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
};