const mongoose = require("mongoose");
const _ =require("lodash");

const Markschemas = new mongoose.Schema({
    studentId : String,
    subjectId : String,
    marks : String,
    isdelete : String
},{usePushEach: true});

Markschemas.methods.toJSON = function(){
    let marks = this;
    let marksObject = marks.toObject();
    return _.pick(marksObject,['_id','subjectId','marks','isdelete']);
}

const Markschema = mongoose.model('Markschema',Markschemas);
module.exports = {Markschema};