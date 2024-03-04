const AppError = require('../utils/errors/app-errors') ;
const {StatusCodes} = require("http-status-codes") ;  
const {ErrorResponse} = require('../utils/common')

const validateBookingRequest = (req,res,next)=>{
    if( !req.body.flightId || !req.body.userId || !req.body.noOfSeats){
        ErrorResponse.error = new AppError("Booking data not in correct form" , StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next() ;
}
module.exports = {
    validateBookingRequest,
    
}