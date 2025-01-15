const express = require("express");
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const errorHandler = require('./Middlewares/errorHandler');
const useRoutes = require('./Routes/userRoute'); 
const adminRoutes = require('./Routes/adminRoutes'); 
const cors=require("cors") 
const PORT=4000
const connectDB = require("./Configs/db"); 

app.use(express.json());
app.use(cors(
  {origin:process.env.FRONTEND_URL,
    credentials:true
  }
))
app.use(cookieParser())

app.use('/', useRoutes);
app.use('/admin',adminRoutes);

app.use(errorHandler)

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on Port:${process.env.FRONTEND_URL}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error.message);
  });