const dotenv = require("dotenv");

const res = dotenv.config({path: "./.env"}) ;

if(res.error) console.log(res.error)

module.exports = {
  PORT: process.env.PORT,
  SALT_ROUNDS : process.env.SALT_ROUNDS,
  JWT_SECRET : process.env.JWT_SECRET,
  JWT_EXPIRY : process.env.JWT_EXPIRY,
  FLIGHT_SERVICE:process.env.FLIGHT_SERVICE,
  BOOKING_SERVICE:process.env.BOOKING_SERVICE
};
