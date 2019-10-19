const express = require("express");
const router = express.Router();
const multer = require("multer");
 //const upload = multer({dest: 'uploads/'});
const categories = require('../controller/categories');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.get('/',(req,res) => {
    res.status(200).send("got router");
});

router.post('/addcategory',upload.single('productImage'),categories.addCategory);

router.post('/addsubcategory',categories.addSubcategory);

router.get('/getallcategory',categories.getAllcategory);

router.get('/getallsubcategory',categories.getAllsubcategory);

module.exports = router;
