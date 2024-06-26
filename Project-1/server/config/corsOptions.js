import { allowedOrigins } from "./allowedOrigins.js";

const corsOptions = {
    origin:(origin,callback)=>{
        if(allowedOrigins.includes(origin) || !origin){
            callback(null,true);
        }
        else{
            callback("Blocked by cors !")
        }
    },
    optionSuccessStatus:200
}

export default corsOptions;