const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const textObjSchema = new Schema({
    user_id: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true }
},
{
    timestamps: true,   
}
);

const textSchema = new Schema({
    users: {
        type: Array,
        required: true,
        trim: true,
        minlength: 2
    },
    texts: [textObjSchema],
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