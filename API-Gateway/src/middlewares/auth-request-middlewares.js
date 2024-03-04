const { StatusCodes } = require('http-status-codes');

const {ErrorResponse} = require('../utils/common')
const AppError = require('../utils/errors/app-errors');
const { UserService } = require('../services');

function validateAuthRequest(req, res,next){
    
    if(!req.body.email){
        ErrorResponse.error = new AppError(["Email not found"], StatusCodes.BAD_REQUEST);  
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse) ;
    }
    if(!req.body.password){
        ErrorResponse.error = new AppError(["Password not found"], StatusCodes.BAD_REQUEST);  
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse) ;
    }
    next();
}
async function checkAuth(req,res,next) {
    try {
        // console.log(req.headers)
        const response = await UserService.isAuthenticated(req.headers['x-access-token'])
        
        if(response){
            //setting user field in req , so other services/apis know the user is authenticated
            req.user = response
            next() ;
        }
    } catch (error) {
        return res.status(error.status || 500).json(error)
    }
}
async function isAdmin(req,res,next){

    try {
        // req.user is set when jwt is sent to user
        const response = await UserService.isAdmin(req.user);
        if(!response){
            return res.status(StatusCodes.UNAUTHORIZED).json({message :"User not authorised for this action"})
        }
        next() ;
    } catch (error) {
        return res.status(error.status || 500).json(error);
    }
}
module.exports = {
    validateAuthRequest,
    checkAuth,
    isAdmin
}