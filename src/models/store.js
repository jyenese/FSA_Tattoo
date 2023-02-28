const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    }

})

const Store = mongoose.model('Store', StoreSchema);

module.exports = Store;
