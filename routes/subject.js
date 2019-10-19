const express = require("express");
const subjectRouter = express.Router();
const subject = require('../controller/subject');

subjectRouter.post('/addsubject',subject.addSubject);
subjectRouter.get('/getallsubject',subject.getAllSubject);

module.exports = subjectRouter;