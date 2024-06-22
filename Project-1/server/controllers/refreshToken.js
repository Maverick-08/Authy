import fs from 'fs/promises';
import path from 'path';
import Root from '../config/path.js';
import jwt from 'jsonwebtoken';
import statusCodes from '../config/statusCode.js';


const refreshTokenHandler = async (req,res)=>{
    const cookie = req.cookies;

    if(!cookie || !cookie.jwt){
        return res.status(statusCodes.unauthorised).json({msg:"Refresh token is missing"})
    }

    const refreshToken = cookie.jwt;

    const existingUsersData = JSON.parse(await fs.readFile(path.join(Root,"data","users.json"),'utf-8'))

    const userExists = existingUsersData.find(user => user.refreshToken === refreshToken);

    if(!userExists) return res.status(statusCodes.forbidden)

    let accessToken

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN,
        (err,decoded)=>{
            if(err || decoded["userData"]["username"] !== userExists.username){
                return res.status(statusCodes.forbidden)
            }

            accessToken = jwt.sign({
                "userData":{
                    username:userExists.username,
                    role:userExists.role
                    }
                },
                process.env.ACCESS_TOKEN,
                {expiresIn:"5m"}
            )
        }
    )
    
    res.json({accessToken})
}

export default refreshTokenHandler;