const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        validate (value) {
            if(value.length < 2){
                throw new Error('First name must be at least 2 characters')
            }
        }
    },
    last_name: {
        type: String,
        required: true,
        validate (value){
            if(value.length < 2){
                throw new Error('Last name must be at least 2 characters')
            }
        }
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
    phone_number: {
        type: String,
        required: true,
        validate (value) {
            if(value.length < 10){
                throw new Error('Phone number must be at least 10 digits')
            }
        }
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
    },
    artist_name: {
        type: String,
    }


})
const Booking = mongoose.model('Booking', BookingSchema)

module.exports = Booking