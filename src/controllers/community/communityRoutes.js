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

// This code creates a new review and posts it to the database
// The review class is a class that stores the artistname, description, tips, and rating of a review

communityRouter.post("/reviews", async (req, res) => {
	console.log(req.body);
	try {
		const review = await createReview({
			artistname: req.body.artistname,
			description: req.body.description,
			tips: req.body.tips,
			rating: req.body.rating,
		});
		if (review) {
			return res.json({
				message: `Review has been successfully created, thanks!`,
			});
		}
	} catch (error) {
		console.error(error);
		return res.status(400).json({
			error: `${error.message}`,
		});
	}
});

communityRouter.put("/reviews/:reviewId", async (req, res) => {
	try {
		const review = await updateReview(req.params.reviewId, {
			artistname: req.body.artistname,
			description: req.body.description,
			tips: req.body.tips,
			rating: req.body.rating,
		});
		if (review) {
			return res.json({
				message: `Review has been successfully updated!`,
			});
		}
	} catch (error) {
		console.error(error);
		return res.status(400).json({
			error: `${error.message}`,
		});
	}
});

communityRouter.delete("/reviews/:reviewId", async (req, res) => {
	try {
		const review = await deleteReview(req.params.reviewId, {
			artistname: req.body.artistname,
			description: req.body.description,
			tips: req.body.tips,
			rating: req.body.rating,
		});
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
communityRouter.get("/share", async (req, res) => {
	const share = await getShare();
	return res.json(share);
});
//TODO figure out how to get user_id info out of the token
communityRouter.post("/share",auth, async (req, res) => {
    try {
    const share = await createShare(req.params.userId,{
        title: req.body.title,
        description: req.body.description,
    })
    if(share){
        return res.json({
            message: `Share has been successfully created, thanks!`,
        })
    }
    } catch (error) {
        console.error(error);
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
