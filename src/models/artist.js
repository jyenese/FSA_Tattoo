const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    styleSpeciality: {
        type: String,
        required: true
    },
    workedAsArtist: {
        type: String,
        required: true
    },
    availablity: {
        type: Boolean,
        required: true
    }
})

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;