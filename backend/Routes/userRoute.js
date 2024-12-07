const express = require("express");
const router = express.Router();
const userController = require('../Controller/User/userController');
const postcontroller = require('../Controller/User/postController');
const tryCatch=require('../Middleware/tryCatch');
const upload = require("../Middleware/imageUpload");



router
 .post('/signup',tryCatch(userController.userReg))
 .post('/login',tryCatch(userController.userLogin))
 .post('/logout',tryCatch(userController.userLogout))

 .get('/posts',tryCatch(postcontroller.getAllPosts))
 .get('/posts/:id',tryCatch(postcontroller.getpostbyid))
.post('/addpost',upload.single('image'),tryCatch(postcontroller.addPost)) 




 
module.exports = router; 
  