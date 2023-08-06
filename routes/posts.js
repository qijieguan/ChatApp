const router = require('express').Router();
let Post = require('../models/post.model');

const mongoose = require("mongoose");

router.route('/user-post').get((req, res) => {
    Post.find()
    .then(result => { res.json(result); })
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/count').post((req, res) => {
    const poster_id = req.body.poster_id;

    Post.find({poster_id: poster_id})
    .then(result => { res.json(result) })
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/user-post/add').post((req, res) => {
    const poster_id = req.body.poster_id;
    const poster_image = req.body.poster_image;
    const poster_name = req.body.poster_name;
    const post = req.body.post;

    const postObj = new Post({poster_id, poster_image, poster_name, post});

    postObj.save()
    .then(result => { res.json("You have successfully made your first post!") })
    .catch(err => res.status(400).json("Error " + err));     
   
});

router.route('/user-post/delete').post((req, res) => {
    const post_id = req.body.post_id;

    Post.findOneAndDelete({_id: post_id})
    .then(result => res.json())
    .catch(err => res.status(400).json("Error " + err));  
});

router.route('/user-post/get-data').post((req, res) => {
    const post_id = req.body.post_id;

    Post.find({_id: post_id})
    .then(result => { res.json(result[0])})
    .catch(err => res.status(400).json("Error " + err));  
});

router.route('/user-post/update-likes').post((req, res) => {
    const post_id = req.body.post_id;
    const likes = req.body.likes;

    Post.updateOne(
        {'_id': post_id},
        {$set: {'post.likes': likes}},
    )
    .then(result => { res.json(result) })
    .catch(err => res.status(400).json("Error " + err));  
});

router.route('/user-post/post-comment').post((req, res) => {
    const post_id = req.body.post_id;
    const comment = req.body.comment;

    Post.updateOne(
        {'_id': post_id},
        {$push: {'post.comments': comment}}
    )
    .then(result => { res.json("Comment posted successfully!") })
    .catch(err => res.status(400).json("Error " + err));  
});


module.exports = router;