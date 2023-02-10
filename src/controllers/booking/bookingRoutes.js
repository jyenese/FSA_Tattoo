const express = require("express");
const { getBookings, getBookingsById, createBooking } = require("./bookingController.js");
const bookingRouter = express.Router();

bookingRouter.get("/", (req, res) => {
    const bookings = getBookings();
    res.json(bookings)
})

bookingRouter.post("/consultations", async (req, res) => {
    console.log(req.userId)
    const booking = await createBooking({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        dob: req.body.dob,
        artist: req.body.artist,
        availability: req.body.availability,
    })
    res.json(booking)
})

bookingRouter.get("/:bookingId", (req, res) => {
    const booking = getBookingsById(req.params.bookingId);
    if(!booking){
        return res.status(404).json({
            error: "Booking not found"
        })
    }
    return res.json(booking)
})



module.exports = bookingRouter;