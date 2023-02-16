const express = require('express');

const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

const showcaseRouter = express.Router();

showcaseRouter.get("/",auth, async (req, res) => {
    const artists = await getArtists();
    return res.json(artists)
})

showcaseRouter.post("/", admin, async (req, res) => {
    const artist = await createArtist({
        name: req.body.name,
        styleSpeciality: req.body.styleSpeciality,
        workedAsArtist: req.body.workedAsArtist,
        availablity: req.body.availablity,
    })
    if(artist){
        return res.json({
            message: `Artist has been successfully created, thanks!`,
        })
    }
})