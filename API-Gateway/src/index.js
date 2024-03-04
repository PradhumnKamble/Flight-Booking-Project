const express = require("express");
const rateLimit = require("express-rate-limit")
const {createProxyMiddleware} = require("http-proxy-middleware");
const apiRoutes = require("./routes") ;

const { ServerConfig } = require("./config/index.js");

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:true})) ; // parses econded things in url 

const limiter = rateLimit({
    windowMs : 3 * 60 * 1000 , // 3 min
    limit : 15 // max 10 req from an 'ip' per window

})
const proxyFlightService = createProxyMiddleware({
  target : ServerConfig.FLIGHT_SERVICE ,
  changeOrigin :true ,
  pathRewrite : {'^/flightsService' :'/'}
})

const proxyBookingService = createProxyMiddleware({
  target : ServerConfig.BOOKING_SERVICE,
  changeOrigin :true ,
  pathRewrite : {'^/bookingsService' :'/'}
})

app.use(limiter) ;
app.use('/flightsService',proxyFlightService);
app.use('/bookingsService',proxyBookingService);
app.use('/api' , apiRoutes) ;

app.listen(ServerConfig.PORT, () => {
  console.log(`server activated at Port ${ServerConfig.PORT}`);
});
