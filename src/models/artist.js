const mongoose = require('mongoose');


//TODO fix the schema validation
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