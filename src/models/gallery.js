const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    style_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Style',
    }
})

const Gallery = mongoose.model('Gallery', GallerySchema);

module.exports = Gallery;