const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    gallery_id: {
        type: Number,
    }
})

const Gallery = mongoose.model('Gallery', GallerySchema);

module.exports = Gallery;