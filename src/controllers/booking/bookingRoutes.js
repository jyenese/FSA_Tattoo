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



bookingRouter.get("/", admin, async (req, res) => {
    const bookings = await getBookings();
    return res.json(bookings)
})

bookingRouter.post("/new",auth,async (req, res) => {
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

bookingRouter.get("/new/:userId",admin, async (req, res) => {
    const booking = await getBookingsByUserId(req.params.userId);
    if(!booking){
        return res.status(404).json({
            error: "Booking not found"
        })
    }
    return res.json(booking)
})

bookingRouter.get("/list/:bookingId", admin, async (req, res) => {
    const booking = await getBookingsById(req.params.bookingId);
    if(!booking){
        return res.status(404).json({
            error: "Booking not found"
        })
    }
    return res.json(booking)
})

bookingRouter.get("/pricing", async (req, res) => {
    const pricing = await getPricing();
    return res.json(pricing)
})

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
            error: `error creating pricing: ${error.message}`
        })   
    }
    }
)

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
            error: `error updating pricing: ${error.message}`
        })   
    }
    }
)


module.exports = bookingRouter;