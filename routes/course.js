const express = require("express");
const courseRouter = express.Router();
const multer = require("multer");

//const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './uploads/courseImg/');
//     },
//     filename: function(req, file, cb) {
//         cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
//     }
// });

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/courseImg/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname )
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
    storage: storage
});

// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     },
//     fileFilter: fileFilter
// });


const course = require('../controller/course');

courseRouter.post('/addcourse',course.addCourse);

courseRouter.post('/addcourseimg',upload.single('courseImage'),course.addCourseImg);

courseRouter.get('/getallcourse',course.getAllcourse);

module.exports = courseRouter;
