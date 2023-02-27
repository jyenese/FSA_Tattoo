const mongoose = require('mongoose');

// Create a user schema to validate against
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate (value) {
            if(value.length < 2){
                throw new Error('Name must be at least 2 characters')
            }
        }
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return value.includes("@")
            },
            message: "must include an @ symbol"
        }
    },
    dob: {
        type: Date,
        required: true
    },
    password: String,
})
const User = mongoose.model('User', UserSchema);

module.exports = User;

