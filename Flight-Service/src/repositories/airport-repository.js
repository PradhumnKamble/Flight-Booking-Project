const CrudRepository = require('./crud-repository')
const { airport } = require('../models')

class AirportRepository extends CrudRepository{
    constructor(){
        super(airport); 
    }
}

module.exports = AirportRepository;