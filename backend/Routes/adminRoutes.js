const express = require("express");
const router = express.Router();
const admincontroller = require('../Controller/Admin/adminController');
const categorycontroller = require('../Controller/Admin/categoryController');
const usercontroller = require('../Controller/Admin/userController');
const reportcontroller = require('../Controller/Admin/reportController');
const postcontroller = require('../Controller/Admin/postController');



const tryCatch=require('../Middlewares/tryCatch');
const { adminAuthMiddleware } = require("../Middlewares/authentication");
 
router
.post('/admlogin',tryCatch(admincontroller.adminLogin))   
.post('/admlogout',adminAuthMiddleware,tryCatch(admincontroller.adminLogout))

.get('/viewusers',adminAuthMiddleware,tryCatch(usercontroller.allUsers))
.get('/viewuserbyid/:id',adminAuthMiddleware,tryCatch(usercontroller.viewUserById))
.post('/updateuser/:id',adminAuthMiddleware,tryCatch(usercontroller.blockUser))

.get('/category',tryCatch(categorycontroller.getAllCategory))
.post('/addcategory',adminAuthMiddleware,tryCatch(categorycontroller.addCategory))
.delete('/deletecategory/:id',adminAuthMiddleware,tryCatch(categorycontroller.deleteCategory))
.get('/categorybyid/:id',tryCatch(categorycontroller.getCategoryById))
.put('/updatecategory/:id',tryCatch(categorycontroller.updateCategory))



.get('/viewreports',adminAuthMiddleware,tryCatch(reportcontroller.getReports))
.post('/dismissreports/:id',adminAuthMiddleware,tryCatch(reportcontroller.dismissReports))

.delete('/deletepost/:id',adminAuthMiddleware,tryCatch(postcontroller.deletePost))
.get('/pop',adminAuthMiddleware,tryCatch(postcontroller.getPostsByDate))

module.exports = router; 
