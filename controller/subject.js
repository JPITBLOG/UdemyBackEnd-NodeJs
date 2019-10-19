const {Subjectschema} = require('../model/subject');

const addSubject = async function (req,res) {
    let AddSubject = new Subjectschema({
        subject : req.body.subject
    });
    AddSubject.save().then(() => {
        res.status(200).send({message:'Subject added successfully'});
    }).catch((e) => {
        res.status(400).send({message:'there is an error like: ',e});
    })
}

const getAllSubject = async function (req,res){
    Subjectschema.find((error, result)=>{
        if(error){
            res.status(400).send({message:"there is an error while getting data: ",error})
        }
        res.status(200).send(result);
    })
}

module.exports = {
    addSubject,
    getAllSubject
}
