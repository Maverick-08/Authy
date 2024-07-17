import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import responseCode from '../config/responseCode.js';
import { config } from 'dotenv';
import Client from '../config/dbConn.js';
config();

export const authHandler = async (req, res) => {
    try {
        const payload = req.body;

        if (!payload.username || !payload.password) {
            return res.status(responseCode.badRequest).json({ msg: "Missing username or password" })
        }

        // Check whether the user trying to authenticate exists in our database
        const result = await Client.query('SELECT * FROM users WHERE username = $1', [payload.username])
        // console.log(result);

        // If user exists
        if (result.rows.length != 0) {
            // BASE CASE : Match password

            // CASE A :  If user is already logged in
                // 1. Share the refresh token
                // 2. Give new access token

            // CASE B : If user is logging in for the first time
                // 1. Generate access and refresh token
                // 2. Set refresh token in the database
            
            // Update active session count in both the cases

            const userInfo = result.rows[0];

            const doesPasswordMatch = await bcrypt.compare(payload.password,userInfo.password);

            // BASE CASE
            if(!doesPasswordMatch){
                return res.status(responseCode.unauthorised).json({msg:"Incorrect password"})
            }

            // CASE A
            if(userInfo.isloggedin){
                // Step 1
                const refreshToken = userInfo.refreshtoken;

                res.cookie('jwt',refreshToken,{ httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })

                // Step 2
                const activeSessions = userInfo.activesessions;
                await Client.query('UPDATE users SET activesessions = $1 WHERE username = $2',[activeSessions+1,userInfo.username])
                
                // Step 3
                const accessToken = jwt.sign(
                    {
                        userDetails: {
                            username: userInfo.username,
                            role: userInfo.role
                        }
                    },
                    process.env.ACCESS_TOKEN,
                    { expiresIn: '3m' }
                )

                return res.json({
                    username:userInfo.username,
                    fullName: userInfo.fullname,
                    role:userInfo.role,
                    accessToken
                })
            }
            // CASE B
            else{
                // Step 1
                const refreshToken = jwt.sign(
                    {
                        userDetails: {
                            username: userInfo.username,
                            role: userInfo.role
                        }
                    },
                    process.env.REFRESH_TOKEN,
                    { expiresIn: '1d' }
                )

                const accessToken = jwt.sign(
                    {
                        userDetails: {
                            username: userInfo.username,
                            role: userInfo.role
                        }
                    },
                    process.env.ACCESS_TOKEN,
                    { expiresIn: '3m' }
                )

                // Step 2
                await Client.query('UPDATE users SET activesessions = $1, isloggedin = $2, refreshtoken = $3',[1,true,refreshToken])

                // Step 3
                return res.json({
                    username:userInfo.username,
                    fullName: userInfo.fullname,
                    role:userInfo.role,
                    accessToken
                })
            }
            
        }
        else {
            // If user does not exists
            return res.status(responseCode.badRequest).json({ msg: "User does not exist" })
        }
    }
    catch (err) {
        console.log("@authHandler : \n" + err);
        return res.sendStatus(responseCode.internalServerError);
    }
}