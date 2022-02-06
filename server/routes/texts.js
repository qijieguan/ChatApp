const router = require('express').Router();
let Text = require('../models/text.model');
let User = require('../models/user.model');

router.route('/').post((req, res) => {
    const user_id = req.body.user_id;

    Text.find({friends: user_id})
    .then(result => {
        if (result.length === 0) { res.json('Texts not found') }
        else { 
            let friend_id = result[0].friends.filter(el => el !== user_id);
            User.find({_id: friend_id[0]})
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
        if (texts.length === 0) {
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

module.exports = router;