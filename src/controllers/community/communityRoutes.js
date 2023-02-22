const express = require("express");
const  { createReview, getReviews } = require("./communityController");

// const auth = require("../../middleware/auth.js");
// const admin = require("../../middleware/admin.js");

const communityRouter = express.Router();

communityRouter.get("/reviews", async (req, res) => {
    const reviews = await getReviews();
    return res.json(reviews)
})

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