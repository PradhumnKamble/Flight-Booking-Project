// const CrudRepository = require("./crud-repository") ;
const {booking} = require("../models");
const {StatusCodes} = require('http-status-codes') ;
const AppError = require("../utils/errors/app-errors");


class BookingRepository{
    async createBooking(data,transaction){
        try {
            const bookingRes = await booking.create(data, {transaction: transaction}) ;
            return bookingRes ;
        } 
        catch (error) {
            if(error.name === 'SequelizeValidationError'){
                let explanation =[] ;
                error.errors.forEach( (err)=>{
                    explanation.push(err.message);
                })
                throw new AppError(explanation , StatusCodes.BAD_REQUEST) ;
            }   
            else
                throw new AppError('Cannot create Booking' , StatusCodes.INTERNAL_SERVER_ERROR) ; 
        }
    }
    async updateBooking(bookingId , data,transaction){

        try {
            const bookingRes = await booking.update(data , {
                where:{
                    id : bookingId
                }
            },{transaction : transaction});
            // if(data.status){
            //     bookingRes.status = data.status;
            // }
            // await bookingRes.save();
            return bookingRes ;

        } catch (error) {
            throw new AppError('Cannot update Booking' , StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }
    async get(bookingId ,transaction){
        const record = await  booking.findByPk(bookingId,{transaction:transaction}); 
        return record ;
    }

    async getAll(){
        const records = await  booking.findAll(); 
        return records ;
        
    }
}
module.exports = BookingRepository;