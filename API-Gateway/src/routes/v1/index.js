const express = require("express");

const router = express.Router();

const {InfoController} = require("../../controllers")

// definig the get request method and 
// registrating the controller and route
// what it does : 
// if url has "/info" ,  then execute this controller
router.get('/info' , InfoController.info);

module.exports = router;