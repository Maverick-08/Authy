import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import Credentials from './config/credentials.js'
import Client from './config/dbConn.js';
import corsOptions from './config/corsOptions.js';
import Register from './routes/register.js';

const app = express();

// Middlewares
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(Credentials)

// Services
app.use("/register", Register)


app.listen(3000,()=>{console.log("Server is running at port 3000");})