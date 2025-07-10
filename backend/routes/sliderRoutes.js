const express = require('express');
const router = express.Router();
const sliderController = require('../controllers/sliderController');
const sliderValidator = require('../validators/sliderValidator');
const validateRequest = require('../middleware/validateRequest');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/', sliderController.getAllSlides);
router.get('/:id', sliderController.getSlideById);

// Protected routes (require authentication)
// router.use(authMiddleware.protect);

router.post('/', sliderValidator.createSlide, validateRequest, sliderController.createSlide);
router.put('/:id', sliderValidator.updateSlide, validateRequest, sliderController.updateSlide);
router.delete('/:id', sliderController.deleteSlide);

module.exports = router;