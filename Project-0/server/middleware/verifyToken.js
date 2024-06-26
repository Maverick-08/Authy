import jwt from 'jsonwebtoken';
import statusCodes from '../config/statusCode.js';

const tokenVerificationHandler = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    // console.log(authHeader);
    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJ1c2VybmFtZSI6InVzZXIxIiwicm9sZXMiOlsiVXNlciJdfSwiaWF0IjoxNzE1ODQyODQ2LCJleHAiOjE3MTU4NDI5NjZ9.t7t9KGDIYydfXLwBeO2CVFgtW5T-M7Luemjkdvpv1Vo

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(statusCodes.unauthorised).json({ msg: "Access token is missing." })
    }

    const accessToken = authHeader.split(" ")[1];

    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN,
        (err, decoded) => {
            if (err) {
                return res.status(statusCodes.forbidden).json({msg:"Invalid token"})
            }

            req.username = decoded["userData"]["username"];
            req.role = decoded["userData"]["role"];

            next();
        }
    )
}

export default tokenVerificationHandler;