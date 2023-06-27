const router = require('express').Router();
let Community = require('../models/community.model');

router.route('/init').post((req, res) => {
    const communities = req.body.communities;

    Community.insertMany(communities)
    .then(() => res.json("Preset Communities are Added"))
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/').get((req, res) => {
    Community.find()
    .then((result) => res.json(result))
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/get').post((req, res) => {
    const member_id = req.body.member_id;
    
    Community.find(
        {'members.member_id': member_id}
    )
    .then(result => res.json(result))
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/view').post((req, res) => {
    const community_id = req.body.community_id;
    
    Community.findOne({'_id': community_id})
    .then(result => res.json(result))
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/join').post((req, res) => {
    const community_id = req.body.community_id;
    const member = req.body.member;
    
    Community.updateOne({_id: community_id}, {$push: {members: member}})
    .then(result => res.json("Joined community successfully!"))
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/leave').post((req, res) => {
    const community_id = req.body.community_id;
    const member_id = req.body.member_id;
    
    Community.updateOne(
        {_id: community_id}, {$pull: {members : {member_id: member_id}}}
    )
    .then(result => res.json("Leave community successfully!"))
    .catch(err => res.status(400).json("Error " + err));
});


module.exports = router;