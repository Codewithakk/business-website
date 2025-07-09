const { body, param } = require('express-validator');

exports.createService = [
    body('title')
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ max: 100 })
        .withMessage('Title must be less than 100 characters'),

    body('imageUrl')
        .notEmpty()
        .withMessage('Image URL is required')
        .isURL()
        .withMessage('Please provide a valid URL'),

    body('description')
        .optional()
        .isLength({ max: 500 })
        .withMessage('Description must be less than 500 characters'),
];

exports.updateService = [
    param('id')
        .notEmpty()
        .withMessage('Service ID is required')
        .isMongoId()
        .withMessage('Invalid Service ID'),

    body('title')
        .optional()
        .isLength({ max: 100 })
        .withMessage('Title must be less than 100 characters'),

    body('imageUrl')
        .optional()
        .isURL()
        .withMessage('Please provide a valid URL'),

    body('description')
        .optional()
        .isLength({ max: 500 })
        .withMessage('Description must be less than 500 characters'),
];