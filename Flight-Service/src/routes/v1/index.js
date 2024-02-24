const express = require("express");

const router = express.Router();

const {InfoController} = require("../../controllers");

const airplaneRoutes = require("./airplane-routes");
const cityRoutes = require("./city-routes");
const airportRoutes = require("./airport-routes");
const flightsRoutes = require("./flights-routes");

router.use('/airplanes' , airplaneRoutes) ;
router.use('/cities' , cityRoutes) ;
router.use('/airports' , airportRoutes) ;
router.use('/flights' , flightsRoutes) ;

// definig the get request method and 
// registrating the controller and route
// what it does : 
// if url has "/info" ,  then execute this controller
router.get('/info' , InfoController.info);

module.exports = router;