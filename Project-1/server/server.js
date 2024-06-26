import express from 'express';
import cors from 'cors';
import statusCodes from './config/statusCodes.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import connect from './config/dbConn.js';
import Register from './routes/register.js';
import Authenticate from './routes/auth.js';
import CheckToken from './routes/checkToken.js';
import RefreshToken from './routes/refresh.js';
import { config } from 'dotenv';
import { verifyTokenHandler } from './middlewares/verifyToken.js';

const app = express();

// MIDDLEWARES
config();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
connect();


// PATHS
app.use("/register", Register);

app.use("/auth", Authenticate);

app.use("/refresh",RefreshToken);


// PROTECTED ROUTES
app.use(verifyTokenHandler)

app.use("/check",CheckToken)



// Global Error function
app.use((err, req, res, next) => {
    console.error(err);
    res.status(statusCodes.internalServerError).json({ msg: "Internal server error" });
})

// DATABASE
mongoose.connection.once('open', () => {
    console.log("Connected To DB");
    app.listen(process.env.PORT, () => { console.log("Server is running at port 3000") })
})
