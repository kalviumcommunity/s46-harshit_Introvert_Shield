const mongoose = require('mongoose')

const introvertSchema = new mongoose.Schema({
    Place_Type: {
        type: String,
        required: true,
    },
    Crowd_Density: {
        type: String,
    },
    Seating_Comfort:{
        type: String,
    },
    WiFi_Availability: {
        type: String,
    },
    Image_Link: {
        type: String,
    },
    Posted_By: {
        type: String
    }
})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
})

const Introvert = mongoose.model('introverts', introvertSchema);
const User = mongoose.model('users', userSchema);

module.exports = {Introvert, User}

