const express = require('express');
const { getArtists, createArtist, deleteArtist, getStyles, createStyles, deleteStyles  } = require('./showcaseController');

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
                message: `Artist has been successfully deleted!`,
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(400).json({
            error: `error deleting artist: ${error.message}`
        })   
    }
} 
)

showcaseRouter.get("/styles", auth, async (req, res) => {
    const styles = await getStyles();
    return res.json(styles)
})

showcaseRouter.post("/styles", admin, async (req, res) => {
    try {
    const style = await createStyles({
        title: req.body.title,
        description: req.body.description,
    })
    if(style){
        return res.json({
            message: `Style has been successfully created!`,
        })
    }
    } catch (error) {
        console.error(error)
        return res.status(400).json({
            error: `error creating style: ${error.message}`
        })   
    }

})

showcaseRouter.delete("/styles/:styleId", admin, async (req, res) => {    
    try {
        const style = await deleteStyles(req.params.styleId);
        if(style){
            return res.json({
                message: `Style has been successfully deleted!`,
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(400).json({
            error: `error deleting style: ${error.message}`
        })   
    }
})


module.exports = showcaseRouter;