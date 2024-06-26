import express from 'express';
import cors from 'cors';
import statusCodes from './config/statusCodes.js';
import {config} from 'dotenv';
import connect from './config/dbConn.js';
import mongoose from 'mongoose';

const app = express();

// MIDDLEWARES
config();
app.use(cors());
app.use(express.json());
connect();


// PATHS
// app.use("/register",)



// Global Error function
app.use((err,req,res,next) => {
    console.error(err);
    res.status(statusCodes.internalServerError).json({msg:"Internal server error"});
})

// DATABASE
mongoose.connection.once('open',()=>{
    console.log("Connected To DB");
    app.listen(process.env.PORT,()=>{console.log("Server is running at port 3000")})
})
