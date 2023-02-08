const express = require("express");

const bookingRouter = express.Router();

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

bookingRouter.get("/", (req, res) => {
    res.json(bookings)
})

bookingRouter.get("/bookings/:bookingId", (req, res) => {
    const booking = bookings[req.params.bookingId]
    if(!booking){
        return res.status(404).json({
            error: "Booking not found"
        })
    }
    return res.json(booking)
})


module.exports = bookingRouter;