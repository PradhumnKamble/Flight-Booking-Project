const dotenv = require("dotenv"); 

const res = dotenv.config({path: "./.env"}) ;

if(res.error) console.log(res.error)

module.exports = {
  PORT: process.env.PORT,
  FLIGHT_SERVICE :process.env.FLIGHT_SERVICE
};
