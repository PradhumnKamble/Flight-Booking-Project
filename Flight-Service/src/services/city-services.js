const { CityRepository } = require("../repositories") ;
const AppError = require("../utils/errors/app-errors")
const {StatusCodes} = require("http-status-codes");

// object
const cityRepository = new CityRepository() ;

async function createCity(data){
    try{
        const city = await cityRepository.create(data) ;
        return city; 
    }
    catch(error){
  
        if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError'){
           let explanation =[] ;
           error.errors.forEach( (err)=>{
               explanation.push(err.message);
           })
           console.log(explanation) ;
           throw new AppError(explanation , StatusCodes.BAD_REQUEST) ;
        }
        else
        throw new AppError('Cannot create a City object' , StatusCodes.INTERNAL_SERVER_ERROR) ;    
    }
}
async function getCities(){
    try{
        const city = await cityRepository.getAll() ;
        return city;         
    }catch(error){
        throw new AppError("Cannot fetch all cities" ,StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function destroy(id){
    try{
        const city = await cityRepository.destroy(id) ;
        return city;         
    }catch(error){
        // if id(city) doesnt exits 
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError('the city you requested doesnt exists' ,StatusCodes.NOT_FOUND);
        }
        else
        throw new AppError("Cannot delete the city" ,StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateCity(id,data){
    try{
        const city = await cityRepository.update(id,data) ;
        return city;         
    }catch(error){
        // if id(airplane) doesnt exits 
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError('the city you requested doesnt exists' ,StatusCodes.NOT_FOUND);
        }
        else if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError'){
           let explanation =[] ;
           error.errors.forEach( (err)=>{
               explanation.push(err.message);
           })
        //    console.log(explanation) ;
           throw new AppError(explanation , StatusCodes.BAD_REQUEST) ;
        }
        else 
        throw new AppError("Cannot update the city" ,StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports ={
    createCity,
    destroy,
    getCities,
    updateCity
}