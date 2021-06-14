const mongoose = require("mongoose");

const empReview = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    feedback: {
        comment: {
            type: String,
            required: true
        },
        rating: {
            type: String,
            required: true
        }
    }

});
const Review = mongoose.model('empReview', empReview);
module.exports = Review;