const {AirplaneService} = require("../services") ;  
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
async function createAirplane(req,res){
    try{
        const airplane = await AirplaneService.createAirplane({
            modelNumber:req.body.modelNumber,
            capacity:req.body.capacity
        });
        SuccessResponse.data = airplane ;
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

async function getAirplanes(req,res){
     try{
        const airplane = await AirplaneService.getAirplanes();
        SuccessResponse.data = airplane ;
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
POST : /airplanes/:id
req-body :{}
*/
async function getAirplane(req,res){
     try{
        const airplane = await AirplaneService.getAirplane(req.params.id);
        SuccessResponse.data = airplane ;
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
async function destroyAirplane(req,res){
     try{
        const airplane = await AirplaneService.destroy(req.params.id);
        SuccessResponse.data = airplane ;
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
async function updateAirplane(req,res){
     try{
        const airplane = await AirplaneService.updateAirplane(req.params.id ,req.body);
        SuccessResponse.data = airplane ;
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
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
} ;