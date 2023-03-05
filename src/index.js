const mongoose = require('mongoose');
const { app, PORT } = require('./server.js');


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    mongoose.set("strictQuery", true);
    //TODO: Change the database name to your own
    mongoose.connect(process.env.MONGO_URI, () => {
        console.log("Connected to database");
    })
})