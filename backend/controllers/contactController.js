const Contact = require('../models/Contact');
const logger = require('../utils/logger');
const { validationResult } = require('express-validator');
const axios = require('axios');
const config = require('../config/config');

exports.submitContactForm = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Verify reCAPTCHA token
        // const { recaptchaToken } = req.body;
        // const recaptchaResponse = await axios.post(
        //     `https://www.google.com/recaptcha/api/siteverify?secret=${config.recaptcha.secretKey}&response=${recaptchaToken}`
        // );

        // if (!recaptchaResponse.data.success) {
        //     return res.status(400).json({ message: 'reCAPTCHA verification failed' });
        // }

        const { name, email, message } = req.body;
        const newContact = new Contact({
            name,
            email,
            message,
        });

        await newContact.save();
        res.status(201).json({ message: 'Contact form submitted successfully' });
    } catch (err) {
        logger.error('Error submitting contact form:', err);
        next(err);
    }
};

exports.getAllContactSubmissions = async (req, res, next) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (err) {
        logger.error('Error fetching contact submissions:', err);
        next(err);
    }
};

exports.deleteContactSubmission = async (req, res, next) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact submission not found' });
        }
        res.json({ message: 'Contact submission deleted successfully' });
    } catch (err) {
        logger.error('Error deleting contact submission:', err);
        next(err);
    }
};