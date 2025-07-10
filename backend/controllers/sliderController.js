const Slider = require('../models/Slider');
const logger = require('../utils/logger');
const { validationResult } = require('express-validator');

exports.getAllSlides = async (req, res, next) => {
    try {
        const slides = await Slider.find({ isActive: true }).sort({ order: 1 });
        res.json(slides);
    } catch (err) {
        logger.error('Error fetching slides:', err);
        next(err);
    }
};

exports.getSlideById = async (req, res, next) => {
    try {
        const slide = await Slider.findById(req.params.id);
        if (!slide) {
            return res.status(404).json({ message: 'Slide not found' });
        }
        res.json(slide);
    } catch (err) {
        logger.error('Error fetching slide:', err);
        next(err);
    }
};
exports.createSlide = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { imageUrl, altText, title, subtitle, order, isActive } = req.body; // <-- FIXED

        const newSlide = new Slider({
            imageUrl,
            altText,
            title,
            subtitle,
            order,
            isActive,
        });

        await newSlide.save();
        res.status(201).json(newSlide);
    } catch (err) {
        logger.error('Error creating slide:', err);
        next(err);
    }
};


exports.updateSlide = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { imageUrl, altText, title, subtitle, order, isActive } = req.body; // <-- FIXED

        const updatedSlide = await Slider.findByIdAndUpdate(
            req.params.id,
            { imageUrl, altText, title, subtitle, order, isActive },
            { new: true }
        );

        if (!updatedSlide) {
            return res.status(404).json({ message: 'Slide not found' });
        }

        res.json(updatedSlide);
    } catch (err) {
        logger.error('Error updating slide:', err);
        next(err);
    }
};


exports.deleteSlide = async (req, res, next) => {
    try {
        const deletedSlide = await Slider.findByIdAndDelete(req.params.id);
        if (!deletedSlide) {
            return res.status(404).json({ message: 'Slide not found' });
        }
        res.json({ message: 'Slide deleted successfully' });
    } catch (err) {
        logger.error('Error deleting slide:', err);
        next(err);
    }
};