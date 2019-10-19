const mongoose = require("mongoose");
const _ =require("lodash");

const Studentschemas = new mongoose.Schema({
    fname : String,
    lname : String,
    dob : String,
    studentImage : String,
    address_one : String,
    address_two : String,
    state : String,
    city : String,
    zipcod : String,
    isdelete : String
},{usePushEach: true});

Studentschemas.methods.toJSON = function(){
    let students = this;
    let studentObject = students.toObject();
   /* return _.pick(studentObject,['_id','fname','lname','dob','studentImage','address_one','address_two',
    'state','city','zipcod','isdelete']);*/
}

Studentschemas.statics.findLastInsertData = function(){
    let students = this;
    return students.find().limit(1).sort({$natural:-1}).then((student) => {
        if(student){
            return Promise.resolve(student);
        }
        return Promise.reject();
    })
}

Studentschemas.statics.findStudentAndDelete = function (student_id,callback) {
    let allStudent = this;
    let studentId = {'_id': student_id };
    let newvalues = { $set: {'isdelete': 1 } };
    allStudent.updateOne(studentId, newvalues, function(err, res) {
        if(res){
            callback(null,res);
        }
        else {
            callback("there is an error");
        }

    })
}

Studentschemas.statics.findAndUpdate = function (studentDetail,callback) {
    let newvalues;
    let allStudent = this;
    let studentId = {'_id': studentDetail._id };
    if(studentDetail.studentImage){
        newvalues = { $set: {'fname':studentDetail.fname,'lname':studentDetail.lname,'dob':studentDetail.dob,
        'studentImage':studentDetail.studentImage,
        'address_one':studentDetail.address_one,'address_two':studentDetail.address_two,'state':studentDetail.state,
        'city':studentDetail.city,'zipcod':studentDetail.zipcod} };
    }
    else{
        newvalues = { $set: {'fname':studentDetail.fname,'lname':studentDetail.lname,'dob':studentDetail.dob,
        'address_one':studentDetail.address_one,'address_two':studentDetail.address_two,'state':studentDetail.state,
        'city':studentDetail.city,'zipcod':studentDetail.zipcod} };
    }
    

    allStudent.updateOne(studentId, newvalues, function(err, res) {
        if(res){
            callback(null,res);
        }
        else {
            callback("there is an error");
        }

    })
}

const Studentschema = mongoose.model('Studentschema',Studentschemas);
module.exports = {Studentschema};