const express = require("express");
const studentRoutes = express.Router();
const student = require('../controller/student');
const multer = require("multer");
const _ = require('lodash');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/student/');
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

studentRoutes.post('/addstudent/',upload.single('studentImage'),student.addStudent);
studentRoutes.post('/deletestudent/',student.deleteStudent);
studentRoutes.post('/editstudent/',upload.single('studentImage'),student.editStudent);
studentRoutes.get('/getallstudent/',student.getAllStudent);
module.exports = studentRoutes;

