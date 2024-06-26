import { allowedOrigins } from "./allowedOrigins.js";

export const corsOptions = {
    origin:(origin,callback)=>{
        if(allowedOrigins.includes(origin) || !origin){
            callback(null,true);
        }
        else{
            callback(new Error("Blocked by cors !"))
        }
    },
    optionSuccessStatus:200
}
