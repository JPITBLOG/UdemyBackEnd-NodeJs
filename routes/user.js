const express = require('express');
const userRoutes = express.Router();
const user = require('../controller/user');

userRoutes.post('/register',user.addUser);
userRoutes.post('/login',user.loginUser);
userRoutes.post('/addusercart',user.addUserCart);

module.exports = userRoutes;

