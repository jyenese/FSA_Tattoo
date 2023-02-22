const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    artistname: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    tips: {
        type: String,
    },
    rating: {
        type: Number,
    },
})

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;