const express = require('express');

const { registerUser, loginUser, loginAdmin, } = require("./userControllers")
const auth = require("../../middleware/auth")
const userRouter = express.Router();

//This route is used to register a new user
//The function registerUser is called with the name, email, dob, and password as arguments
//If the token is an error, a 400 response is sent with the error data
//Otherwise, the token is sent as a json response

userRouter.post("/register", async (req, res) => {
    try {
    const token = await registerUser({
        name: req.body.name,
        email: req.body.email,
        dob: req.body.dob,
        password: req.body.password
    })
    if(token.error) {
        return res.status(400).json({data: token.error})
    }
    return res.json({ token })
} catch (error) {
    console.error(error)
    return res.status(400).json({
        error: `${error.message}`
    })
    }
})

// This function takes in an object with an email and password, and returns a token if the email and password are correct.
userRouter.post("/", async (req, res) => {
    const token = await loginUser({
        email: req.body.email,
        password: req.body.password
    })
    if(token.error) {
        return res.status(404).json({data: token.error})
    }
    return res.json({ token })
})

// This function is called when a user wants to login as an admin.
// It takes a username and password and returns a token if the user is an admin.
// If the user is not an admin, it returns an error message.

userRouter.post("/admin", async (req, res) => {
    const token = await loginAdmin({
        username: req.body.username,
        password: req.body.password
    })
    if(token.error) {
        return res.status(400).json({data: token.error})
    }
    return res.json({ token })
})

module.exports = userRouter; 