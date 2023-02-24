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

//Front end connection
const corsOptions = {
    AccessControlAllowOrigin: ["http://127.0.0.1:5173"],
    credentials: true,
    optionSuccessStatus: 200, 
}
app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.json({
        data: "Data has been sent"
    })
})


// ROUTES IN USE
app.use("/bookings", bookingRouter);
app.use("/login", userRouters);
app.use("/showcase", showcaseRouter);
app.use("/community", communityRouter);

module.exports = {
    app,
    PORT
}