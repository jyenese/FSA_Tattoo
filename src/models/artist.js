const mongoose = require('mongoose');
// This is the schema for the artist data
// It has 4 fields: name, yoe, available, and link


// Artist was an idea to have a list of artists that are admins and can add their own availability, work, etc. But we didn't have time to implement it. 
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