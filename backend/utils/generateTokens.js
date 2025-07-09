const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.generateAccessToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwt.accessSecret, {
        expiresIn: config.jwt.accessExpiration,
    });
};

exports.generateRefreshToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwt.refreshSecret, {
        expiresIn: config.jwt.refreshExpiration,
    });
};