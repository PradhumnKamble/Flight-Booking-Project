const {AirportService} = require("../services") ;  
const {StatusCodes} = require("http-status-codes") ;  
const {SuccessResponse, ErrorResponse} = require('../utils/common') ;
/**
 * FUNCTION WILL BE EXEC AT : POST REQUEST at ../airplanes
 * req-body : {
 *    modelNumber :"airbus a360",
 *    capacity:200
 * }
 * 
 */
async function createAirport(req,res){
    try{
        const airport = await AirportService.createAirport({
          name : req.body.name,
          code : req.body.code,
          address:req.body.address,
          cityId : req.body.cityId
        });
        SuccessResponse.data = airport ;
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

async function getAirports(req,res){
     try{
        const airport = await AirportService.getAirports();
        SuccessResponse.data = airport ;
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
GET : /airplanes/:id
req-body :{}
*/
async function getAirport(req,res){
     try{
        const airport = await AirportService.getAirport(req.params.id);
        SuccessResponse.data = airport ;
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
DELETE : /airplanes/:id
req-body :{}
*/
async function destroyAirport(req,res){
     try{
        const airport = await AirportService.destroy(req.params.id);
        SuccessResponse.data = airport ;
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
async function updateAirport(req,res){
     try{
        const airport = await AirportService.updateAirport(req.params.id ,req.body);
        SuccessResponse.data = airport ;
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
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
} ;