const Testimonial = require('../models/Testimonial');
const logger = require('../utils/logger');
const { validationResult } = require('express-validator');

exports.getAllTestimonials = async (req, res, next) => {
    try {
        const testimonials = await Testimonial.find({ isActive: true }).sort({ createdAt: -1 });
        res.json(testimonials);
    } catch (err) {
        logger.error('Error fetching testimonials:', err);
        next(err);
    }
};

exports.getTestimonialById = async (req, res, next) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.json(testimonial);
    } catch (err) {
        logger.error('Error fetching testimonial:', err);
        next(err);
    }
};

exports.createTestimonial = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, position, rating, message, isActive } = req.body;

        const newTestimonial = new Testimonial({
            name,
            email,
            position,
            rating,
            message,
            isActive,
        });

        await newTestimonial.save();
        res.status(201).json(newTestimonial);
    } catch (err) {
        logger.error('Error creating testimonial:', err);
        next(err);
    }
};


exports.updateTestimonial = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, position, rating, message, isActive } = req.body;

        const updatedTestimonial = await Testimonial.findByIdAndUpdate(
            req.params.id,
            { name, email, position, rating, message, isActive },
            { new: true }
        );

        if (!updatedTestimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }

        res.json(updatedTestimonial);
    } catch (err) {
        logger.error('Error updating testimonial:', err);
        next(err);
    }
};


exports.deleteTestimonial = async (req, res, next) => {
    try {
        const deletedTestimonial = await Testimonial.findByIdAndDelete(req.params.id);
        if (!deletedTestimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.json({ message: 'Testimonial deleted successfully' });
    } catch (err) {
        logger.error('Error deleting testimonial:', err);
        next(err);
    }
};