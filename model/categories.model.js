const mongoose = require("mongoose");

const Categoryschema = new mongoose.Schema({
    name: String,
    image: {type: String},
    subcategory: Array
},{usePushEach: true});

Categoryschema.statics.findByCategory = function (Allcategories) {
    console.log("all cat :",Allcategories.name+"/n"+Allcategories.subcategory+"/n"+Allcategories.image);
    console.log("nam ",Allcategories.name);
    let allcategory = this;
    console.log(allcategory);
     return allcategory.findOne({'name':  Allcategories.name}).then((findcategory) => {
        if(!findcategory){
            console.log("met resp ");
            return Promise.reject();
        }
        return new Promise((resolve) => {
            console.log("resolve ",findcategory);
            if(findcategory){
                resolve(findcategory);
            }
        });
})
};

Categoryschema.statics.findSubcategory = function (subcategory) {
    let Allcategory = this;
    return Allcategory.findOne({'subcategory':subcategory}).then((getsubcategory) => {
        if(!getsubcategory){
            return Promise.reject("subcategory not found");
        }
        return true;
    });
};

const Categoryschemas = mongoose.model('Categoryschemas',Categoryschema);
module.exports = {Categoryschemas};