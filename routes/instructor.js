const express = require("express");
const instructorRoutes = express.Router();
const multer = require('multer');
const instructor = require('../controller/instructor');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/instructor/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
    }
        cb(null, false);
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

instructorRoutes.post('/addinstructor',upload.single('instructorImage'),instructor.addInstructor);
instructorRoutes.post('/addinstructorimg',upload.single('instructorImage'),instructor.addinstructorImg);
instructorRoutes.get('/getallinstructor',instructor.getallInstructor);

module.exports = instructorRoutes;
