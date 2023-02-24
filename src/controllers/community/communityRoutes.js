const express = require("express");
const  { createReview, getReviews } = require("./communityController");

// const auth = require("../../middleware/auth.js");
// const admin = require("../../middleware/admin.js");

const communityRouter = express.Router();

// This function returns all the reviews in the database.
communityRouter.get("/reviews", async (req, res) => {
    const reviews = await getReviews();
    return res.json(reviews)
})

// This code creates a new review and posts it to the database
// The review class is a class that stores the artistname, description, tips, and rating of a review

communityRouter.post("/reviews",async (req, res) => {
    console.log(req.body)
    try {
        const review = await createReview({
            artistname: req.body.artistname,
            description: req.body.description,
            tips: req.body.tips,
            rating: req.body.rating,
        })
        if(review){
            return res.json({
                message: `Review has been successfully created, thanks!`,
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(400).json({
            error: `${error.message}`
        })   
    }
    
})

module.exports = communityRouter;