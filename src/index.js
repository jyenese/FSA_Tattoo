const express = require('express');
const app = express();
const PORT = 3000;
const bookingRouter = require('./controllers/booking/bookingRoutes.js');

app.use("/bookings", bookingRouter);

app.get("/", (req, res) => {
    res.json({
        data: "Data has been sent"
    })
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})