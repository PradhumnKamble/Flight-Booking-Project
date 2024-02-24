const { FlightsRepository } = require("../repositories") ;
const AppError = require("../utils/errors/app-errors")
const {StatusCodes} = require("http-status-codes");
const {Op} = require("sequelize");

// object
const flightsRepository = new FlightsRepository() ;

async function createFlight(data){
    try{
        const  flight = await flightsRepository.create(data) ;
        return  flight; 
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
        throw new AppError('Cannot create flight object' , StatusCodes.INTERNAL_SERVER_ERROR) ;    
    }
}
// filtering flights based on queries

async function getAllFlights(query){
    let customFilter = {} ; 
    let sortFilter = [];
    if(query.trips){
        [departureAirportId ,arrivalAirportId ] = query.trips.split("-") ;
        customFilter.departureAirportId = Number(departureAirportId);
        customFilter.arrivalAirportId = Number(arrivalAirportId);
        if(arrivalAirportId === departureAirportId){
            throw new AppError("Cannot get flights ,same departure and arrival airport" , StatusCodes.BAD_REQUEST) ;
        }
    }
    if(query.price){
        [minPrice , maxPrice] = query.price.split("-") ;
        customFilter.price = {
            [Op.between] : [minPrice , maxPrice === undefined ?50000 : maxPrice]
        }
    }
    // will check if total seats remaining are greater than or == to travllers
    if(query.travellers){
        customFilter.totalSeats = {
            [Op.gte] : query.travellers
        }
    }
    // by date
    const endingTripDate = " 23:59:00" ; 
    if(query.date){
        customFilter.departureTime = {
            [Op.between] : [query.date , query.date + endingTripDate] 
        }
    }
    // sorting by filters
    if(query.sort){
        const params = query.sort.split(",");
        const sortFilters = params.map( (param) => param.split("_")) ;
        sortFilter = sortFilters ;
    }
    try{
        const flights = await flightsRepository.getAllFlights(customFilter,sortFilter);
        return flights; 
    }
    catch(error){
        throw new AppError("Cannot get Flights",StatusCodes.INTERNAL_SERVER_ERROR);
    }

}
// getFlight based on :id
async function getFlight(id){
    try{
        const flight = await flightsRepository.get(id) ;
        return flight;         
    }catch(error){
        // if id(flight) doesnt exits 
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError('the flight you requested doesnt exists' ,StatusCodes.NOT_FOUND);
        }
        else
        throw new AppError("Cannot fetch the flight" ,StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateSeats(data){
    try{
        console.log("inside flight update service")
        const response = await flightsRepository.updateRemainingSeats(data.flightId,data.seats,data.decrease) ;  
        return response ; 
    }catch(error){ 
        throw new AppError('Cannot update the flight' ,StatusCodes.NOT_FOUND);    
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
}
