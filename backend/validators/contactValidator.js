// validators/contactValidator.js
const { body } = require('express-validator');

exports.submitContactForm = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isAlpha('en-US', { ignore: ' ' })
        .withMessage('Name must contain only letters'),

    body('email')
        .isEmail()
        .withMessage('Please enter a valid email'),

    body('message')
        .isLength({ min: 20 })
        .withMessage('Message must be at least 20 characters long')
];
