const axios = require('axios');
const {BookingRepository} = require('../repositories') ;
const {StatusCodes} = require('http-status-codes') ;
const {ServerConfig} = require('../config') ;
const db  = require('../models');
const AppError = require('../utils/errors/app-errors');
const bookingRepository = new BookingRepository() ;


async function createBooking(data){
   console.log("insdie ervice",data)
    const transaction = await db.sequelize.transaction();
     try {
        const flight = await axios.get(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`);

        const flightData = flight.data.data;

        if(data.noofSeats > flightData.totalSeats) {
            throw new AppError('Not enough seats available', StatusCodes.BAD_REQUEST);
        }
        const totalCost = (+data.noOfSeats)*(+flightData.price);
        const bookingPayload = {...data, totalCost};

        const bookingRes = await bookingRepository.createBooking(bookingPayload, transaction);

        await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/seats`, {
            flightId :data.flightId,
            seats: data.noOfSeats
        });
        
        await transaction.commit();
        return bookingRes;
    } catch(error) {
        await transaction.rollback();
        throw error;
    }
}
async function makePayment(data) {
    
    const transaction = await db.sequelize.transaction();

    try {
        const bookingDetails = await bookingRepository.get(data.bookingId, transaction);
        console.log("bookingDetails ",bookingDetails);
        if(bookingDetails.status === "cancelled") {
            throw new AppError('The booking has expired', StatusCodes.BAD_REQUEST);
        }


        const bookingTime = new Date(bookingDetails.createdAt);
        const currentTime = new Date();

        // calculates diff in milliseconds
        // if diff  > 300000 ms or 5 min
        if(currentTime - bookingTime > 300000) {
            await cancelBooking(data.bookingId);
            throw new AppError('The booking has expired', StatusCodes.BAD_REQUEST);
        }
        if(bookingDetails.totalCost != data.totalCost) {
            throw new AppError('The amount of the payment doesnt match', StatusCodes.BAD_REQUEST);
        }
        if(bookingDetails.userId != data.userId) {
            throw new AppError('The user corresponding to the booking doesnt match', StatusCodes.BAD_REQUEST);
        }

        // we assume here that payment is successful
        const finalBookingStatus = await bookingRepository.updateBooking(data.bookingId, {status: "booked"}, transaction);

        await transaction.commit();
        return {status :"booked" , bookingId :data.bookingId , userId : data.userId} ;
    } catch(error) {
        await transaction.rollback();
        throw error ;
        // throw new AppError('Unable to make payment', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function cancelBooking(bookingId){
    const transaction = await db.sequelize.transaction();
    try {
        const bookingDetails = await bookingRepository.get(bookingId, transaction);
        if(bookingDetails.status === "cancelled") {
            await transaction.commit();
            return bookingDetails;
        }
        await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${bookingDetails.flightId}/seats`, {
            flightId:bookingDetails.flightId,
            seats: bookingDetails.noOfSeats,
            decrease: 0
        });
        await bookingRepository.updateBooking(bookingId, {status: "cancelled"}, transaction);
        await transaction.commit();
        return {status : "cancelled" , userId : bookingDetails.userId , bookingId :bookingId,flightId:bookingDetails.flightId} ;
    } catch(error) {
        await transaction.rollback();
        throw new AppError("Cannot cancel the booking" ,StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function get(bookingId){
    try {
        const record = bookingRepository.get(bookingId);
        return record ;
    } catch (error) {
        throw new AppError("Cannot get the booking details" , StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAll(){
    try {
        const records = bookingRepository.getAll();
        return records ;
    } catch (error) {
        throw new AppError("Cannot get the bookings data" , StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    createBooking,
    cancelBooking,
    getAll,
    get,
    makePayment
}
