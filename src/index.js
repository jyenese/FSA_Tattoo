const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
const userRouters = require('./controllers/users/userRoutes.js');
const bookingRouter = require('./controllers/booking/bookingRoutes.js');
app.use(express.json());

app.use("/bookings", bookingRouter);
app.use("/login", userRouters);

app.get("/", (req, res) => {
    res.json({
        data: "Data has been sent"
    })
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    mongoose.set("strictQuery", true);
    mongoose.connect("mongodb://127.0.0.1:27017/fullstack_tattoo", () => {
        console.log("Connected to database");
    })
})