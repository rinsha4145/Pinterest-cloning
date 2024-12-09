const express = require("express");
const router = express.Router();
const userController = require('../Controller/User/userController');
const postcontroller = require('../Controller/User/postController');
const tryCatch=require('../Middleware/tryCatch');
const upload = require("../Middleware/imageUpload");
const { userAuthMiddleware } = require("../Middleware/authentication");
const { forgottpass } = require("../Controller/forgottPassword");



router
 .post('/signup',tryCatch(userController.userReg))
 .post('/login',tryCatch(userController.userLogin))
 .post('/logout',tryCatch(userController.userLogout))
 .get('/me',userAuthMiddleware,tryCatch(userController.profileView))


//  .post('/forgottpass',tryCatch(forgottpass))

 .get('/posts',tryCatch(postcontroller.getAllPosts))
 .get('/posts/:id',userAuthMiddleware,tryCatch(postcontroller.getpostbyid))
 .post('/addpost',userAuthMiddleware,upload.single('image'),tryCatch(postcontroller.addPost)) 




 
module.exports = router; 
  