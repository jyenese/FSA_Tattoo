const express = require("express");
// const Booking = require("../../models/booking.js");

const bookings = [
    {
        name: "John",
        email: "john@gmail.com",
        phone: "1234567890",
        dob: "01/01/2000"[
            {
                artist: "Artist 3",
                availability: "2021-01-11",
            }
        ]
    },
    {
        name: "Jane",
        email: "jane@gmail.com",
        phone: "1234567890",
        dob: "01/01/2000"[
            {
                artist: "Artist 1",
                availability: "2021-09-01",
            }
        ]
    },
]

function validateAge(dob) {
    if(dob < 1/1/2005){
        return false
    }
}

function createBooking(booking){
    const newbooking =  {
        id: 4,
        ...booking,
    }
    return newbooking
}


function getBookings() {
    return bookings;
}

function getBookingsById(bookingId) {
    const booking = bookings[bookingId]
    return booking
}

module.exports = {
    getBookings,
    getBookingsById,
    validateAge,
    createBooking,

}