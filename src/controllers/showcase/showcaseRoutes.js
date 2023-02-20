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
    //TODO fix styleId in post and inside the model
    console.log(req.body.styleId)
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
