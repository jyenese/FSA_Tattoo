const express = require("express");
const Booking = require("../../models/booking");

const moment = require("moment");

// const bookings = [
//     { 
//         user_id: 1,
//         name: "John",
//         email: "john@gmail.com",
//         phone: "1234567890",
//         dob: "01/01/2000",
//             preferences: [
//                 {
//                 artist: "Artist 7",
//                 availability: "2021-09-01",
//             } 
//         ]
//     },
//     {
//         user_id: 2,
//         name: "Jane",
//         email: "jane@gmail.com",
//         phone: "1234567890",
//         dob: "01/01/2000",
//             preferences: [
//                 {
//                 artist: "Artist 1",
//                 availability: "2021-09-01",
//             } 
//         ]
//     },
// ]

function over18(dob) {
    age = parseInt(moment(dob).fromNow().split(" ")[0])
    console.log(age)
    if(age >= 18){
        return true
    }
    return false
}

async function createBooking(booking) {
    if(!over18(booking.dob, 18)){
        throw new Error("You must be 18 years or older to book an appointment")
    }
    const newBooking = await Booking.create(booking)
    return newBooking
}

async function deleteBooking(bookingId) {
    const deleteBooking = await Booking.findByIdAndDelete(bookingId);
    return deleteBooking
}


async function getBookings() {
    const bookings = await Booking.find();
    return bookings;
}

async function getBookingsById(bookingId) {
    try {
    const booking = await Booking.findById(bookingId);
    return booking;
    } catch (error) {
        console.log(error)
    }
}

function getBookingsByUserId(userId) {
    const bookingByUserId = Booking.find(booking => booking.user_id == userId);
    return bookingByUserId;
}

module.exports = {
    getBookings,
    getBookingsById,
    createBooking,
    getBookingsByUserId,
    deleteBooking,

}