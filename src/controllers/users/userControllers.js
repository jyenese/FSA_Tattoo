const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const Admin = require('../../models/Admin');

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

async function loginAdmin(user){
// TODO: take out [a] and [b] tags on errors
// TODO: fix up the login for Admin [wont work]
    const existingAdmin = await Admin.findOne({ username: user.username })
    if(!existingAdmin) {
        return { error: "[a]Email or password is incorrect" }
    }
    const passwordMatch = await bcrypt.compare(user.password, existingAdmin.password)
    if(!passwordMatch) {
        return { error: "[b]Email or password is incorrect" }
    }
    const payload = {
        id: existingAdmin._id,
        is_admin: true,
    }
    const token = jwt.sign(payload,"secret")
    return token
}

module.exports = {
    registerUser,
    loginUser,
    loginAdmin,
}