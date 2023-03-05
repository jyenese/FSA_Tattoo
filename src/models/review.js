const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        validate (value) {
            if(value < 1 || value > 10){
                throw new Error('Rating must be between 1 and 10')
            }
        }
    },
    tips: {
        type: String,
    }
})

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;