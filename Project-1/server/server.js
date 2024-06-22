import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import status from './config/statusCode.js';
import RegistrationHandler from './routes/register.js'
import AuthHandler from './routes/auth.js';
import DataHandler from './routes/api/data.js';

const app = express();

config();
app.use(cors());
app.use(express.json());

app.use("/register",RegistrationHandler)

app.use("/auth",AuthHandler)

app.use("/data",DataHandler)


// Global Error Handler
app.use((err,req,res,next)=>{
    console.error(err);
    res.status(status.internalServerError).json({msg:"Internal server error"})
})

app.listen(process.env.PORT,
    ()=>{console.log("Server is running at port 3000")}
)