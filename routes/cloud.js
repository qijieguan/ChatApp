const router = require('express').Router();
const cloudinary = require('../utils/cloudinary');

const fs = require('fs');

const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' +file.originalname)
  }
})

const upload = multer({ storage: storage }).single('file');

const uploadImage = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
          res.sendStatus(500);
        }
        req.imagePath = req.file.path;
        next();
    });
};

router.route('/upload-image').post(uploadImage, async (req, res) => {
    let imageURL = '';

    await cloudinary.uploader.upload(req.imagePath, {folder: 'Upload'}, (err, result) => { 
        if (err) return err;
        imageURL = result.secure_url;
    })
    .then(() => {
        fs.unlink(req.imagePath, function (err) {
            if (err) throw err;
        });
        res.json(imageURL);
    })
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/get-background-images').get((req, res) => {
  cloudinary.search
  .expression('folder:"Background"')
  .max_results(30)
  .execute()
  .then(result=> {
    let search = result.resources;
    let bg_images = [];
    
    search.forEach(image => {
      bg_images.push(image.secure_url);
    });

    res.json(bg_images);
  });
});

module.exports = router;