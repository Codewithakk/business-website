const express = require('express');
const router = express.Router();
const testimonialsController = require('../controllers/testimonialsController');
const testimonialsValidator = require('../validators/testimonialsValidator');
const validateRequest = require('../middleware/validateRequest');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/', testimonialsController.getAllTestimonials);
router.get('/:id', testimonialsController.getTestimonialById);

// Protected routes (require authentication)
router.use(authMiddleware.protect);

router.post('/', testimonialsValidator.createTestimonial, validateRequest, testimonialsController.createTestimonial);
router.put('/:id', testimonialsValidator.updateTestimonial, validateRequest, testimonialsController.updateTestimonial);
router.delete('/:id', testimonialsController.deleteTestimonial);

module.exports = router;