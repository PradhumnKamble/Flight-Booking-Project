const { StatusCodes } = require('http-status-codes');

const {ErrorResponse} = require('../utils/common')
const AppError = require('../utils/errors/app-errors')

// if in body required el is not in correct form
function validateCreateRequest(req, res,next){
    // raw strings should be avoided  , create a sep folder and store
    ErrorResponse.error = new AppError(["City not in correct form"], StatusCodes.BAD_REQUEST);  
    if(!req.body.name){
        res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse) ;
    }
    // else it is in correct form
    // so pass the control to next middleware
    next();
}
// if req body is empty
function validatePatchRequest(req, res,next){
    // raw strings should be avoided  , create a sep folder and store
    ErrorResponse.error = new AppError(["Req Body is empty"], StatusCodes.BAD_REQUEST);  
    if(Object.keys(req.body).length == 0){
        res
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