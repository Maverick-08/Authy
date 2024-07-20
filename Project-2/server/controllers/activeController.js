import Client from "../config/dbConn.js";
import responseCode from "../config/responseCode.js";

export const activeHandler = async (req, res) => {
    try{
        const {username} = req.params;

        const response = await Client.query('SELECT * FROM users WHERE username = $1',[username]);

        if(response.rows.length === 0){
            return res.status(responseCode.unauthorised).json({msg: "User does not exist"})
        }
        
        return res.json({isActive:response.rows[0].isloggedin,activeSessions:response.rows[0].activesessions})
    }
    catch(err){
        console.log("@activeHandler : \n"+err);
        return res.sendStatus(responseCode.internalServerError);
    }
}