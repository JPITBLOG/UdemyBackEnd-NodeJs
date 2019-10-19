const jwt = require('jsonwebtoken');
const {User} = require('../model/user');
const {Instructor} = require('../model/instructor');

const access = 'auth';

const addUser = async (req,res) => {
    const user = new User({
        name:req.body.fname,
        email:req.body.eml,
        password:req.body.pswd,
        role:req.body.role
    });

    try {
        console.log("where is error");
        let result = await User.findByEmail(req.body.eml);
        user.save().then(async () => {
            let token = await jwt.sign({_id: user._id, access}, 'abc123').toString();
            let userObject = {
                ...user.toJSON(),token
            }
            console.log("get data with token..", userObject);
            res.status(200).send(userObject);
        }).catch((e) => {
            res.status(400).send({message:"error in user register"});
        });
    }
    catch(e){

        res.status(401).send({message:"email is already exist"});
    }
}

const loginUser = async (req,res) => {
    let user;
    const users = new User({
        email:req.body.eml,
        password:req.body.pswd
    });
    try {
         user = await User.findByCredential(req.body.eml, req.body.pswd);
        if(!user){
            console.log("instructor field ");
            user = await Instructor.findByCredential(req.body.eml, req.body.pswd);
            console.log("got instructor ",user);
        }
        let token = jwt.sign({_id: user._id,access},'abc123').toString();
        let userObject = {
            ...user.toJSON(),token
        }
        res.send(userObject);
    }
    catch (e) {
        res.status(401).send({message:"Invalid user"});
    }
}

const addUserCart = async (req,res) => {
        const userCartData = new Object({
            uid:req.body.u_id,
            cartData: req.body.cartData
        });

        try {
            const userCart = await User.addUserCart(userCartData);
            console.log('there is user : ',userCart);
            if(userCart){
                res.status(200).send(userCart.cartData);
            }
            else {
                res.status(400).send({error_msg:'there is an error while add Cart data.'})
            }
        }
        catch (e) {
            res.status(500).send({error_msg:'there is an error while passing data.'})
        }

}

module.exports = {
    addUser,
    loginUser,
    addUserCart
}
