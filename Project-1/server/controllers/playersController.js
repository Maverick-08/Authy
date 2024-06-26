import statusCodes from "../config/statusCodes.js";
import { Players } from "../models/players.js";

export const getAllPlayersData = async (req,res) => {
    try{
        const response = await Players.find({});
        return res.json({data:response});
    }
    catch(err){
        console.log("@getAllPlayersData : "+err.name+"\n"+err.message);
        return res.status(statusCodes.internalServerError).json({msg:"Internal server error"})
    }

} 