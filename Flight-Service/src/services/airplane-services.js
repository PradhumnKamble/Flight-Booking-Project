const { AirplaneRepository } = require("../repositories") ;
const AppError = require("../utils/errors/app-errors")
const {StatusCodes} = require("http-status-codes");

// object
const airplaneRepository = new AirplaneRepository() ;

async function createAirplane(data){
    try{
        const airplane = await airplaneRepository.create(data) ;
        return airplane; 
    }
    catch(error){
        // we will specially handle validation errors
        if(error.name === 'SequelizeValidationError'){
           let explanation =[] ;
           error.errors.forEach( (err)=>{
               explanation.push(err.message);
           })
           console.log(explanation) ;
           throw new AppError(explanation , StatusCodes.BAD_REQUEST) ;
        }
        else
        throw new AppError('Cannot create an airplane object' , StatusCodes.INTERNAL_SERVER_ERROR) ;    
    }
}

async function getAirplanes(){
    try{
        const airplane = await airplaneRepository.getAll() ;
        return airplane;         
    }catch(error){
        throw new AppError("Cannot fetch all airplanes" ,StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplane(id){
    try{
        const airplane = await airplaneRepository.get(id) ;
        return airplane;         
    }catch(error){
        // if id(airplane) doesnt exits 
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError('the airplane you requested doesnt exists' ,StatusCodes.NOT_FOUND);
        }
        else
        throw new AppError("Cannot fetch the airplane" ,StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroy(id){
    try{
        const airplane = await airplaneRepository.destroy(id) ;
        return airplane;         
    }catch(error){
        // if id(airplane) doesnt exits 
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError('the airplane you requested doesnt exists' ,StatusCodes.NOT_FOUND);
        }
        else
        throw new AppError("Cannot delete the airplane" ,StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function updateAirplane(id,data){
    try{
        const airplane = await airplaneRepository.update(id,data) ;
        return airplane;         
    }catch(error){
        // if id(airplane) doesnt exits 
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError('the airplane you requested doesnt exists' ,StatusCodes.NOT_FOUND);
        }
        else if(error.name === 'SequelizeValidationError'){
           let explanation =[] ;
           error.errors.forEach( (err)=>{
               explanation.push(err.message);
           })
        //    console.log(explanation) ;
           throw new AppError(explanation , StatusCodes.BAD_REQUEST) ;
        }
        else 
        throw new AppError("Cannot update the airplane" ,StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroy,
    updateAirplane
};