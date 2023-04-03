const router = require('express').Router();
let User = require('../models/user.model');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/select').post((req, res) => {
    const user_id = req.body.user_id;

    User.find({_id: user_id})
    .then(user => res.json(user[0]))
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/').post((req, res) => {
    const friend_ids = req.body.friend_ids;
   
    User.find({_id: {$in: friend_ids}})
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/register').post((req, res) => {
    const username = req.body.username;
    let password = req.body.password;
    const profile_url = req.body.profile_url;
    const background_url = "https://res.cloudinary.com/dliw7yyw3/image/upload/v1680358335/Upload/orange-1247700_960_720_nxwb4v.jpg";
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const bio_content = "";
    const photo_album = [profile_url];

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) { console.log(err) }
        else {
            password = hash;
            const newUser = new User({username, password, profile_url, background_url, firstname, lastname, bio_content, photo_album});
            newUser.save()
            .then(user => res.json(user))
            .catch(err => res.status(400).json("Error " + err));     
        }
    });    
});

router.route('/login').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.find({username: username}) 
    .then(user => {
        bcrypt.compare(password, user[0].password, (err, response) => {
            if (err) { return; }
            if (response) { 
                const id = user[0]._id;
                const token = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: 300});
                res.json(token); 
            }
            else { res.json("Invalid Username/Password combinations!") }
        });
    })
    .catch(err => res.status(400).json("Error " + err));
});

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    
    if (!token) { res.send({auth: false, message: "Token is missing!", error: true}); }
    else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) { res.send({auth: false, message: "Authentication failed!", error: true}); }
            else { req.userID = decoded.id; next(); }
        });
    }
}

router.route('/auth').get(verifyJWT, (req, res) => { 
    res.send({ auth: true, message: "User successfully authenticated!" });
});

router.route('/load').post((req, res) => {
    const username = req.body.username;

    User.find({username: username})
    .then(user => {res.json(user[0])})
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/edit_bio').post((req, res) => {
    const user_id = req.body.user_id;
    const bio_content = req.body.bio_content;

    User.findOneAndUpdate({_id: user_id}, {$set: {bio_content: bio_content}})
    .then(res.json("Bio is updated!"))
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/upload_photo').post((req, res) => {
    const user_id = req.body.user_id;
    const url = req.body.url;

    User.findOneAndUpdate({_id: user_id}, {$push : {photo_album: url}})
    .then(() => res.json())
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/change_photo').post((req, res) => {
    const user_id = req.body.user_id;
    const url = req.body.url;

    User.findOneAndUpdate({_id: user_id}, {$set : {profile_url: url}})
    .then(() => res.json())
    .catch(err => res.status(400).json("Error " + err));
});

module.exports = router;