const mongoose = require("mongoose");

const TeamsGroup = new mongoose.Schema({
    team: {
        type: String,
        required: true
    },
    employees: [
        {
            id: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        }
    ],
    active: {
        type: Boolean,
        required: true
    }
});
const Teams = mongoose.model('Teams', TeamsGroup);
module.exports = Teams;