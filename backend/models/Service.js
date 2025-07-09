const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
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

module.exports = mongoose.model('Service', serviceSchema);