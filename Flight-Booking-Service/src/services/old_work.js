const axios = require('axios');
const {BookingRepository} = require('../repositories') ;
const {StatusCodes} = require('http-status-codes') ;
const {ServerConfig} = require('../config') ;
const db  = require('../models');

const AppError = require('../utils/errors/app-errors');

const bookingRepository = new BookingRepository() ;


async function createBooking(data){
   
    return new Promise( (resolve, reject) => {
        const result = db.sequelize.transaction( async function bookingImpl(t){
            const flight = await axios.get(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`);
            
            // response from flight-service
            const flightData = flight.data.data ; 
            
            // data.noOfSeats ==> of user request
            if(+data.noOfSeats > +flightData.totalSeats){
                reject(new AppError("Requested Seats not available" , StatusCodes.BAD_REQUEST)) ;
            }

            const totalCost = (+flightData.price)*(+data.noOfSeats) ;
        
            const bookingPayLoad = {...data , totalCost} ;
            try {
                // creating booking
                const bookingRes = await bookingRepository.createBooking(bookingPayLoad) ;

                // updating seats of flight
                await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${bookingRes.flightId}/seats` , {
                    flightId :bookingRes.flightId,
                    seats : +bookingRes.noOfSeats ,
                })

                // final booking ==> status change
                const finalBooking = await bookingRepository.updateBooking(bookingRes.id,{status : "booked"}) ;
                
                resolve(finalBooking) ;
            } catch (error) {
                reject(new AppError(error.message , error.statusCode)) ;
            }
        })
    })
}
//
async function cancelBooking(bookingId){
    try {
        const record = await bookingRepository.get(bookingId); 
        console.log("record ", record)
        // update seats
        await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${record.flightId}/seats` , {
                    flightId :record.flightId,
                    seats : +record.noOfSeats ,
                    decrease : 0 // increase
                })
        const finalRecord = await bookingRepository.updateBooking(bookingId,{status : "cancelled"}) ;
        return finalRecord ;
    } catch (error) {
        throw new AppError("Cannot cancel the booking" , StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function get(bookingId){
    try {
        const record = bookingRepository.get(bookingId);
        return record ;
    } catch (error) {
        throw new AppError("Cannot get the booking" , StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAll(){
    try {
        const records = bookingRepository.getAll();
        return records ;
    } catch (error) {
        throw new AppError("Cannot get the bookings" , StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    createBooking,
    cancelBooking,
    getAll,
    get
}