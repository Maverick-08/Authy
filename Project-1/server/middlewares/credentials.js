import { allowedOrigins } from "../config/allowedOrigins.js";

const credentialsHandler = (req,res,next) => {
    const origin = req.headers.origin;

    if(allowedOrigins.includes(origin) || !origin){
        res.set("Access-Control-Allow-Credentials",true);
    }

    next();
}

export default credentialsHandler;