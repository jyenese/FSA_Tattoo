const mongoose = require('mongoose');

const StylesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
})

const Styles = mongoose.model('Styles', StylesSchema);

module.exports = Styles;