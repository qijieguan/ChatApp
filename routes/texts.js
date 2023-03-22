const router = require('express').Router();
let Text = require('../models/text.model');
let User = require('../models/user.model');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});

router.route('/').post((req, res) => {
    const user_id = req.body.user_id;

    Text.find({users: user_id})
    .then(texts => {
        if (!texts.length) { res.json([]) }
        else { 
            let friend_ids = [];
            texts.forEach(text => { 
                friend_ids.push((text.users.filter(id => id !== user_id))[0]); 
            });
            User.find({_id: friend_ids})
            .then(users => { res.json(users); })
            .catch(err => res.status(400).json("Error " + err));
        }
    })
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/preview').post((req, res) => {
    const users = [req.body.user_id, req.body.friend_id];

    Text.find({users: {$all: users}})
    .then(texts => res.json(texts[0].preview))
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/select').post((req, res) => {
    const users = [req.body.user_id, req.body.friend_id];

    Text.find({users: {$all: users}})
    .then(texts => res.json(texts[0]))
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/add').post((req, res) => {
    const users = [req.body.user_id, req.body.friend_id];
    const text = {user_id: req.body.user_id, content: req.body.content};
    const preview = req.body.content;

    Text.find({users: {$all: users}})
    .then(texts => {
        if (!texts.length) {
            const texts = text;
            const newFriend = new Text({users, texts, preview});
            newFriend.save()
            .then(() => res.json())
            .catch(err => res.status(400).json("Error " + err));
        }
        else {
            Text.updateOne({users: {$all: users}}, {$push: {texts: text}, $set: {preview: preview}})
            .then(() => res.json())
            .catch(err => res.status(400).json("Error " + err));
        }
    })
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/delete').post((req, res) => {
    const users = [req.body.user_id, req.body.friend_id];
    Text.find({users: {$all: users}})
    .then(result => {
        result.forEach(texts => {
            texts.texts.forEach(text => {
                if (text.content.includes('cloudinary')) {
                    let parseURL = text.content.split("/");
                    let public_id = "";

                    parseURL = parseURL[parseURL.length - 1];
                    parseURL = parseURL.split('.');
                    public_id = parseURL[0];

                    cloudinary.uploader.destroy("Upload/" + public_id, {type : 'upload', resource_type : 'image'});
                }    
            });
        });

      
        Text.deleteOne({users: {$all: users}})
        .then(() => res.json())
        .catch(err => res.status(400).json("Error " + err));
      
    })
    .catch(err => res.status(400).json("Error " + err));
});


module.exports = router;