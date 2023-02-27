const mongoose = require('mongoose');

const ShareSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    description: {
        type: String,
        required: true,
        validate (value) {
            if(value.length < 25){
                throw new Error('Description must be at least 25 characters')
            }
        }
    }
    
})