const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const communitySchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    profile_url: {
        type: String,
        trim: true,
    },
    banner_url: {
        type: String,
        trim: true,
    },
    background_url: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    members: [
        {
            member_id: { type: String, trim: true },
            member_name: { type: String, trim: true },
            member_profile: { type: String, trim: true }
        }
    ],
    posts: [
        {
            poster_id: { type: String, trim: true },
            poster_image: { type: String, trim: true },
            poster_name: { type: String, trim: true },
            primary_text: { type: String, trim: true },
            primary_image: { type: String, trim: true },
            likes: [{ type: String, trim: true }],
            comments: [{
                user_profile: { type: String, trim: true },
                user_name: { type: String, trim: true },
                comment: { type: String, trim: true },
                replies: [{ 
                    user_profile: { type: String, trim: true },
                    user_name: { type: String, trim: true },
                    reply: { type: String, trim: true },
                }],
            }] 
        }
    ]
},
{
    timestamps: true,   
});

const Community = mongoose.model('Community', communitySchema);
module.exports = Community;