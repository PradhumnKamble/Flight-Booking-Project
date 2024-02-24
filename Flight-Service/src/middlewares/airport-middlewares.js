const { StatusCodes } = require('http-status-codes');

const {ErrorResponse} = require('../utils/common')
const AppError = require('../utils/errors/app-errors')

// if in body required el is not in correct form
function validateCreateRequest(req, res,next){
    if(!req.body.name){
        // raw strings should be avoided  , create a sep folder and store
        ErrorResponse.error = new AppError([" airport name not found"], StatusCodes.BAD_REQUEST);  
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse) ;
    }
    if(!req.body.code){
        ErrorResponse.error = new AppError(["airport code not found"], StatusCodes.BAD_REQUEST);  
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse) ;
    }
    if(!req.body.address){
        ErrorResponse.error = new AppError(["airport address not found"], StatusCodes.BAD_REQUEST);  
        res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse) ;
    }
    if(!req.body.cityId){
        ErrorResponse.error = new AppError(["airport cityId not found"], StatusCodes.BAD_REQUEST);  
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

module.exports = {
    validateCreateRequest,
    validatePatchRequest
}