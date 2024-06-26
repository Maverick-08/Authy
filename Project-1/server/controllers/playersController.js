import statusCodes from "../config/statusCodes.js";

export const getAllPlayersData = async (req,res) => {
    try{
        
    }
    catch(err){
        console.log("@getAllPlayersData : "+err.name+"\n"+err.message);
        return res.status(statusCodes.internalServerError).json({msg:"Internal server error"})
    }

} 