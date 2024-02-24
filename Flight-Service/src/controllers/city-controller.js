const {CityService} = require("../services") ;  
const {StatusCodes} = require("http-status-codes") ;  
const {SuccessResponse, ErrorResponse} = require('../utils/common') ;
/**
 * FUNCTION WILL BE EXEC AT : POST REQUEST at ../cities
 * req-body : {
 *    name :""
 * }
 */
async function createCity(req,res){
    try{
        const city = await CityService.createCity({
            name:req.body.name
        });
        SuccessResponse.data = city ;
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
/* 
DELETE : /cities/:id
req-body :{}
*/
async function destroyCity(req,res){
     try{
        const city = await CityService.destroy(req.params.id);
        SuccessResponse.data = city ;
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

async function getCities(req,res){
     try{
        const cities = await CityService.getCities();
        SuccessResponse.data = cities ;
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
/* 
PATCH/UPDATE : /airplanes/:id
 * req-body : {
 *    modelNumber :,
 *    capacity:
 * }
*/
async function updateCity(req,res){
     try{
        const city = await CityService.updateCity(req.params.id ,req.body);
        SuccessResponse.data = city ;
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
module.exports  = {
    createCity,
    destroyCity,
    getCities,
    updateCity
}