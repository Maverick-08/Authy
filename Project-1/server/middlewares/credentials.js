import { allowedOrigins } from "../config/allowedOrigins.js";

const credentialsHandler = (req,res,next) => {
    const origin = req.headers.origin;

    if(allowedOrigins.includes(origin)){
        res.setHeader("Access-Control-Allow-Credentials",true);
    }

    next();
}

export default credentialsHandler;