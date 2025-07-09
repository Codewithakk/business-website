const { body, param } = require('express-validator');

exports.createSlide = [
    body('imageUrl')
        .notEmpty()
        .withMessage('Image URL is required')
        .isURL()
        .withMessage('Please provide a valid URL'),

    body('altText')
        .notEmpty()
        .withMessage('Alt text is required')
        .isLength({ max: 100 })
        .withMessage('Alt text must be less than 100 characters'),

    body('order')
        .optional()
        .isInt()
        .withMessage('Order must be an integer'),
];

exports.updateSlide = [
    param('id')
        .notEmpty()
        .withMessage('Slide ID is required')
        .isMongoId()
        .withMessage('Invalid Slide ID'),

    body('imageUrl')
        .optional()
        .isURL()
        .withMessage('Please provide a valid URL'),

    body('altText')
        .optional()
        .isLength({ max: 100 })
        .withMessage('Alt text must be less than 100 characters'),

    body('order')
        .optional()
        .isInt()
        .withMessage('Order must be an integer'),
];