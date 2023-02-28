const express = require('express');

const { registerUser, loginUser, loginAdmin, } = require("./userControllers")
const auth = require("../../middleware/auth")
const userRouter = express.Router();

// Create a new user account
userRouter.post("/register", async (req, res) => {
    try {
        // Use the registerUser function to create a new user account
        const token = await registerUser({
            name: req.body.name,
            email: req.body.email,
            dob: req.body.dob,
            password: req.body.password
        })
        // Check if there was an error creating the user account
        if(token.error) {
            // Return the error to the client
            return res.status(400).json({data: token.error})
        }
        // Return the token to the client
        return res.json({ token })
    } catch (error) {
        console.error(error)
        // Return the error to the client
        return res.status(400).json({
            error: `${error.message}`
        })
    }
})

// This function takes in an object with an email and password, and returns a token if the email and password are correct.
// Create a new route that handles POST requests to the /login endpoint
userRouter.post("/", async (req, res) => {
    // Wait for the loginUser function to return a value
    const token = await loginUser({
        email: req.body.email,
        password: req.body.password
    })
    // Check if the value returned is an error
    if(token.error) {
        // If it is an error, return a 404 response with the error as the response
        return res.status(404).json({data: token.error})
    }
    // If it is not an error, return a 200 response with the token as the response
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