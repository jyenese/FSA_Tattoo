const express = require("express");
const {
	createReview,
	getReviews,
	updateReview,
	deleteReview,
	getShare,
	createShare,
    getUserIdForShare,
} = require("./communityController");

const auth = require("../../middleware/auth.js");
// const admin = require("../../middleware/admin.js");

const communityRouter = express.Router();

// This function returns all the reviews in the database.
communityRouter.get("/reviews", async (req, res) => {
	const reviews = await getReviews();
	return res.json(reviews);
});

// define a new route that accepts POST requests to the /reviews endpoint
communityRouter.post("/reviews", async (req, res) => {
	// log the request body to the console for debugging
	console.log(req.body);
	try {
		// call the createReview function
		const review = await createReview({
			// pass the artistname, description, tips and rating properties from the request body to the createReview function
			artistname: req.body.artistname,
			description: req.body.description,
			tips: req.body.tips,
			rating: req.body.rating,
		});
		// check if the review was created
		if (review) {
			// send a JSON response with a success message
			return res.json({
				message: `Review has been successfully created, thanks!`,
				review: review,
			});
		}
	} catch (error) {
		// log the error to the console for debugging
		console.error(error);
		// send a JSON response with an error message
		return res.status(400).json({
			error: `${error.message}`,
		});
	}
});

communityRouter.put("/reviews/:reviewId", async (req, res) => {
	try {
		// Get reviewId from request parameters
		const review = await updateReview(req.params.reviewId, {
			// Get artistname, description, tips, and rating from request body
			artistname: req.body.artistname,
			description: req.body.description,
			tips: req.body.tips,
			rating: req.body.rating,
		});
		if (review) {
			return res.json({
				// Return message to the client
				message: `Review has been successfully updated!`,
			});
		}
	} catch (error) {
		console.error(error);
		return res.status(400).json({
			// Return error message to the client
			error: `${error.message}`,
		});
	}
});

// This is the delete request to the API endpoint /reviews/:reviewId
// It will delete the review that matches the reviewId in the API endpoint
communityRouter.delete("/reviews/:reviewId", async (req, res) => {
	try {
		// This will call the deleteReview function from the database.js file
		// which will delete the review from the database
		const review = await deleteReview(req.params.reviewId, {
			artistname: req.body.artistname,
			description: req.body.description,
			tips: req.body.tips,
			rating: req.body.rating,
		});
		// If the review has been deleted, then it will send a message to the user
		if (review) {
			return res.json({
				message: `Review has been successfully deleted!`,
			});
		}
	} catch (error) {
		console.error(error);
		return res.status(400).json({
			error: `${error.message}`,
		});
	}
});

// Create a new GET route to retrieve the current share price
communityRouter.get("/share", async (req, res) => {
	// Retrieve the share price from the blockchain
	const share = await getShare();
	// Return the share price as JSON
	return res.json(share);
});

// Create a new share
communityRouter.post("/share",auth, async (req, res) => {
    try {
        // Get the user ID from the request parameters
        const share = await createShare({
            // Get the share
            title: req.body.title,
            description: req.body.description,
        })
        // If the share was created successfully
        if(share){
            // Return a success message
            return res.json({
                message: `Share has been successfully created, thanks!`,
            })
        }
        // If the share was not created successfully
        else{
            // Return an error message
            return res.status(400).json({
                error: `Unable to create share`,
            });
        }
    } 
    // If there was an error
    catch (error) {
        console.error(error);
        // Return an error message
        return res.status(400).json({
            error: `${error.message}`,
        });
    }
})

// communityRouter.post("/share", auth, async (req, res) => {
//     const user = await getUserId(req.params.user_id)
//     if(user){
//         try {
//             const share = await createShare({
//                 user_id: req.body.user_id,
//                 description: req.body.description,
//                 date: req.body.date,
//             });
//             if (share) {
//                 return res.json({
//                     message: `Share has been successfully created, thanks!`,
//                 });
//             }
//         } catch (error) {
//             console.error(error);
//             return res.status(400).json({
//                 error: `${error.message}`,
//             });
//         }
//     }
// })

module.exports = communityRouter;
