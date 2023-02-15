const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    travelTime: {
        type: String,
    },
    tattooLocation: {
        type: String,
        required: true
    },
    leftOrRight: {
        type: String,
    },
    style: {
        type: String,
    },
    artist: {
        type: String,
    },
    description: {
        type: String,
    },
    size: {
        type: String,
    },
    existingTattooOnLocation: {
        type: String,
        required: true
    },
    coverUp: {
        type: String,
        required: true,
    },
    laser: {
        type: String,
        required: true,
    },
    timeToStart: {
        type: String,
    },
    repeatClient: {
        type: String,
    },
    pregnant: {
        type: String,
        required: true,
    },
    medicalConditions: {
        type: String,
        required: true,
    }


})
const Booking = mongoose.model('Booking', BookingSchema)

module.exports = Booking