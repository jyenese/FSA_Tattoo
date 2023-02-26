const express = require("express");
const { getBookings, 
        getBookingsById, 
        createBooking,
        getBookingsByUserId,
        deleteBooking,
        getPricing,
        updatePricing,
        createPricing,
 } = require("./bookingController.js");

const auth = require("../../middleware/auth.js");
const admin = require("../../middleware/admin.js");

const bookingRouter = express.Router();



// Get all bookings
bookingRouter.get("/test", admin, async (req, res) => {
    const bookings = await getBookings();
    return res.json({ bookings })
})

/* 
    This function creates a new booking using the values in the request body. The function
    calls the createBooking function from the booking service. If the booking is successfully
    created, a message is returned. Otherwise, an error message is returned.
*/


bookingRouter.post("/",auth,async (req, res) => {
    console.log(req.body)
    try {
        const booking = await createBooking({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            dob: req.body.dob,
            phone_number: req.body.phone_number,
            description: req.body.description,
            deposit: req.body.deposit,
            artist_name: req.body.artist_name,
        })
        if(booking){
            return res.json({
                message: `Booking has been successfully created, thanks!`,
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(400).json({
            error: `${error.message}`
        })   
    }
    
})

// We are declaring a variable called booking and assigning it to the value of the function deleteBooking,
// which takes the bookingId from the params and deletes it.
// If the booking is successfully deleted, a message is returned. Otherwise, an error message is returned.
bookingRouter.delete("/:bookingId",admin, async (req, res) => {
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

//This is the function that gets the booking for a user by the user ID
//It is async so that it can wait for the database to respond
//The function takes in the user ID as a parameter
//It then calls the getBookingsByUserId function from the database and passes in the user ID as a parameter
//If the booking is not found, an error message is returned
//If the booking is found, the booking is returned

bookingRouter.get("/new/:userId",admin, async (req, res) => {
    const booking = await getBookingsByUserId(req.params.userId);
    if(!booking){
        return res.status(404).json({
            error: "Booking not found"
        })
    }
    return res.json(booking)
})

// This code is used to get bookings by id. The code is used in the booking router. The function getBookingsById is in the bookings controller.

bookingRouter.get("/list/:bookingId", admin, async (req, res) => {
    const booking = await getBookingsById(req.params.bookingId);
    if(!booking){
        return res.status(404).json({
            error: "Booking not found"
        })
    }
    return res.json(booking)
})

// This function gets the price from the "pricing" table in the database
// and returns it as a JSON object

bookingRouter.get("/pricing", async (req, res) => {
    const pricing = await getPricing();
    return res.json(pricing)
})

// This function creates a new pricing using the values in the request body.
// The function calls the createPricing function from the booking service.
// If the pricing is successfully created, a message is returned.

bookingRouter.post("/pricing",admin, async (req, res) => {
    try {
        const pricing = await createPricing({
            deposit: req.body.deposit,
            small: req.body.small,
            medium: req.body.medium,
            large: req.body.large,
            juniorTatArtist: req.body.juniorTatArtist,
            midTatArtist: req.body.midTatArtist,
            professionalArtist: req.body.professionalArtist,
            experiencedArtist: req.body.experiencedArtist,
        })
        if(pricing){
            return res.json({
                message: `Pricing has been successfully created`,
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(400).json({
            error: `${error.message}`
        })   
    }
    }
)
// This function updates the pricing using the values in the request body
bookingRouter.put("/pricing/:pricingId",admin, async (req, res) => {
    try {
        const pricing = await updatePricing(req.params.pricingId, {
            deposit: req.body.deposit,
            small: req.body.small,
            medium: req.body.medium,
            large: req.body.large,
            juniorTatArtist: req.body.juniorTatArtist,
            midTatArtist: req.body.midTatArtist,
            professionalArtist: req.body.professionalArtist,
            experiencedArtist: req.body.experiencedArtist,
        })
        if(pricing){
            return res.json({
                message: `Pricing has been successfully updated`,
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(400).json({
            error: `${error.message}`
        })   
    }
    }
)


module.exports = bookingRouter;