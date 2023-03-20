const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const textSchema = new Schema({
    users: {
        type: Array,
        required: true,
        trim: true,
        minlength: 2
    },
    texts: [{
        user_id: { type: String, trim: true },
        content: { type: String, trim: true }
    }],
    preview: {
        type: String,
        trim: true
    }
},
{
    timestamps: true,   
});

const Text = mongoose.model('Text', textSchema);
module.exports = Text;