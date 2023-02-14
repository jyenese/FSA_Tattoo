const express = require("express");
const { getBookings, 
        getBookingsById, 
        createBooking,
        getBookingsByUserId,
 } = require("./bookingController.js");
const bookingRouter = express.Router();

bookingRouter.get("/", async (req, res) => {
    const bookings = await getBookings();
    res.json(bookings)
})

bookingRouter.post("/new", async (req, res) => {
    console.log(req.body)
    try {
        const booking = await createBooking({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            dob: req.body.dob,
            preferences: req.body.preferences,   
        })
        res.json(booking)   
    } catch (error) {
        console.error(error)
        return res.status(400).json({
            error: `error creating booking: ${error.message}`
        })   
    }
    
})

bookingRouter.get("/new/:userId", async (req, res) => {
    const booking = await getBookingsByUserId(req.params.userId);
    if(!booking){
        return res.status(404).json({
            error: "Booking not found"
        })
    }
    res.json(booking)
})

bookingRouter.get("/:bookingId",async (req, res) => {
    const booking = await getBookingsById(req.params.bookingId);
    if(!booking){
        return res.status(404).json({
            error: "Booking not found"
        })
    }
    return res.json(booking)
})



module.exports = bookingRouter;