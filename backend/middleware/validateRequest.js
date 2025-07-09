const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.warn('Validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = validateRequest;
