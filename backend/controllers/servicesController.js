const Service = require('../models/Service');
const logger = require('../utils/logger');
const { validationResult } = require('express-validator');

exports.getAllServices = async (req, res, next) => {
    try {
        const services = await Service.find({ isActive: true });
        res.json(services);
    } catch (err) {
        logger.error('Error fetching services:', err);
        next(err);
    }
};

exports.getServiceById = async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json(service);
    } catch (err) {
        logger.error('Error fetching service:', err);
        next(err);
    }
};

exports.createService = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, imageUrl, description, isActive } = req.body;
        const newService = new Service({
            title,
            imageUrl,
            description,
            isActive,
        });

        await newService.save();
        res.status(201).json(newService);
    } catch (err) {
        logger.error('Error creating service:', err);
        next(err);
    }
};

exports.updateService = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, imageUrl, description, isActive } = req.body;
        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            { title, imageUrl, description, isActive },
            { new: true }
        );

        if (!updatedService) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.json(updatedService);
    } catch (err) {
        logger.error('Error updating service:', err);
        next(err);
    }
};

exports.deleteService = async (req, res, next) => {
    try {
        const deletedService = await Service.findByIdAndDelete(req.params.id);
        if (!deletedService) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json({ message: 'Service deleted successfully' });
    } catch (err) {
        logger.error('Error deleting service:', err);
        next(err);
    }
};