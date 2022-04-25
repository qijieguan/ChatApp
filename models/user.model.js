const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    image_url : {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    bio_content: {
       type: String, 
       trim: true
    }
},
{
    timestamps: true,   
},
{ strict: false }
);

const User = mongoose.model('User', userSchema);
module.exports = User;