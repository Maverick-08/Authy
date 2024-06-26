import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import status from './config/statusCode.js';
import RegistrationHandler from './routes/register.js'
import AuthHandler from './routes/auth.js';
import DataHandler from './routes/api/data.js';
import LogoutHandler from './routes/logout.js';
import verifyJWT from './middleware/verifyToken.js';
import RefreshToken from './routes/refresh.js';
import cookieParser from 'cookie-parser';
import validToken from './routes/api/check.js'
import { corsOptions } from './config/corsOptions.js';
import { credentialsHandler } from './middleware/credentials.js';

const app = express();

config();
app.use(credentialsHandler);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())

app.use("/register",RegistrationHandler);

app.use("/auth",AuthHandler);

app.use("/refresh",RefreshToken);

app.use(verifyJWT);

app.use("/check",validToken);

app.use("/data",DataHandler);

app.use("/logout",LogoutHandler);


// Global Error Handler
app.use((err,req,res,next)=>{
    console.error(err);
    res.status(status.internalServerError).json({msg:"Internal server error"});
})

app.listen(process.env.PORT,
    ()=>{console.log("Server is running at port 3000")}
)