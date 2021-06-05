const { number } = require('@hapi/joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1000,
        min: 6
    },
    country: {
        type: String,
        required: true,
        max:1000
    },
    // confirm_password:{
    //     type: String,
    //     required: true,
    //     max:1000
    // },
    contact_number:{
        type: Number,
        required: true,
        minLength: 11,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
