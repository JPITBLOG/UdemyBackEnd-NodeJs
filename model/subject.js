const mongoose = require("mongoose");
const _ =require("lodash");

const Subjectschemas = new mongoose.Schema({
    subject: String
},{usePushEach: true});

Subjectschemas.methods.toJSON = function(){
    let subject = this;
    let subjectObject = subject.toObject();
    return _.pick(subjectObject,['_id','subject']);
}

const Subjectschema = mongoose.model('Subjectschema',Subjectschemas);
module.exports = {Subjectschema};