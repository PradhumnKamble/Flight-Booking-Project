const express = require("express");

const router = express.Router(); 
const {BookingController} = require('../../controllers');
const {BookingMiddleware} = require('../../middlewares');

router.post('/' , BookingMiddleware.validateBookingRequest,BookingController.createBooking) ;

// payments
router.post(
    '/payments',
    BookingController.makePayment
);

// cancel booking
router.patch('/:bookingId/actions/cancel' ,BookingController.cancelBooking) ;

// get a booking
router.get('/:bookingId' ,BookingController.get) ;    

// get all bookings
router.get('/' , BookingController.getAll) ;
module.exports = router ;