const mongoose = require('mongoose');
// This is the schema for the artist data
// It has 4 fields: name, yoe, available, and link

const ArtistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    yoe: {
        type: String,
        required: true,
    },
    available: {
        type: Boolean,
        required: true,
    },
    link:{
        type: String,
        required: true,
    }
})

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;