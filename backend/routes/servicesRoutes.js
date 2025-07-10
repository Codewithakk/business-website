const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/servicesController');
const servicesValidator = require('../validators/servicesValidator');
const validateRequest = require('../middleware/validateRequest');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/', servicesController.getAllServices);
router.get('/:id', servicesController.getServiceById);

// Protected routes (require authentication)
// router.use(authMiddleware.protect);

router.post('/', servicesValidator.createService, validateRequest, servicesController.createService);
router.put('/:id', servicesValidator.updateService, validateRequest, servicesController.updateService);
router.delete('/:id', servicesController.deleteService);

module.exports = router;