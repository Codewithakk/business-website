const { body } = require('express-validator');

exports.updateAboutContent = [
    body('content')
        .notEmpty()
        .withMessage('Content is required')
        .isLength({ min: 20 })
        .withMessage('Content must be at least 20 characters long'),
];