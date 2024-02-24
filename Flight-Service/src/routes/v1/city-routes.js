const express = require("express");

const   { CityController } = require("../../controllers") ;
const   { CityMiddleware } = require("../../middlewares");
const router = express.Router();

//api/v1/cities GET
router.get('/' , CityController.getCities) ;


// api/v1/cities POST
router.post('/' , CityMiddleware.validateCreateRequest,CityController.createCity) ;

// api/v1/cities/:id DELETE
router.delete('/:id' , CityController.destroyCity);

// api/v1/cities/:id PATCH
router.patch('/:id' , CityMiddleware.validatePatchRequest , CityController.updateCity);
module.exports = router;
