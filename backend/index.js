const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const cookieParser = require('cookie-parser');
const errorHandler = require('./Middlewares/errorHandler');
const useRoutes = require('./Routes/userRoute'); 
const adminRoutes = require('./Routes/adminRoutes'); 
const cors=require("cors") 
const PORT=4000

app.use(express.json());
app.use(cors(
  {origin:"http://localhost:3000",
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
      console.log(`Server Running on Port: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error.message);
  });