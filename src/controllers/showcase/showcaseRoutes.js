const express = require('express');
const { getArtists, createArtist, deleteArtist } = require('./showcaseController');

const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

const showcaseRouter = express.Router();


showcaseRouter.get("/artists",auth, async (req, res) => {
    const artists = await getArtists();
    return res.json(artists)
})

showcaseRouter.post("/artists", admin, async (req, res) => {
    try {
    const artist = await createArtist({
        name: req.body.name,
        styleSpeciality: req.body.styleSpeciality,
        workedAsArtist: req.body.workedAsArtist,
        availability: req.body.availability,
    })
    if(artist){
        return res.json({
            message: `Artist has been successfully created, thanks!`,
        })
    }
    } catch (error) {
        console.error(error)
        return res.status(400).json({
            error: `error creating artist: ${error.message}`
        })   
    }

})

showcaseRouter.delete("artists/:artistId", admin, async (req, res) => {
    try {
        const artist = await deleteArtist(req.params.artistId);
        if(artist){
            return res.json({
                message: `Artist has been successfully deleted, thanks!`,
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(400).json({
            error: `error deleting artist: ${error.message}`
        })   
    }
} )

module.exports = showcaseRouter;