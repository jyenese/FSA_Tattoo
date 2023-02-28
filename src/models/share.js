const mongoose = require('mongoose');

const ShareUserSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }, 
}
)

const ShareSchema = new mongoose.Schema({
    user_id: [ShareUserSchema],
    title: {
        type: String,
        required: true,
        validate (value) {
            if(value.length < 5){
                throw new Error('Title must be at least 5 characters')
            }
        }
    },
    description: {
        type: String,
        required: true,
        validate (value) {
            if(value.length < 25){
                throw new Error('Description must be at least 25 characters')
            }
        }
    },
});
ShareUserSchema.virtual('user', {
    localField: 'user_id',
    foreignField: '_id',
    ref: 'User',
});

const Share = mongoose.model('Share', ShareSchema);

module.exports = Share;