const express = require("express");

const router = express.Router();
const {AuthMiddleware} = require("../../middlewares")
const {UserController} = require("../../controllers");

router.post('/signup' ,AuthMiddleware.validateAuthRequest, UserController.createUser);
router.post('/signin' ,AuthMiddleware.validateAuthRequest, UserController.signIn);
router.post('/role',AuthMiddleware.checkAuth,AuthMiddleware.isAdmin,UserController.addRoleToUser) ;

module.exports = router ;