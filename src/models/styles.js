const mongoose = require('mongoose');

const StylesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const Styles = mongoose.model('Styles', StylesSchema);

module.exports = Styles;