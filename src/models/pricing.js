const mongoose = require('mongoose');

const PricingSchema = new mongoose.Schema({
    deposit: {
        type: String,
        required: true,
    },
    small:{
        type: Number,
        required: true,
    },
    medium:{
        type: Number,
        required: true,
    },
    large:{
        type: Number,
        required: true,
    },
    juniorTatArtist: {
        type: String,
        required: true,
    },
    midTatArtist: {
        type: String,
        required: true,
    },
    professionalArtist: {
        type: String,
        required: true,
    },
    experiencedArtist: {
        type: String,
    }

})

const Pricing = mongoose.model('Pricing', PricingSchema);

module.exports = Pricing;