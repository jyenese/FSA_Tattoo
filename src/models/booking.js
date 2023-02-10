const mongoose = require('mongoose')

const { validateAge } = require('../controllers/booking/bookingController.js')

const BookingSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }, 
    phone: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
        date: validateAge,
    },
    artist: {
        type: String,
        required: true,
    },
    availability: {
        type: Date,
        required: true,
    },
})


const Booking = mongoose.model('Booking', BookingSchema)

module.exports = Booking