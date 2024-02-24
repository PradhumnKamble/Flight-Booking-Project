const express = require("express");

const router = express.Router();

const {InfoController} = require("../../controllers")

const bookingRoutes = require("./booking-routes") ;
// definig the get request method and 
// registrating the controller and route
// what it does : 
// if url has "/info" ,  then execute this controller
router.get('/info' , InfoController.info);

router.use('/bookings' , bookingRoutes) ;


module.exports = router;