const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    email: {
        // This is a validation for the email field to make sure the email has an "@" symbol for the email to be valid
        type: String,
        required: true,
        validate (value) {
            if(!value.includes('@')){
                throw new Error('Email must include @ symbol')
            }
        }
    },
    phone: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    deposit: {
        // This is a validation for the deposit field to make sure the deposit is over 100 for the booking to be valid
        type: Number,
        required: true,
        validate (value) {
            if(value < 100){
                throw new Error('Deposit must be over 100')
            }
        }
    }


})
const Booking = mongoose.model('Booking', BookingSchema)

module.exports = Booking