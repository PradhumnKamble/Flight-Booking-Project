const CrudRepository = require('./crud-repository')
const { Flights ,Airplane ,airport ,City} = require('../models')

const {Sequelize} = require('sequelize');

const db = require('../models');
const {addRowLock} = require('./queries') ; 

class FlightsRepository extends CrudRepository{
    constructor(){
        super(Flights); 
    }

    // filter == an object {}
    async getAllFlights(filter ,sort){
        
        const response = await Flights.findAll({
            where :filter,
            order:sort,
            // wth 'include'  : get data from more than 1 model ==> as joins
            include :[
                //from airport as welll as airplane
                {
                    model :Airplane,
                    required :true ,
                    as : 'airplaneDetails' 
                },
                {
                    model :airport,
                    required :true ,
                    as : 'departureAirportDetails' ,
                    // if the foreign key column is not primary key in referenced table use 'on'
                    // on : {
                    //     col1 : Sequelize.where(Sequelize.col('Flights.departureAirportId'),'=',Sequelize.col('departureAirportDetails.code'))
                    // }
                    // to also include city details  (it will be a join again in terms of sql query)
                    include :{
                        model :City , 
                        required :true
                    }

                },
                {
                    model :airport,
                    required :true ,
                    as : 'arrivalAirportDetails' ,
                    // if the foreign key column is not primary key in referenced table use 'on'
                    // on : {
                    //     col1 : Sequelize.where(Sequelize.col('Flights.arrivalAirportId'),'=',Sequelize.col('arrivalAirportDetails.code'))
                    // }

                }
            ]
        }) ;
        return response ;
    }
    async updateRemainingSeats(flightId , seats , decrease = true){
        // row lock
        await db.sequelize.query(addRowLock(flightId)) ;

        const flight = await Flights.findByPk(flightId);

        // if decrease == 1 ==> decrement seats
        if(+decrease){
            await flight.decrement('totalSeats' , {by : seats});
        }else{
            await flight.increment('totalSeats' , {by : seats});
        }
        return flight;
    }
}

module.exports = FlightsRepository;