const mongoose = require("mongoose");
const _ =require("lodash");

const instructor = mongoose.Schema({
    name:{type:String},
    email:{type:String},
    profession: {type:String},
    selfDescription: {type:String},
    courses: {type:Number},
    password: {type:String},
    role: {type:String},
    own_Img: {type: String,required: false},
});

instructor.methods.toJSON = function(){
    let instructor = this;
    let instructorObject = instructor.toObject();
    return _.pick(instructorObject,['_id','name','email','profession','selfDescription','courses',
        'password','role','own_Img']);
}

instructor.statics.findByEmail = function(email){
    let instructors = this;
    return instructors.findOne({'email':email}).then((instructor) => {
        debugger;
        if(instructor){
            console.log("rejected....",instructor);
            return Promise.reject();
        }
        return new Promise((resolve) => {
            resolve(true);
        });

    })
}

instructor.statics.findInstructor = function(instructorId,callback){
    let allInstructor = this;

    let instructor = [];
    allInstructor.find({_id:instructorId}).then((getInstructor) => {
       getInstructor.map(function (Instructor,index) {
          instructor[index] = Instructor.name;
          console.log("met data here: ",instructor[index]);
       });
        if(instructor.length>0){
            console.log("instructor data: ",instructor);
            callback(null,instructor);
        }
        else {
            console.log("instructor data null");
            callback("there is error while fetching data");
        }
    });

};

instructor.statics.addCourseInInstructorAccount = function (idsArray) {
    let instruct = this;
    let idArray = [];
    console.log("got instructor....",idsArray);
    idsArray.map(function (ids) {
        console.log("instructor ...ids: ",ids);
        instruct.findOneAndUpdate({'_id':ids},{$inc:{"courses" : 1}},{useFindAndModify: false}).then((user) => {
            console.log("my instructor....",user);
            idArray.push(user);

        })
    });
    return new Promise((resolve) => {
        resolve(idArray);
    });
}

instructor.statics.findByCredential = function(email,password){
    let allinstructors = this;
    console.log("met code",allinstructors);
    return allinstructors.findOne({'email':email,'password':password}).then((instruct) => {
        if(instruct){
            console.log("met code");
            return instruct;
        }
        return false;
    })
}

const Instructor = mongoose.model('Instructor',instructor);
module.exports = {Instructor};
