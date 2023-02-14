const mongoose = require('mongoose')


const PreferenceSchema = new mongoose.Schema({
    artist: String,
    availability: String,
   
})

const BookingSchema = new mongoose.Schema({
    name:
    {
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
        type: String,
        required: true,
    },
    preferences: [PreferenceSchema]
}
)

const Booking = mongoose.model('Booking', BookingSchema)

module.exports = Booking