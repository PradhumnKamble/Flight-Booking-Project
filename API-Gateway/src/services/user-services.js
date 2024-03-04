const { StatusCodes } = require('http-status-codes');
const {UserRepository} = require('../repositories') ;
const {RoleRepository} = require('../repositories') ;
const AppError = require('../utils/errors/app-errors')
const userRepository = new UserRepository(); 
const roleRepository = new RoleRepository(); 
const {Enums} = require('../utils/common');
const {Auth} = require('../utils/common/index')

async function createUser(data){
      try{
        const user = await userRepository.create(data) ;
        const role = await roleRepository.getRoleByName(Enums.USER_ROLES_ENUMS.CUSTOMER)
        
        user.addRole(role) ; // giving customer role to all users initially
        return user; 
    }
    catch(error){
        console.log("service error ",error)
        if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError'){
           let explanation =[] ;
           error.errors.forEach( (err)=>{
               explanation.push(err.message);
           })
           console.log(explanation) ;
           throw new AppError(explanation , StatusCodes.BAD_REQUEST) ;
        }
        else
        throw new AppError('Cannot create new user object' , StatusCodes.INTERNAL_SERVER_ERROR) ;    
    }
}
async function signIn(data){
    try{
        const user = await userRepository.getUserByEmail(data.email) ;
        if(!user){
            throw new AppError("User doesnt exits" , StatusCodes.NOT_FOUND) ;
        }
        const passwordMatch = Auth.checkPassword(data.password ,user.password) ;
        if(!passwordMatch){
            throw new AppError("Invalid Password" , StatusCodes.BAD_REQUEST);
        }

        // password match ==> create token

        const jwt = Auth.createToken({id:user.id ,email :user.email}) ;
        return jwt;
    }
    catch(error){
        if( error instanceof AppError) throw error;
        
        throw new AppError("Something went wrong",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function isAuthenticated(token){
    try {
        if(!token) throw new AppError("Missing JWT token",StatusCodes.BAD_REQUEST);

        const response = Auth.verifyToken(token) ;

        const user = await userRepository.get(response.id);
        if(!user){
            throw new AppError("No user found",StatusCodes.NOT_FOUND);
        }

        return user.id;
    } catch (error) {
        if(error instanceof AppError) throw error ;
        if(error.name === "JsonWebTokenError" ) 
            throw new AppError("Invalid Token" ,StatusCodes.BAD_REQUEST) ;
        
        throw new AppError("Something went wrong",StatusCodes.INTERNAL_SERVER_ERROR)

    }
}
async function addRoleToUser(data){

    try {
        const user = await userRepository.get(data.id);
        if(!user)
        {
            throw new AppError("No user exists" ,StatusCodes.NOT_FOUND );
        }
        const role = await roleRepository.getRoleByName(data.role);
        if(!role) {
            throw new AppError("No role exists" ,StatusCodes.NOT_FOUND);
        }
        user.addRole(role);
        return user ;
    } catch (error) {
        if( error instanceof AppError) throw error;
        
        throw new AppError("Something went wrong",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
async function isAdmin(id){

    try {
        const user = await userRepository.get(id);
        if(!user)
        {
            throw new AppError("No user exists" ,StatusCodes.NOT_FOUND );
        }
        const role = await roleRepository.getRoleByName(Enums.USER_ROLES_ENUMS.ADMIN);
        if(!role) {
            throw new AppError("No role exists" ,StatusCodes.NOT_FOUND);
        }
        
        return user.hasRole(role);
    } catch (error) {
        if( error instanceof AppError) throw error;
        
        throw new AppError("Something went wrong",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
module.exports = {
    createUser,
    signIn,
    isAuthenticated,
    addRoleToUser,
    isAdmin
}
