const mongoose = require("mongoose");

const Employee = new mongoose.Schema({
    name: {
        type: String, required: true,
    }, role: {
        type: String, required: true,
    }, team: {
        type: String, required: true,
    }, id: {
        type: String, required: true,
    }, password: {
        type: String, required: true,
    }
});
const User = mongoose.model('User', Employee);
module.exports = User;