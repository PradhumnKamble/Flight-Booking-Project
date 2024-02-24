const express = require("express");

const   { FlightsController } = require("../../controllers") ;
const   {  FlightsMiddleware } = require("../../middlewares");
const router = express.Router();

// /api/v1/flights POST
router.post('/' ,FlightsMiddleware.validateCreateRequest, FlightsController.createFlight) ;

// /api/v1/flights/trips=MUM-DEL GET
router.get('/' , FlightsController.getAllFlights);

// // /api/v1/flights/:id GET
router.get('/:id' , FlightsController.getFlight);

// api/v1/flights/:id/seats
router.patch('/:id/seats' ,FlightsMiddleware.validateUpdateSeats,FlightsController.updateSeats )

// // /api/v1/airports/:id DELETE
// router.delete('/:id' , FlightsController.destroyAirport);

// // /api/v1/airports/:id PATCH
// router.patch('/:id' ,FlightsMiddleware.validatePatchRequest, FlightsController.updateAirport);


module.exports = router;
