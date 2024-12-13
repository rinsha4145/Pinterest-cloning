const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const cookieParser = require('cookie-parser');

const errorHandler = require('./Middleware/errorHandler');
const useRoutes = require('./Routes/userRoute'); 
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
app.use(errorHandler)

mongoose.connect(process.env.MONGODB_URL)
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`)); 