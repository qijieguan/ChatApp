const router = require('express').Router();
let Friend = require('../models/friend.model');



router.route('/init').post((req, res) => {
    const user_id = req.body.user_id;
    const friends = [];
    const newFriend = new Friend({user_id, friends});
    newFriend.save()
    .then(() => res.json("Friend Container is Initialized"))
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/').post((req, res) => {
    const user_id = req.body.user_id;
    
    Friend.find({user_id: user_id})
    .then(result => res.json(result[0].friends))
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/count').post((req, res) => {
    const user_id = req.body.user_id;

    Friend.find({user_id: user_id})
    .then(result => { res.json(result[0].friends.length)})
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/add').post((req, res) =>{
    const user_id = req.body.user_id;
    const friend_id = req.body.friend_id;

    Friend.find({$and: [{user_id: user_id}, {friends: friend_id}]})
    .then(result => {
        if (!result.length) {
            Friend.updateOne({user_id: user_id}, {$push: {friends: friend_id}})
            .then(() => {})
            .catch(err => res.status(400).json("Error " + err));
            Friend.updateOne({user_id: friend_id}, {$push: {friends: user_id}})
            .then(() => res.json(friend_id))
            .catch(err => res.status(400).json("Error " + err));
        }
    })
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/delete').post((req, res) => {
    const user_id = req.body.user_id;
    const friend_id = req.body.friend_id;

    Friend.updateMany({user_id: {$in: [user_id, friend_id]}}, {$pull : {friends: {$in: [user_id, friend_id]}}})
    .then(() => res.json("User is unfriended"))
    .catch(err => res.status(400).json("Error " + err));
});

module.exports = router;