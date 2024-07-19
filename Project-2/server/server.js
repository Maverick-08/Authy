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
import Data from './routes/api/data.js'
import Notifications from './routes/api/notifications.js';
import Access from './routes/access.js';
import Active from './routes/api/active.js';

const app = express();

// Middlewares
app.use(Credentials);
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

// Services
app.use("/register", Register);

app.use("/auth", Auth);

app.use("/refresh", Refresh);

app.use("/active", Active)

// Protected routes
app.use(VerifyToken)

app.use("/logout", Logout);

app.use("/data", Data);

app.use("/notifications", Notifications);

app.use("/access", Access);


app.listen(3000,()=>{console.log("Server is running at port 3000");})