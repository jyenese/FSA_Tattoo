const express = require("express");
// const Booking = require("../../models/booking.js");

const bookings = [
    { 
        user_id: 1,
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
        user_id: 2,
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

function validateAge($birthday, $age = 18)
{
    if(is_string($birthday)) {
        $birthday = strtotime($birthday);
    }
    if(time() - $birthday < $age * 31536000)  {
        return false;
    }

    return true;
}

async function createBooking(booking){
    const newBooking = {
        user_id: bookings.length + 1,
        ...booking
    }
    return newBooking
}


function getBookings() {
    return bookings;
}

function getBookingsById(bookingId) {
    const booking = bookings[bookingId];
    return booking;
}

function getBookingsByUserId(userId) {
    const bookingByUserId = bookings.find(booking => booking.user_id == userId);
    return bookingByUserId;
}

module.exports = {
    getBookings,
    getBookingsById,
    validateAge,
    createBooking,
    getBookingsByUserId,

}