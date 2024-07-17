import jwt from 'jsonwebtoken';
import {config} from 'dotenv';
import responseCode from '../config/responseCode.js';
config();

const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers.authorization ?? req.headers.Authorization;

    // Check whether the incoming request has 'Authorization' set in the headers or not
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(responseCode.forbidden).json({msg: "Access token is missing"})
    }

    // Extract access token
    const accessToken = authHeader.split(" ")[1];

    // Verify access token
    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN,
        (err, decoded) => {
            if(err){
                return res.sendStatus(responseCode.forbidden)
            }

            req.username = decoded["userDetails"].username
            req.role = decoded["userDetails"].role

            next();
        }
    )
}

export default verifyAccessToken;