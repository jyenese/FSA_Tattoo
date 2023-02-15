const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const Artist = require('../../models/artist');

async function registerUser(user) {
    const existingUser = await User.findOne({ email: user.email })
    if (existingUser) {
        return { error: "Email address already exists" }
    }
    const hashedPassword = await bcrypt.hash(user.password, 10)
    const userCreated = await User.create({
        name: user.name,
        email: user.email,
        dob: user.dob,
        password: hashedPassword
    })
    const payload = {
        id: userCreated._id,
    }
    const token = jwt.sign(payload, "secret")
    return token
}

async function loginUser(user) {
    // TODO(jyenese): finish off loginuser function
    const existingUser = await User.findOne({ email: user.email })
    if(!existingUser) {
        return { error: "Email or password is incorrect" }
    }
    const passwordMatch = await bcrypt.compare(user.password, existingUser.password)
    if(!passwordMatch) {
        return { error: "Email or password is incorrect" }
    }
    const payload = {
        id: existingUser._id,
    }
    const token = jwt.sign(payload,"secret")
    return token
}

async function loginArtist(user) {
    
}

module.exports = {
    registerUser,
    loginUser,
}