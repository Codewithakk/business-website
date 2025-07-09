const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    altText: {
        type: String,
        required: true,
        trim: true,
    },
    order: {
        type: Number,
        default: 0,
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

module.exports = mongoose.model('Slider', sliderSchema);