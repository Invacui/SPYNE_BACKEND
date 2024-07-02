//ROUTES
const express = require("express");
const auth = express.Router(); //create modular, mountable route handlers.
const IsLoggedIn = require("../middleware/IsLoggedIn");
const {validateUserId, validateUser} = require("../middleware/userValidator")
const userController = require('../controller/userController');

auth.post('/register', validateUser, userController.registerUser);//REGISTER
auth.post('/login', userController.loginUser);//LOGIN
auth.put('/:userId', IsLoggedIn, validateUserId, validateUser, userController.updateUser);//UPDATE
auth.delete('/:userId', IsLoggedIn, validateUserId, userController.deleteUser);//DELETE
auth.get('/list', userController.getUserList);//GETLIST
auth.get('/search', userController.searchUserByName);//GETBYID

module.exports = auth;
