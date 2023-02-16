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

async function loginArtist(artist){
    const existingArtist = await Artist.findOne({ email: artist.email })
    if(!existingArtist) {
        return { error: "Email or password is incorrect" }
    }
    const passwordMatch = await bcrypt.compare(artist.password, existingArtist.password)
    if(!passwordMatch) {
        return { error: "Email or password is incorrect" }
    }
    const payload = {
        id: existingArtist._id,
    }
    const token = jwt.sign(payload,"secret")
    return token
}

module.exports = {
    registerUser,
    loginUser,
    loginArtist,
}