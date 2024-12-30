const express = require("express");
const router = express.Router();  
const userController = require('../Controller/User/userController');
const postcontroller = require('../Controller/User/postController');
const savedcontroller = require('../Controller/User/savedController');
const boardcontroller = require('../Controller/User/boardController');
const likecontroller = require('../Controller/User/likeController')
const tryCatch=require('../Middleware/tryCatch');
const upload = require("../Middleware/imageUpload");
const { userAuthMiddleware } = require("../Middleware/authentication");
const {  forgotpass } = require("../Controller/forgotPassword");
const { resetpass } = require("../Controller/resetPassword");
 

router
 .post('/signup',tryCatch(userController.userReg))
 .post('/login',tryCatch(userController.userLogin))   
 .post('/logout',userAuthMiddleware,tryCatch(userController.userLogout))
 .get('/me',userAuthMiddleware,tryCatch(userController.profileView))
 .put('/editprofile',userAuthMiddleware,upload.single('profileimage'),tryCatch(userController.editProfile))
 .get('/profile/:id',userAuthMiddleware,tryCatch(userController.userProfile))
 .post('/follow/:id',userAuthMiddleware,tryCatch(userController.followUnfollow)) 
 .post('/forgot-password',tryCatch(forgotpass))
 .post('/reset-password/:id/:token',tryCatch(resetpass))


 .get('/all',tryCatch(postcontroller.getAllPosts))
 .get('/post/:id',tryCatch(postcontroller.getpostbyid))
 .get('/posts/:category',tryCatch(postcontroller.getbycategory)) 
 .post('/addpost',userAuthMiddleware,upload.single('image'),tryCatch(postcontroller.addPost))
 .put('/updatepost/:id',userAuthMiddleware,upload.single('image'),tryCatch(postcontroller.postUpdate)) 
 .delete('/deletepost/:id',userAuthMiddleware,tryCatch(postcontroller.deletePost))
 .get('/postss',userAuthMiddleware,tryCatch(postcontroller.getPostByOwner))

 .get('/saves',userAuthMiddleware,tryCatch(savedcontroller.getSaved))   
 .post('/addtosave',userAuthMiddleware,tryCatch(savedcontroller.addToSaved))  
 .delete('/removesaved',userAuthMiddleware,tryCatch(savedcontroller.removeSaved))
 
 .get('/viewlike',userAuthMiddleware,tryCatch(likecontroller.getLikedPosts))   
 .post('/like',userAuthMiddleware,tryCatch(likecontroller.likePost))  
 .delete('/unlike',userAuthMiddleware,tryCatch(likecontroller.unlikePost))
 
 .post('/createboard',userAuthMiddleware,tryCatch(boardcontroller.createBoard))  
 .post('/addtoboarad',userAuthMiddleware,tryCatch(boardcontroller.addToBoard))  
 .get('/viewbyid/:id',userAuthMiddleware,tryCatch(boardcontroller.viewBoardById))  
 .get('/viewboards',userAuthMiddleware,tryCatch(boardcontroller.getAllBoards))  














 
module.exports = router; 
                   