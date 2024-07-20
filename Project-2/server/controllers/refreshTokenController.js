import responseCode from "../config/responseCode.js";
import Client from "../config/dbConn.js";
import jwt from 'jsonwebtoken';
import {config} from 'dotenv';
config();

export const refreshTokenHandler = async (req,res) => {
    try{
        const cookie = req.cookies; //  Extract cookie

        // Check is payload present
        if(!cookie || !cookie.jwt){
            return res.status(responseCode.unauthorised).json({msg:"Refresh token is missing"})
        }

        // Extract token
        const refreshToken = cookie.jwt;

        // Match current cookie with the one stored in user record
        const result = await Client.query('SELECT * FROM users WHERE refreshtoken = $1',[refreshToken])

        // If not matched
        if(result.rows.length === 0){
            res.clearCookie('jwt',{httpOnly: true, maxAge: 24 * 60 * 60 * 1000})

            return res.sendStatus(responseCode.noContent);
        }

        // If matched 
        // 1. Verify if it's still valid (not tampered)
        // 2. Issue new access token

        const userInfo = result.rows[0];

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN,
            (err, decoded) => {
                if(err || decoded["userDetails"].username !== userInfo.username){
                    console.log(decoded);
                    return res.status(responseCode.forbidden).json({msg: "Token is tampered"})
                }

                const newAccessToken = jwt.sign(
                    {
                        userDetails:{
                            username: userInfo.username,
                            role: userInfo.role
                        }
                    },
                    process.env.ACCESS_TOKEN,
                    {expiresIn: '3m'}
                )

                return res.json({newAccessToken})
            }
        )
         
    }
    catch(err){
        console.log("@refreshTokenHandler : \n"+err);
        return res.sendStatus(responseCode.internalServerError);
    }
}