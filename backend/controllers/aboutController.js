const About = require('../models/About');
const logger = require('../utils/logger');
const { validationResult } = require('express-validator');

exports.getAboutContent = async (req, res, next) => {
    try {
        const about = await About.findOne().sort({ updatedAt: -1 });
        if (!about) {
            return res.status(404).json({ message: 'About content not found' });
        }
        res.json(about);
    } catch (err) {
        logger.error('Error fetching about content:', err);
        next(err);
    }
};

exports.updateAboutContent = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { content } = req.body;
        let about = await About.findOne().sort({ updatedAt: -1 });

        if (!about) {
            about = new About({ content });
        } else {
            about.content = content;
            about.updatedAt = new Date();
        }

        await about.save();
        res.json(about);
    } catch (err) {
        logger.error('Error updating about content:', err);
        next(err);
    }
};