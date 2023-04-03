const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    poster_id: { type: String, required: true, trim: true },
    poster_image: { type: String, required: true, trim: true },
    poster_name: { type: String, required: true, trim: true },
    post_collection: [{ 
        primary_text: { type: String, trim: true },
        primary_image: { type: String, trim: true },
        replies: [{
            user_id: { type: String, trim: true },
            user_name: { type: String, trim: true },
            reply: { type: String, trim: true }
        }] 
    }]        
},
{
    timestamps: true,
})


const Post = mongoose.model('Post', postSchema);
module.exports = Post;