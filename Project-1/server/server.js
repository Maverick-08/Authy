import express from 'express';
import cors from 'cors';
import statusCodes from './config/statusCodes.js';
import {config} from 'dotenv';

const app = express();

// MIDDLEWARES
config();
app.use(cors());
app.use(express.json());


// PATHS
// app.use("/register",)


// Global Error function
app.use((err,req,res,next) => {
    console.error(err);
    res.status(statusCodes.internalServerError).json({msg:"Internal server error"});
})


app.listen(process.env.PORT,()=>{console.log("Server is running at port 3000")})