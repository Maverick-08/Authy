import statusCodes from "./statusCodes.js";

const errorHandler = (err,req,res,next)=>{
    console.error(err);
    return res.status(statusCodes.internalServerError).json({msg:"Internal server error"});
}

export default errorHandler;