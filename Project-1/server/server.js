import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import status from './config/statusCode.js';
import RegistrationHandler from './routes/register.js'

const app = express();

config();
app.use(cors());
app.use(express.json());

app.get("/",)


// Global Error Handler
app.use((err,req,res,next)=>{
    console.error(err);
    res.status(status.internalServerError).json({msg:"Internal server error"})
})

app.listen(process.env.PORT,
    ()=>{console.log("Server is running at port 3000")}
)