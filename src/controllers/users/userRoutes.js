const express = require('express');

const { registerUser, loginUser, } = require("./userControllers")

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
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
})

userRouter.post("/login", async (req, res) => {
    const token = await loginUser({
        email: req.body.email,
        password: req.body.password
    })
    if(token.error) {
        return res.status(400).json({data: token.error})
    }
    return res.json({ token })
})

module.exports = userRouter;