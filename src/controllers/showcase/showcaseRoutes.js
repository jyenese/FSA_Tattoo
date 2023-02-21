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

showcaseRouter.get("/artists", auth, async (req, res) => {
	const artists = await getArtists();
	return res.json(artists);
});

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


showcaseRouter.get("/gallery", auth, async (req, res) => {
	const gallery = await getGallery();
	return res.json(gallery);
});

showcaseRouter.post("/gallery", admin, async (req, res) => {
    try {
        const gallery = await createGallery({
            image: req.body.image,
        })
        if (gallery) {
            console.log("Image has been successfully created!")
            return res.json({
                message: `Image has been successfully created!`,
            });
        }
    } catch (error) {
        console.error("ERROR: " + error);
        return res.status(400).json({
            error: `${error.message}`,
        });
    }
})

showcaseRouter.delete("/gallery/:galleryId", admin, async (req, res) => {
    console.log("Deleting a gallery...")
    try {
        await deleteGallery(req.params.galleryId);
        return res.json({
            message: `Image has been successfully deleted!`,
        });
    } catch (err) {
        return res.json({
            message: `Image has not been deleted!`,
        });
    }
})



module.exports = showcaseRouter;
