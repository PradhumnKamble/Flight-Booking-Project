const CrudRepository =  require('./crud-repository');

const {Role} = require('../models');

class RoleRepository extends CrudRepository{
    constructor(){
        super(Role) ;
    }

    async getRoleByName(name){
        try {
            const role = await Role.findOne({where : {name : name}}) ;
            return role ;
        } catch (error) {
            console.log(error)
            throw error ;
        }
    }
}
module.exports = RoleRepository;