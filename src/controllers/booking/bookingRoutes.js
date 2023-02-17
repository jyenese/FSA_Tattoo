const express = require("express");
const { getBookings, 
        getBookingsById, 
        createBooking,
        getBookingsByUserId,
        deleteBooking,
 } = require("./bookingController.js");

const auth = require("../../middleware/auth.js");
const admin = require("../../middleware/admin.js");

const bookingRouter = express.Router();



bookingRouter.get("/", async (req, res) => {
    const bookings = await getBookings();
    return res.json(bookings)
})

bookingRouter.post("/new", auth, async (req, res) => {
    console.log(req.body)
    try {
        const booking = await createBooking({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            dob: req.body.dob,
            travelTime: req.body.travelTime,
            tattooLocation: req.body.tattooLocation,
            leftOrRight: req.body.leftOrRight,
            style: req.body.style,
            artist: req.body.artist,
            description: req.body.description,
            size: req.body.size,
            existingTattooOnLocation: req.body.existingTattooOnLocation,
            coverUp: req.body.coverUp,
            laser: req.body.laser,
            timeToStart: req.body.timeToStart,
            repeatClient: req.body.repeatClient,
            pregnant: req.body.pregnant,
            medicalConditions: req.body.medicalConditions,  
        })
        if(booking){
            return res.json({
                message: `Booking has been successfully created, thanks!`,
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(400).json({
            error: `error creating booking: ${error.message}`
        })   
    }
    
})

bookingRouter.delete("/:bookingId", admin, async (req, res) => {
    const booking = await deleteBooking(req.params.bookingId);
    if(booking){
        return res.json({
            message: "Booking successfully deleted"
        })
    }
    if(!booking){
        return res.status(404).json({
            error: "Booking not found"
        })
    }
    return res.json(booking) 
})

bookingRouter.get("/new/:userId", async (req, res) => {
    const booking = await getBookingsByUserId(req.params.userId);
    if(!booking){
        return res.status(404).json({
            error: "Booking not found"
        })
    }
    return res.json(booking)
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