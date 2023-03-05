const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const Admin = require('../../models/admin');

const SECRET = process.env.JWT_SECRET || "secret"

// This function registers a user by checking if the user already exists, 

// hashing the password, creating a user, and then signing a JWT with the user's ID as the payload.

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
    const token = jwt.sign(payload, SECRET)
    return token
}

// This function takes a user object as a parameter and checks if the user already exists in the database. 
//If the user does not exist, the function returns an error message. 
//If the user exists, the function checks if the password provided by the user matches the password in the database. 
//If the password does not match, the function returns an error message. 
//If the password matches, the function creates a new token using the user's id and returns the token.

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
    const token = jwt.sign(payload,SECRET)
    return token
}

async function loginAdmin(user){
// TODO: fix up the login for Admin [wont work]
    const existingAdmin = await Admin.findOne({ username: user.username })
    if(!existingAdmin) {
        return { error: "Email or password is incorrect" }
    }
    const passwordMatch = await bcrypt.compare(user.password, existingAdmin.password)
    if(!passwordMatch) {
        return { error: "Email or password is incorrect" }
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