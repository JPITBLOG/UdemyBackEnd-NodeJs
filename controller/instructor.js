const {Instructor} = require('../model/instructor');
const jwt = require('jsonwebtoken');
const path = require("path");

const access = 'auth';

const addInstructor = async (req,res) => {

    try {
        let result = await Instructor.findByEmail(req.body.email);
        let name = req.body.name;
        let email = req.body.email;
        let profession = req.body.profession;
        let selfDescription = req.body.selfDescription;
        let courses = req.body.courses;
        let password = req.body.password;
        let instructor_Img = req.file.path;
        let role = '1';
        let own_Img = path.format({dir:'http://localhost:8010',base:instructor_Img});

        const instructor = new Instructor({
            name,email,profession,selfDescription,courses,password,role,own_Img
        });
        instructor.save().then(async (instructor) => {
            let token = await jwt.sign({_id:instructor._id, access}, 'abc123').toString();
            let instructorObject = {
                ...instructor.toJSON(),token
            }
            res.status(200).send(instructorObject);
        }).catch((e) => {
            res.send({message:"there is an error while making response"});
        });
    }
    catch (e) {
        res.status(401).send({message:"email is already exist"});
    }
    
}

const addinstructorImg = function(req,res){
    let instructor_Id = req.body.instructor_Id;
    let instructor_Img = req.file.path;
    let imgObj = path.format({dir:'http://localhost:3000',base:instructor_Img});
    console.log(imgObj);
    try {
        Instructor.updateOne({_id:instructor_Id},{$set: {own_Img: imgObj}}).then((get_data) => {
            console.log("our data: ",get_data);
            res.status(200).send("instructor image added or update successfully.");
        });
    }
    catch (e) {
        res.status(400).send("there is an error while Adding instructor image.");
    }
}

const getallInstructor = function(req,res){
    Instructor.find((error,result) => {
        if(error)
            res.status(400).send("there is an error while fetching instructor.");
        else {
            console.log("our all instructor data: ",result);
            res.status(200).send(result);
        }
    })
}

module.exports = {
    addInstructor,
    addinstructorImg,
    getallInstructor
}

