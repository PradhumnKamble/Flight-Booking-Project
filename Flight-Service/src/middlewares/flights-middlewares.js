const { StatusCodes } = require('http-status-codes');

const {ErrorResponse} = require('../utils/common')
const compareTime = require('../utils/helpers/dateTime-helper-function') ;
const AppError = require('../utils/errors/app-errors')

// if in body required el is not in correct form
function validateCreateRequest(req, res,next){
    if(!req.body.flightNumber){
        // raw strings should be avoided  , create a sep folder and store
        ErrorResponse.error = new AppError([" flightNumber not found"], StatusCodes.BAD_REQUEST);  
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse) ;
    }
    if(!req.body.airplaneId){
        ErrorResponse.error = new AppError(["airplaneId not found"], StatusCodes.BAD_REQUEST);  
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse) ;
    }
    if(!req.body.arrivalAirportId){
        ErrorResponse.error = new AppError(["arrivalAirportId not found"], StatusCodes.BAD_REQUEST);  
        res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse) ;
    }
    if(!req.body.departureAirportId){
        ErrorResponse.error = new AppError(["departureAirportId not found"], StatusCodes.BAD_REQUEST);  
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse) ;
    }
    if(!req.body.airvalTime){
        ErrorResponse.error = new AppError(["airvalTime not found"], StatusCodes.BAD_REQUEST);  
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse) ;
    }
    if(!req.body.departureTime){
        ErrorResponse.error = new AppError(["departureTime not found"], StatusCodes.BAD_REQUEST);  
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse) ;
    }
    if(compareTime(req.body.airvalTime , req.body.departureTime) == false)
    {
        ErrorResponse.error = new AppError(["departureTime cannot be later of arrival time"], StatusCodes.BAD_REQUEST);  
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse) ;
    }
    if(!req.body.price){
        ErrorResponse.error = new AppError(["price not found"], StatusCodes.BAD_REQUEST);  
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse) ;
    }
    if(req.body.price < 0){
        ErrorResponse.error = new AppError(["price cannot be negative"], StatusCodes.BAD_REQUEST);  
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse) ;
    } 
    if(!req.body.totalSeats){
        ErrorResponse.error = new AppError(["totalSeats not found"], StatusCodes.BAD_REQUEST);  
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse) ;
    }
    // else it is in correct form
    // so pass the control to next middleware
    next();
}
function validatePatchRequest(req, res,next){
    
    // if req body is empty
    if(Object.keys(req.body).length == 0){
        ErrorResponse.error = new AppError(["Req Body is empty"], StatusCodes.BAD_REQUEST);  
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse) ;
    }
    // else it is in correct form
    // so pass the control to next middleware
    next();
}
function validateUpdateSeats(req,res,next){
    if(!req.body.seats){
        ErrorResponse.error = new AppError(["Seats not found"], StatusCodes.BAD_REQUEST);  
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse) ;
    }
    next();
}
module.exports = {
    validateCreateRequest,
    validatePatchRequest,
    validateUpdateSeats
}