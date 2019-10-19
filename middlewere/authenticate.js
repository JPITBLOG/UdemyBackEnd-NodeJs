const {User} = require('../model/user');

let authenticate = (req,res,next) => {
    try{
        let token =req.header('x-auth');

    }
    catch (e) {
        res.status(400).send({message:"there is an error in request"});
    }
}
