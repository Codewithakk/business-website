const { body, param } = require('express-validator');

exports.createTestimonial = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters')
        .matches(/^[A-Za-z\s]+$/)
        .withMessage('Name can only contain letters and spaces'),

    body('message')
        .notEmpty()
        .withMessage('Message is required')
        .isLength({ min: 20, max: 500 })
        .withMessage('Message must be between 20 and 500 characters'),
];

exports.updateTestimonial = [
    param('id')
        .notEmpty()
        .withMessage('Testimonial ID is required')
        .isMongoId()
        .withMessage('Invalid Testimonial ID'),

    body('name')
        .optional()
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters')
        .matches(/^[A-Za-z\s]+$/)
        .withMessage('Name can only contain letters and spaces'),

    body('message')
        .optional()
        .isLength({ min: 20, max: 500 })
        .withMessage('Message must be between 20 and 500 characters'),
];