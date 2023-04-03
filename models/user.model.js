const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 5
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    profile_url : {
        type: String,
        required: true,
        trim: true,
    },
    background_url : {
        type: String,
        required: true,
        trim: true,
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    bio_content: {
       type: String, 
       trim: true
    },
    photo_album: {
        type: Array,
        required: true,
        trim: true,
        minlength: 1
    },
},
{
    timestamps: true,   
});

const User = mongoose.model('User', userSchema);
module.exports = User;