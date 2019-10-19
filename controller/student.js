const path = require("path");
const {Studentschema} = require('../model/student');
const {Markschema} = require('../model/marks');
const async = require('async');
const _ =require("lodash");

const addStudent = async (req,res) => {
    let studentImage_Path = req.file.path;
    let studentImg = path.format({dir:'http://localhost:8001',base:studentImage_Path});
    let subjectContent = req.body.subjectContent;
    let subjectContentParse = JSON.parse(subjectContent);

    let AddStudent = new Studentschema({
        fname : req.body.fname,
        lname : req.body.lname,
        dob : req.body.dob,
        studentImage : studentImg,
        address_one : req.body.address_one,
        address_two : req.body.address_two,
        state : req.body.state,
        city : req.body.city,
        zipcod : req.body.zipcod,
        isdelete : req.body.isdelete
    });

    AddStudent.save().then(() => {
        Studentschema.findLastInsertData().then(async (response) => {
            await subjectContentParse.map(function (Subjectdata,index) {
                     let markhistory = new Markschema({studentId:response[0]._id,subjectId:Subjectdata.subject,
                         marks:Subjectdata.marks,isdelete:'0'});
                    markhistory.save();
                });
            res.status(200).send({message:"student data added successfully"})
        });
    }).catch((e) => {
        res.status(400).send({message:"there is an error while add student data"})
    });
}

const getAllStudent = async function (req,res){
    let pageNo = req.query.page;
    let skipIndexFind = 0;
    for(let i = 1;i<pageNo;i++){
        skipIndexFind = skipIndexFind+5;
    }
    try {
        _getStudent(skipIndexFind,async (error,result) => {
            if(error){
                res.status(400).send({message:"error while getting student"})
            }
            else {
                let students = result;
                _getStudentsMarks(students, (error, resp) => {
                    if (error) {
                        res.status(404).send("error while mapping student.");
                    } else {
                        res.status(200).send(resp);
                    }
                })
            }
        })
    }
    catch (e) {
        res.status(400).send({message:"error while callin API"})
    }
}

const editStudent = async function(req,res){
    let RawsubjectContent = req.body.subjectContent;
    let subjectContent = JSON.parse(RawsubjectContent);

    let studentDetail = {
        _id: req.body._id,
        fname : req.body.fname,
        lname : req.body.lname,
        dob : req.body.dob,
        address_one : req.body.address_one,
        address_two : req.body.address_two,
        state : req.body.state,
        city : req.body.city,
        zipcod : req.body.zipcod,
        isdelete : req.body.isdelete
    }

    if(req.file){
        let studentImage_Path = req.file.path;
        let studentImg = path.format({dir:'http://localhost:8001',base:studentImage_Path});
        studentDetail = {...studentDetail,studentImage : studentImg}
    }
  Studentschema.findAndUpdate(studentDetail,(error,response) => {
        if(response){
            let studentId = studentDetail._id;
            _editMarks(studentId,subjectContent,(error,response) => {
                if(response){
                    // return res.status(200).send({message:"student edited successfully"})
                    Studentschema.find({'_id':studentDetail._id}).exec((error,result) => {
                        if(result){
                            let students = result;
                            _getStudentsMarks(students, (error, resp) => {
                                if (error) {
                                    return res.status(404).send({message:"error while mapping student."});
                                } else {
                                    return res.status(200).send(resp);
                                }
                            })
                        }
                        else {
                            return res.status(400).send({message:"error while edit student."})
                        }
                    })
                }
                else {
                    return res.status(400).send({message:"there is an error while update student marks"})
                }
            })
        }
    })
}

function _getStudent(skipIndexFind,callback){
    Studentschema.find({'isdelete':0}).skip(skipIndexFind).limit(5).sort({_id:-1}).exec((error, result)=>{
        if(error){
            return callback(error);
        }
        return callback(null,result);
    })
}

function _getStudentsMarks(students,callback){
    let currentStudent = {}
    let studentmapped = [];

    async.eachSeries(students, (student, cb) => {
        currentStudent = {}
        currentStudent = {
            _id:student._id,
            fname: student.fname,
            lname: student.lname,
            dob: student.dob,
            studentImage: student.studentImage,
            address_one:student.address_one,
            address_two:student.address_two,
            state: student.state,
            city: student.city,
            zipcod: student.zipcod,
            isdelete: student.isdelete
        };
        Markschema.find({'studentId':currentStudent._id,'isdelete':0},(error,resp) => {
            if(error){
                return cb(error);
            }
            currentStudent.marks = resp;
            studentmapped.push(currentStudent);
            return cb();
        });

    }, (eachSeriesErr) => {
        if (eachSeriesErr) {
            return callback(eachSeriesErr);
        }
        return callback(null, studentmapped);
    });
}

function _editMarks(studentId,subjectContent,callback) {
    let marksId = {};
    let newValue = {}
    async.eachSeries(subjectContent,(singleContent,cb) => {
        marksId = {}
        newValue = {}
        if(singleContent._id !== null){
            marksId = {_id:singleContent._id}
            newValue = {subjectId:singleContent.subject,marks:singleContent.marks,isdelete:singleContent.isdelete}
            Markschema.updateOne(marksId,newValue,function (error,response) {
                if(error){
                    return cb(error)
                }
                return cb();
            })
        }
        else{
            let markhistory = new Markschema({studentId:studentId,subjectId:singleContent.subject,
                marks:singleContent.marks,isdelete:0});
                markhistory.save()
                .then((response) => {
                    if(response){
                        return cb();
                    }
                    return cb(false)
                });
        }
        
    }, (eachSeriesErr) => {
        if (eachSeriesErr) {
            return callback(eachSeriesErr);
        }
        return callback(null, true);
    })
}

const deleteStudent = async function (req,res) {
    let student_id = req.query.id;
    Studentschema.findStudentAndDelete(student_id,(error,resp) => {
        if(resp){
            return res.status(200).send({message:"Student delete successfully"})
        }
        return res.status(400).send({message:"there is an error while delete student"})
    })
}

module.exports = {
    addStudent,
    getAllStudent,
    deleteStudent,
    editStudent
}