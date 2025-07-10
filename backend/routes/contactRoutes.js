const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const contactValidator = require('../validators/contactValidator');
const validateRequest = require('../middleware/validateRequest');
const authMiddleware = require('../middleware/authMiddleware');
const rateLimiter = require('../middleware/rateLimiter');

// Public route with rate limiting
router.post('/', rateLimiter, contactValidator.submitContactForm, validateRequest, contactController.submitContactForm);

// Protected routes (require authentication)
// router.use(authMiddleware.protect);
router.get('/', contactController.getAllContactSubmissions);
router.delete('/:id', contactController.deleteContactSubmission);

module.exports = router;