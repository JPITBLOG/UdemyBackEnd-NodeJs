const {Categoryschemas } = require('../model/categories.model');
const {Subcategoryschemas} = require('../model/subcategory.model');

const addCategory = async function (req,res) {
    let Allcategory = new Categoryschemas({
        name:req.body.name,
        subcategory:req.body.subcategory.split(","),
        image:req.file.path
    });

    try {
        const fetchsubcategory = req.body.subcategory.split(",");
        const gotcategory = await Categoryschemas.findByCategory(Allcategory);
        fetchsubcategory.forEach(AdduniquesubCategory);
        function AdduniquesubCategory(item){
            if(!gotcategory.subcategory.includes(item)){
                gotcategory.subcategory.push(item);
            }
        }

        gotcategory.save().then(() => {
            res.status(200).send({message:"category update successfully"});
        }).catch((e) => {
            res.status(400).send(e.error);
        });
    }
    catch (e) {
        Allcategory.save().then(() => {
            res.status(200).send({message: "category add successfully"});
        }).catch((e) => {
            res.status(400).send(e.error);
        });
    }
}

const addSubcategory = async function(req,res){
    try {
        let subcategory = req.body.subcategory;
        let subcategoryArray = req.body.subcategoryArray;
        const gotSubcategory = await Categoryschemas.findSubcategory(subcategory);
        if(gotSubcategory){

            const Addsubcategoryschemas = new Subcategoryschemas({
                subcategory,
                subcategoryArray
            });

            try {
                const existsubcategory = await Subcategoryschemas.existSubcategory(subcategory);
                if(existsubcategory){
                    subcategoryArray.forEach(AdduniquesubCategory);
                    function AdduniquesubCategory(item){
                        if(!existsubcategory.subcategoryArray.includes(item)){
                            existsubcategory.subcategoryArray.push(item);
                        }
                    }
                    existsubcategory.save().then(() => {
                        res.status(200).send({message:"subcategoryArray update successfully"});
                    });
                }
            }
            catch (e) {
                Addsubcategoryschemas.save().then(() => {
                    res.status(200).send({message:"subcategoryArray added successfully"});
                })
            }
        }
    }
    catch (e) {
        res.status(400).send({message:"subcategory is not present in any category"})
    }
};

const getAllcategory = async function (req,res){
    let subctgry = [];

    await Subcategoryschemas.find({}).then((allsubcategory) => {
        let count = 0;
        allsubcategory.forEach(function (element) {
            subctgry[count] = element;
            count++;
        })
    }).catch((e) => {
        res.status(400).send({message:"there is an error while fetching subcategory data"});
    });
    await Categoryschemas.find({}).then((allcategories) => {
        let obj = [];
        let count = 0;
        allcategories.forEach(function (element) {
            obj[count] =  element;
            for(let i=0;i<obj[count].subcategory.length;i++){

                let subcategoryobj = {};

                subcategoryobj["name"] = obj[count].subcategory[i];
                subcategoryobj["subcategory"] = [];
                console.log("get ",obj[count].subcategory[i]);
                for(let j=0;j<subctgry.length;j++) {
                    if(subctgry[j].subcategory === obj[count].subcategory[i]){
                        subcategoryobj["subcategory"] = subctgry[j].subcategoryArray.map((category) => ({ name: category, subcategory:[] }) );
                    }
                }
                obj[count].subcategory[i] = subcategoryobj;
            }
            count++;
        });
        res.status(200).send(obj);
    }).catch((e) => {
        res.status(400).send({message:"there is an error while fetching data"});
    });
};

const getAllsubcategory = async function(req,res){
    await Subcategoryschemas.find().then((allsubcategory) => {
        let count = 0;
        console.log("there is all subcategory");
        // allsubcategory.forEach(function (element) {
        //     subctgry[count] = element;
        //     count++;
        // })
        res.status(200).send(allsubcategory);
    });
}

module.exports = {
    addCategory,
    addSubcategory,
    getAllcategory,
    getAllsubcategory
};







