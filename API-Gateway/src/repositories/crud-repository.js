const {StatusCodes} = require('http-status-codes');

const AppError = require('../utils/errors/app-errors')
class CrudRepository{
    constructor(model){
        this.model = model;
    }
    // we will be  handling errors in service layer
    async create(data){
        const response = await this.model.create(data);
        return response;
    }
    async destroy(data){
        const response = await this.model.destroy({
                where:{
                    id:data // ==> where id == data
                }
            });
        if(!response){
            throw new AppError("resourse doesnt exists" ,StatusCodes.NOT_FOUND);
        }
        return response;
    }
    async get(id){
        const response = await this.model.findByPk(id); // returns tuple by matched id
        console.log(response);
        if(!response){
            throw new AppError("Not able to get the resource" ,StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async getAll(){
        try {
            const response = await this.model.findAll(); // select * from table
            return response;
        } catch (error) {
            throw error ;
        }
    }
    // data is an object ex -> {col1 : "value" , col2 : "value" }          
    async update(id,data){
        const response = await this.model.update(data ,{
                where:{
                    id:id
                }
            });
        if(response[0] === 0) {
            throw new AppError("Required Resource not found",StatusCodes.NOT_FOUND);
        }
        return response;
    }
}

module.exports = CrudRepository;