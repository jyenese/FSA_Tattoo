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
        required: true,
        validate (value) {
            if(value < 1 || value > 10){
                throw new Error('Rating must be between 1 and 10')
            }
        }
    },
})

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;