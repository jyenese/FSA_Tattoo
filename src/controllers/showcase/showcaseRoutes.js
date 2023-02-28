const express = require("express");
const {
	getArtists,
	createArtist,
	deleteArtist,
    getGallery,
    createGallery,
    deleteGallery
} = require("./showcaseController");

const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");

const showcaseRouter = express.Router();

// Get all artists from the database
showcaseRouter.get("/artists", auth, async (req, res) => {
	const artists = await getArtists();
	return res.json(artists);
});



// this adds a new artist to the database
showcaseRouter.post("/artists", admin, async (req, res) => {
	// catch any errors
	try {
		// call the createArtist function to add the new artist to the database
		const artist = await createArtist({
			name: req.body.name,
            yoe: req.body.yoe,
            available: req.body.available,
            link: req.body.link
		});
		// if successful, return a message to the user
		if (artist) {
			return res.json({
				message: `Artist has been successfully created, thanks!`,
			});
		}
	// if an error, log it and return it to the user
	} catch (error) {
		console.error(error);
		return res.status(400).json({
			error: `${error.message}`,
		});
	}
});

// DELETE request to /artists/:artistId
// Delete an artist with the specified ID.
// Admin only.
showcaseRouter.delete("artists/:artistId", admin, async (req, res) => {
	try {
		// Call the deleteArtist function with the artist ID.
		const artist = await deleteArtist(req.params.artistId);
		// Check if the artist exists.
		if (artist) {
			// If the artist exists, return a message.
			return res.json({
				message: `Artist has been successfully deleted!`,
			});
		}
	} catch (error) {
		// If there is an error, return the error.
		console.error(error);
		return res.status(400).json({
			error: `${error.message}`,
		});
	}
});


// GET /gallery endpoint
// Returns a JSON object containing the gallery of images
// Requires authentication
// Used in Gallery component

showcaseRouter.get("/gallery", auth, async (req, res) => {
	const gallery = await getGallery();
	return res.json(gallery);
});

// Create a route handler for the POST /gallery endpoint
// The handler will be user to create a new gallery
showcaseRouter.post("/gallery", admin, async (req, res) => {
    try {
        // Call the createGallery function and pass in the image from the request body
        const gallery = await createGallery({
            image: req.body.image,
        })
        if (gallery) {
            // If the gallery was created, send back a success message
            return res.json({
                message: `Image has been successfully created!`,
            });
        }
    } catch (error) {
        // If there is an error, send back a 400 status code and a custom message
        console.error(error);
        return res.status(400).json({
            error: `${error.message}`,
        });
    }
})

// This route will delete a gallery from the database.
// This route requires the user to be an admin.
// The route will return a message if successful.
// Add a route to handle DELETE requests to delete a gallery
showcaseRouter.delete("/gallery/:galleryId", admin, async (req, res) => {
    try {
        // Call the deleteGallery function and pass in the gallery ID
        const gallery = await deleteGallery(req.params.galleryId);

        // If the gallery was successfully deleted, return a success message
        if (gallery) {
            return res.json({
                message: `Image has been successfully deleted!`,
            });
        }
    } catch (error) {
        // If there is an error, log it and return a failure message
        console.error(error);
        return res.status(400).json({
            error: `${error.message}`,
        });
    }
})

module.exports = showcaseRouter;
