const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
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

