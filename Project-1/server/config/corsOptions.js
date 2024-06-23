const allowedOrigins = ["http://localhost:3000","http://localhost:5173"]

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
