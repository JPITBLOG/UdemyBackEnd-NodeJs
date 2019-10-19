const express = require("express");
const routerPayment = express.Router();
const {makePayment} = require('../controller/paymentRoot');

routerPayment.post('/bid',makePayment);

module.exports = routerPayment;