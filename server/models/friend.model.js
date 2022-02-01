const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const friendSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    friends: {
        type: Array,
        trim: true,
    }
},
{
    timestamps: true,   
});

const Friend = mongoose.model('Friend', friendSchema);
module.exports = Friend;