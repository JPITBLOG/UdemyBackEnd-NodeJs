const mongoose = require("mongoose");

const Subcategoryschema = new mongoose.Schema({
    subcategory: String,
    subcategoryArray: Array
},{usePushEach: true});

Subcategoryschema.statics.existSubcategory = function(subcategory){
    let subcategories = this;
    return subcategories.findOne({'subcategory':subcategory}).then((getsubcategory) => {
        if(!getsubcategory){
            return Promise.reject();
        }
        console.log("with subcategory: ",getsubcategory);
        return new Promise((resolve) => {
            resolve(getsubcategory);
        });

    });
};

Subcategoryschema.statics.findCourseById = function (findCourseById) {
    let subcategories = this;
    console.log(findCourseById);
    return subcategories.findOne({'_id':findCourseById}).then((getcategory) => {
       if(!getcategory){
           console.log("reject");
            return Promise.reject();
       }
       return new Promise((resolve) => {
           console.log("resolve");
            resolve(getcategory);
       });
    });
};

const Subcategoryschemas = mongoose.model("Subcategoryschemas",Subcategoryschema);
module.exports = {Subcategoryschemas};