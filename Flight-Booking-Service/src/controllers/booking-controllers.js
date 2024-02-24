const {BookingService} = require("../services") ;  
const {StatusCodes} = require("http-status-codes") ;  
const {SuccessResponse, ErrorResponse} = require('../utils/common') ; 
const inMemDb = {};
async function createBooking(req, res){
    try{
        const response = await BookingService.createBooking({
            flightId : req.body.flightId,
            noOfSeats: req.body.noOfSeats,
            userId   : req.body.userId
        })
        console.log("inside controller response", response) ;
        SuccessResponse.data = response ;
        return res.status(StatusCodes.OK).json(SuccessResponse) ;
    }catch(error){
        console.log("inside controller error ",error) ;
        ErrorResponse.error = error ;
        return res
        .status(error.statusCode)
        .json(ErrorResponse) ;
    }
}
// handling double payments ==> thus use of idempotencyKey
async function makePayment(req, res) {
    try {
        const idempotencyKey = req.headers['x-idempotency-key'];
        if(!idempotencyKey ) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({message: 'idempotency key missing'});
        }
        if(inMemDb[idempotencyKey]) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({message: 'Cannot retry on a successful payment'});
        } 
        const response = await BookingService.makePayment({
            totalCost: req.body.totalCost,
            userId: req.body.userId,
            bookingId: req.body.bookingId
        });
        inMemDb[idempotencyKey] = idempotencyKey;
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error) {
        console.log(error);
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}


async function cancelBooking(req, res){
    try{
        const response = await BookingService.cancelBooking(req.params.bookingId)
        SuccessResponse.data = response ;
        return res.status(StatusCodes.OK).json(SuccessResponse) ;
    }catch(error){
        ErrorResponse.error = error ;
        return res
        .status(error.statusCode)
        .json(ErrorResponse) ;
    }
}

async function get(req,res){
    try{
        const response = await BookingService.get(req.params.bookingId)
        SuccessResponse.data = response ;
        return res.status(StatusCodes.OK).json(SuccessResponse) ;
    }catch(error){
        ErrorResponse.error = error ;
        return res
        .status(error.statusCode)
        .json(ErrorResponse) ;
    }
}

async function getAll(req,res){
    try{
        const response = await BookingService.getAll()
        SuccessResponse.data = response ;
        return res.status(StatusCodes.OK).json(SuccessResponse) ;
    }catch(error){
        ErrorResponse.error = error ;
        return res
        .status(error.statusCode)
        .json(ErrorResponse) ;
    }
}
module.exports = {
    createBooking,
    cancelBooking,
    getAll ,
    get,
    makePayment
}