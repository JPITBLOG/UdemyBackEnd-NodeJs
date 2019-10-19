const {Studentschema} = require("../model/student");
const paginationRoutes = async function(req,res){
    Studentschema.find({'isdelete':0},(error, result)=>{
        if(error){
            res.status(400).send({message:"there is an error while getting data count"});
        }
        let dataLength =  {"dataLength":result.length}
        res.status(200).send(dataLength);
    })
}

module.exports = {
    paginationRoutes
}