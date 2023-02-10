const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerUser(user) {
    const newUser = await User.create(user)
    return newUser
}

async function loginUser(user) {
    const user = await User.findOne({ email: user.email })
    if (!user) {
        return { error: "User not found" }
    }
    const isMatch = await bcrypt.compare(user.password, user.password)
    if (!isMatch) {
        return { error: "Invalid credentials" }
    }
}
