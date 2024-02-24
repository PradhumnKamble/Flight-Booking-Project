const express = require("express");
const apiRoutes = require("./routes") ;
// this file contains basic server configurations

const { ServerConfig } = require("./config/index.js"); // no need to add index.js
const { urlencoded } = require("express");

const app = express();

// we need to tell the express of the type of data we will be recieving
// app.use()==> registers the middleware for all the upcoming routes

app.use(express.json()); //==> will help to parse th incoming json data (only)
// without it express wont be able to parse the data of type json
// express.json() ==> returns a middleware that parses json data 

app.use(express.urlencoded({extended:true})) ; // parses econded things in url 

// 'apiRoutes' router will imposed on url conating /api as a part
// if any point the url has /api , then we will bind apiRoutes to it
// the return will be handled by apiRoutes
app.use('/api' , apiRoutes) ;

app.listen(ServerConfig.PORT, async () => {
  console.log(`server activated at Port ${ServerConfig.PORT}`);

  // fetaures provided by sequelize
  // const {City , airport} = require('./models') ;
  // await City.create({name : 'Mumbai'}) ; 
  // const Mumbai = await City.findByPk(6) ;
  // console.log(Mumbai)
  
  // const cities = await City.findAll() ;
  // console.log(cities);
  // const Aurangabad = await City.findByPk(2) ;

  // cretaing airports
  // const shivajiAirport = await airport.create({name :'Chhatrapati Shivaji Maharaj International Airport Mumbai' , code : 'BOM' , cityId :6 ,address :'1st Floor, Terminal 1, Santacruz East, Mumbai - 400099, India' , createdAt:new Date() , updatedAt :new Date()}) ;
  // console.log(shivajiAirport) ;

  // creating ariports with cityS

  
  // const AugAirport = await Aurangabad.createAirport({name:'Aurangabad Airport',code:'IXU',cityId:2,address:'Jalna Road, MIDC Industrial Area, Chilkalthana, Aurangabad, Maharashtra 431006 ,India' ,createdAt:new Date() , updatedAt :new Date()});
  // console.log(AugAirport);
  
  // get all airports in mumbai
  // const MumbaiAirports =  await Mumbai.getAirports() ;
  
  // removing assocaiations airports from a city
  // remove --> removes asscoaitons not delete the records in case of one to many relations

  // const MumbaiAirport = await airport.findByPk(2) ; // doesnt work as cityId cannot be null , so you need to manually delete the airports by destroy method
  // await Mumbai.removeAirport(MumbaiAirport) ;

  // deleting City Mumbai
  // const res  = await City.destroy({
  //   where :{
  //     id : 1
  //   }
  // })
  // console.log(res) ; 

  // const airports = await airport.findAll() ;
  // console.log(airports) ; 
  // get all airports in mumbai
  // const MumbaiAirports =  await Mumbai.getAirports() ;
  // console.log(MumbaiAirports);
});
