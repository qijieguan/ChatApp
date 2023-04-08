const router = require('express').Router();
let Post = require('../models/post.model');

router.route('/').post((req, res) => {
    Post.find()
    .then(result => { res.json(result); })
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/add').post((req, res) => {
    const poster_id = req.body.poster_id;
    const poster_image = req.body.poster_image;
    const poster_name = req.body.poster_name;
    const post = req.body.post;

    Post.find({poster_id})
    .then(result => {
        if (!result.length) {
            const firstPost = new Post({poster_id, poster_image, poster_name, post_collection: [post]})
            firstPost.save()
            .then( result => { 
                res.json("You have successfully made your first post!")
            })
            .catch(err => res.status(400).json("Error " + err));    
        }
        else {
            Post.findOneAndUpdate({poster_id}, {$push: {post_collection: post}})
            .then(
                result => { 
                    res.json("You have successfully made your post!")
                }
            )
            .catch(err => res.status(400).json("Error " + err));   
        }
    })  
    .catch(err => res.status(400).json("Error " + err));  
});


module.exports = router;