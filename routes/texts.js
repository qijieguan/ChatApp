const router = require('express').Router();
let Text = require('../models/text.model');
let User = require('../models/user.model');

router.route('/').post((req, res) => {
    const user_id = req.body.user_id;

    Text.find({friends: user_id})
    .then(result => {
        if (!result.length) { res.json([]) }
        else { 
            let friend_ids = [];
            result.forEach(element => {
                friend_ids.push((element.friends.filter(id => id !== user_id))[0]);
            });
            User.find({_id: friend_ids})
            .then(user => res.json(user))
            .catch(err => res.status(400).json("Error " + err));
        }
    })
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/select').post((req, res) => {
    const friends = [req.body.user_id, req.body.friend_id];

    Text.find({friends: {$all: friends}})
    .then(texts => res.json(texts[0]))
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/add').post((req, res) => {
    const friends = [req.body.user_id, req.body.friend_id];
    const text = {user_id: req.body.user_id, content: req.body.content};

    Text.find({friends: {$all: friends}})
    .then(texts => {
        if (!texts.length) {
            const newFriend = new Text({friends, text});
            newFriend.save()
            .then(() => res.json())
            .catch(err => res.status(400).json("Error " + err));
        }
        else {
            Text.updateOne({friends: {$all: friends}}, {$push: {text: text}})
            .then(() => res.json())
            .catch(err => res.status(400).json("Error " + err));
        }
    })
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/delete').post((req, res) => {
    const friends = [req.body.user_id, req.body.friend_id];
    Text.deleteOne({friends: {$all: friends}})
    .then(() => res.json())
    .catch(err => res.status(400).json("Error " + err));
});


module.exports = router;