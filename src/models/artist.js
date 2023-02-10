const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
    email: String,
    password: String,
})

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;