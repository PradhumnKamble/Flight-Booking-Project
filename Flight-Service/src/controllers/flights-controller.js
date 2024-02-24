const {FlightsService} = require("../services") ;  
const {StatusCodes} = require("http-status-codes") ;  
const {SuccessResponse, ErrorResponse} = require('../utils/common') ;

async function createFlight(req,res){
    try{
        const Flight = await FlightsService.createFlight({
          flightNumber : req.body.flightNumber,
          airplaneId : req.body.airplaneId,
          arrivalAirportId:req.body.arrivalAirportId,
          departureAirportId : req.body.departureAirportId,
          airvalTime : req.body.airvalTime,
          departureTime : req.body.departureTime,
          boardingGate : req.body.boardingGate,
          price : req.body.price,
          totalSeats : req.body.totalSeats,
        });
        SuccessResponse.data = Flight ;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);             
    }catch(error){
        ErrorResponse.error = error ;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}
async function getAllFlights(req,res){
  try {
    console.log(req.query);
    const flights = await FlightsService.getAllFlights(req.query) ;
    SuccessResponse.data = flights ;
    return res
              .status(StatusCodes.CREATED)
              .json(SuccessResponse);  
  } catch (error) {
        ErrorResponse.error = error ;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
  }
}

/* 
GET : /flights/:id
req-body :{}
*/ 
async function getFlight(req,res){
     try{
        const flight = await FlightsService.getFlight(req.params.id);
        SuccessResponse.data = flight ;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);             
    }catch(error){
        ErrorResponse.error = error ;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function updateSeats(req ,res){
       try{
        const flight = await FlightsService.updateSeats({
          flightId : req.params.id,
          seats : req.body.seats,
          decrease : req.body.decrease
        });
        SuccessResponse.data = flight ;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);             
    }catch(error){
        ErrorResponse.error = error ;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}
module.exports = {
  createFlight,
  getAllFlights,
  getFlight,
  updateSeats
}