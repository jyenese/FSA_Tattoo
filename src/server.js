const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require("dotenv").config()

const userRouters = require('./controllers/users/userRoutes.js');
const bookingRouter = require('./controllers/booking/bookingRoutes.js');
const showcaseRouter = require('./controllers/showcase/showcaseRoutes.js');
const communityRouter = require('./controllers/community/communityRoutes.js');

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(helmet())

const corsOptions = {
    origin: ["http://localhost:3005"],
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.json({
        data: "Data has been sent"
    })
})

app.use("/bookings", bookingRouter);
app.use("/login", userRouters);
app.use("/showcase", showcaseRouter);
app.use("/community", communityRouter);

module.exports = {
    app,
    PORT
}