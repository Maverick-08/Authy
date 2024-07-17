import Client from "../config/dbConn.js";
import responseCode from "../config/responseCode.js";

export const logoutHandler = async (req, res) => {
    try{
        const payload = req.body; // {username, allDevices: true/false}

        if(!payload.username){
            return res.status(responseCode.badRequest).json({msg: "Username is missing"})
        }

        // If log out from all devices is selected
        if(payload.allDevices){
            await Client.query('UPDATE users SET refreshtoken = $1, isloggedin = $2, activesessions = $3 WHERE username = $4',[null, false, 0, payload.username])

            return res.sendStatus(responseCode.noContent)
        }
        else{
            // Logout from a particular device
            const result = await Client.query('SELECT activesessions FROM users WHERE username = $1',[payload.username])

            const {activesessions} = result.rows[0];

            await Client.query('UPDATE users SET activesessions = $1 WHERE username = $2',[activesessions-1, payload.username])

            return res.sendStatus(responseCode.noContent);
        }
    }
    catch(err){
        console.log("@logoutHandler : \n",+err);
        return res.sendStatus(responseCode.internalServerError);
    }
}