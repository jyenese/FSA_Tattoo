const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    username: String,
    password: String,
})

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;