const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');
const aboutValidator = require('../validators/aboutValidator');
const validateRequest = require('../middleware/validateRequest');
const authMiddleware = require('../middleware/authMiddleware');

// Public route
router.get('/', aboutController.getAboutContent);

// Protected route (require authentication)
// router.use(authMiddleware.protect);
router.put('/', aboutValidator.updateAboutContent, validateRequest, aboutController.updateAboutContent);

module.exports = router;