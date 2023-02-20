const mongoose = require('mongoose');


const GallerySchema = new mongoose.Schema({
    image:{
        type: String,
        required: true,
    }
})

const Gallery = mongoose.model('Gallery', GallerySchema);

module.exports = Gallery; 