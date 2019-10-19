const express = require("express");
const paginationRoutes = express.Router();
const paginationRoute = require("../controller/paginationRoutes");

paginationRoutes.get('/datacount',paginationRoute.paginationRoutes);

module.exports = paginationRoutes;