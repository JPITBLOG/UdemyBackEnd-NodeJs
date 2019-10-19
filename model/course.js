const mongoose = require('mongoose');

let content_Schema = {
        content_Name:{type:String},
        sub_Content:Array
}

const content_Schemas = 'new Schema('+content_Schema+',{_id:false})';

const courseSchema = mongoose.Schema({
    category_Id: {type:String},
    category_Name: {type:String},
    created_By: Array,
    language: {type:String},
    course_Img: {type: String,required: false},
    course_Name: {type:String},
    course_Subtitle: {type:String},
    learn: Array,
    course_content: [content_Schemas],
    requirement:Array,
    description:{type:String},
    price:{type:String},
    offer:{type:String,required:false}
});

const CourseSchema = mongoose.model('CourseSchema',courseSchema);
module.exports = {CourseSchema};