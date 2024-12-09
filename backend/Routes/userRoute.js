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
 .post('/logout',userAuthMiddleware,tryCatch(userController.userLogout))
 .get('/me',userAuthMiddleware,tryCatch(userController.profileView))
 .get('/profile/:id',userAuthMiddleware,tryCatch(userController.userProfile))
 .post('/follow/:id',userAuthMiddleware,tryCatch(userController.followUnfollow)) 

//  .post('/forgottpass',tryCatch(forgottpass))

 .get('/all',tryCatch(postcontroller.getAllPosts))
 .get('/post/:id',tryCatch(postcontroller.getpostbyid))
 .get('/posts/:category',tryCatch(postcontroller.getbycategory)) 
 .post('/addpost',userAuthMiddleware,upload.single('image'),tryCatch(postcontroller.addPost))
 .put('/updatepost/:id',userAuthMiddleware,upload.single('image'),tryCatch(postcontroller.postUpdate)) 
 .delete('/deletepost/:id',userAuthMiddleware,tryCatch(postcontroller.deletePost)) 




 
module.exports = router; 
                   