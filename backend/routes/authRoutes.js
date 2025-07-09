const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authValidator = require('../validators/authValidator');
const validateRequest = require('../middleware/validateRequest');

router.post('/login', authValidator.login, validateRequest, authController.login);
router.post('/register', authController.register);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);

module.exports = router;