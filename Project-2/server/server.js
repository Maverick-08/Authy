import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import Credentials from './middlewares/credentials.js'
import Client from './config/dbConn.js';
import corsOptions from './config/corsOptions.js';
import Register from './routes/register.js';
import Auth from './routes/auth.js';
import Refresh from './routes/refresh.js';
import VerifyToken from './middlewares/verifyToken.js';
import Logout from './routes/logout.js';

const app = express();

// Middlewares
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(Credentials);

// Services
app.use("/register", Register);

app.use("/auth", Auth);

app.use("/refresh", Refresh);

// Protected routes
app.use(VerifyToken)

app.use("/logout", Logout);

app.listen(3000,()=>{console.log("Server is running at port 3000");})