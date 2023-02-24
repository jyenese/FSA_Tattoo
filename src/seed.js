// This code connects to the database, 
// deletes anything in the "admin" collection, and creates a new admin account with the username "admin" and password "password". 

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Admin = require('./models/admin');

mongoose.connect('mongodb://127.0.0.1:27017/fullstack_tattoo',async () => {
    await Admin.deleteMany({})
    const hashedPassword = await bcrypt.hash("password", 10)
    const admin = await Admin.create({
        username: "admin",
        password: hashedPassword
    })
    console.log(admin)
    mongoose.connection.close()
})