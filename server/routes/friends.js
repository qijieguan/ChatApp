const router = require('express').Router();
let Friend = require('../models/friend.model');

router.route('/').post((req, res) => {
    const user_id = req.body.user_id;
    Friend.find({user_id: user_id})
    .then(result => res.json(result[0].friends))
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/add').post((req, res) =>{
    const user_id = req.body.user_id;
    const friend_id = req.body.friend_id;

    Friend.find({user_id: user_id})
    .then(result => {
        if (result.length === 0) {
            const friends = [friend_id];
            const newFriend = new Friend({user_id, friends});
            newFriend.save()
            .then(() => res.json(friend_id))
            .catch(err => res.status(400).json("Error " + err));
        }
        else {
            result[0].friends.push(friend_id);
            result[0].save()
            .then(() => res.json(friend_id))
            .catch(err => res.status(400).json("Error " + err));
        }
    })
    .catch(err => res.status(400).json("Error " + err));
});

module.exports = router;