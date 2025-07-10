const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: /.+\@.+\..+/,
    },
    position: {
        type: String,
        trim: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Testimonial', testimonialSchema);