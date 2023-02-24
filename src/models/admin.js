// The schema defines the structure of the data in the database.
// The schema also provides methods for accessing the data.
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    username: String,
    password: String,
})

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;