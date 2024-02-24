const { AirportRepository } = require("../repositories") ;
const AppError = require("../utils/errors/app-errors")
const {StatusCodes} = require("http-status-codes");

// object
const airportRepository = new AirportRepository() ;

async function createAirport(data){
    try{
        const airport = await airportRepository.create(data) ;
        return airport; 
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
        throw new AppError('Cannot create an airport object' , StatusCodes.INTERNAL_SERVER_ERROR) ;    
    }
}

async function getAirports(){
    try{
        const airport = await airportRepository.getAll() ;
        return airport;         
    }catch(error){
        throw new AppError("Cannot fetch all airports" ,StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(id){
    try{
        const airport = await airportRepository.get(id) ;
        return airport;         
    }catch(error){
        // if id(airplane) doesnt exits 
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError('the airport you requested doesnt exists' ,StatusCodes.NOT_FOUND);
        }
        else
        throw new AppError("Cannot fetch the airport" ,StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroy(id){
    try{
        const airport = await airportRepository.destroy(id) ;
        return airport;         
    }catch(error){
        // if id(airplane) doesnt exits 
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError('the airport you requested doesnt exists' ,StatusCodes.NOT_FOUND);
        }
        else
        throw new AppError("Cannot delete the airport" ,StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function updateAirport(id,data){
    try{
        const airport = await airportRepository.update(id,data) ;
        return airport;         
    }catch(error){
        // if id(airplane) doesnt exits 
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError('the airport you requested doesnt exists' ,StatusCodes.NOT_FOUND);
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
        throw new AppError("Cannot update the airport" ,StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroy,
    updateAirport
};