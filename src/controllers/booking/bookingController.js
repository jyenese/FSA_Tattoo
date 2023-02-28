const express = require("express");
const Booking = require("../../models/booking");
const Pricing = require("../../models/pricing");

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
	// Convert date of birth to age
	age = parseInt(moment(dob).fromNow().split(" ")[0]);

	// Return true if age is 18 or older
	if (age >= 18) {
		return true;
	}

	// Return false if age is under 18
	return false;
}

async function createBooking(booking) {
	// Validate age
	if (!over18(booking.dob, 18)) {
		throw new Error("You must be 18 years or older to book an appointment");
	}

	// Create booking
	const newBooking = await Booking.create(booking);
	return newBooking;
}

// This function deletes a booking, given its bookingId.
// The function returns the deleted booking.
// The function is asynchronous, since it awaits the result of the query to the database.
async function deleteBooking(bookingId) {
	const deleteBooking = await Booking.findByIdAndDelete(bookingId);
	return deleteBooking;
}

// getBookings returns a list of all bookings

async function getBookings() {
	const bookings = await Booking.find();
	return bookings;
}

// This function gets information about a booking based on the bookingID.
// The bookingID is passed as a parameter to the function.
// The function uses the mongoose function findById to find the booking by its ID.
// It returns the booking information to the booking variable.
async function getBookingsById(bookingId) {
	try {
		const booking = await Booking.findById(bookingId);
		return booking;
	} catch (error) {
		console.log(error);
	}
}

// This function is used to get a list of bookings by a user's id
// The function is async because it needs to wait for the database to return the results
// The function returns an array of bookings
// The function uses the find method to find the bookings
// The function finds bookings where the user id matches the id passed into the function
async function getBookingsByUserId(userId) {
	const bookingByUserId = await Booking.find(
		(booking) => booking.user_id == userId
	);
	return bookingByUserId;
}

// Get pricing information from database
async function getPricing() {
	const pricing = await Pricing.find();
	return pricing;
}

//This function updates the pricing object in the database.
//The function takes a pricingId and a pricing object as parameters.
async function updatePricing(pricingId, pricing) {
	const updatePricing = await Pricing.findByIdAndUpdate(pricingId, pricing, {
		new: true,
	});
	return updatePricing;
}

//This function creates a new pricing object in the database.
//The function takes a pricing object as a parameter.
//The function returns the new pricing object.

async function createPricing(pricing) {
	const newPricing = await Pricing.create(pricing);
	return newPricing;
}

module.exports = {
	getBookings,
	getBookingsById,
	createBooking,
	getBookingsByUserId,
	deleteBooking,
	getPricing,
	updatePricing,
	createPricing,
};
