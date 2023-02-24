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

// Create a new artist.
// Requires admin privileges.
// The artist's name, years of experience, availability, and link are required.
// If the artist is successfully created, the response will be a JSON object with a message.
// If the artist is not successfully created, the response will be a JSON object with an error.

showcaseRouter.post("/artists", admin, async (req, res) => {
	try {
		const artist = await createArtist({
			name: req.body.name,
            yoe: req.body.yoe,
            available: req.body.available,
            link: req.body.link
		});
		if (artist) {
			return res.json({
				message: `Artist has been successfully created, thanks!`,
			});
		}
	} catch (error) {
		console.error(error);
		return res.status(400).json({
			error: `${error.message}`,
		});
	}
});

// Deletes artist and returns success message, or error message if artist does not exist

showcaseRouter.delete("artists/:artistId", admin, async (req, res) => {
	try {
		const artist = await deleteArtist(req.params.artistId);
		if (artist) {
			return res.json({
				message: `Artist has been successfully deleted!`,
			});
		}
	} catch (error) {
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

// This route creates a new gallery object in the database
// It takes the image url from the request body and saves it
// The route is only accessible by a user with admin privileges

showcaseRouter.post("/gallery", admin, async (req, res) => {
    try {
        const gallery = await createGallery({
            image: req.body.image,
        })
        if (gallery) {
            return res.json({
                message: `Image has been successfully created!`,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            error: `${error.message}`,
        });
    }
})

// This route will delete a gallery from the database.
// This route requires the user to be an admin.
// The route will return a message if successful.

showcaseRouter.delete("/gallery/:galleryId", admin, async (req, res) => {
    try {
        const gallery = await deleteGallery(req.params.galleryId);
        if (gallery) {
            return res.json({
                message: `Image has been successfully deleted!`,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            error: `${error.message}`,
        });
    }
})

module.exports = showcaseRouter;
