const express = require("express");
const router = express.Router();
const userController = require('../Controller/User/userController');
const tryCatch=require('../Middleware/tryCatch')



router
 .post('/signup',tryCatch(userController.userReg))
 .post('/login',tryCatch(userController.userLogin))


 
module.exports = router; 
  