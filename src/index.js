const mongoose = require('mongoose');
const { app, PORT } = require('./server.js');


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    mongoose.set("strictQuery", true);
    //TODO: Change the database name to your own
    mongoose.connect("mongodb://127.0.0.1:27017/fullstack_tattoo", () => {
        console.log("Connected to database");
    })
})