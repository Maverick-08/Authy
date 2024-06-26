import jwt from 'jsonwebtoken';
import statusCodes from '../config/statusCodes.js';
import { Users } from '../models/newUser.js';

export const refreshTokenHandler = async (req, res) => {
    const cookie = req.cookies;

    if (!cookie || !cookie.jwt) {
        return res.status(statusCodes.forbidden);
    }

    try {
        const refreshToken = cookie.jwt;

        // Match current cookie with the one stored in user record
        const user = await Users.findOne({ refreshToken });

        if (!user) {
            return res.status(statusCodes.forbidden);
        }

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN,
            async (err, decoded) => {
                // If token is tampered return with unauthorized remark
                if (err || decoded["userData"].username !== user.username) {
                    return res.status(statusCodes.forbidden).json({ msg: "Unauthorized user" });
                }

                // if everything's okay create new access tpken and refresh token

                const newAccessToken = jwt.sign(
                    {
                        "userData": {
                            username: user.username,
                            role: user.role
                        }
                    },
                    process.env.ACCESS_TOKEN,
                    { expiresIn: '5m' }
                )

                const newRefreshToken = jwt.sign(
                    {
                        "userData": {
                            username: user.username,
                            role: user.role
                        }
                    },
                    process.env.REFRESH_TOKEN,
                    { expiresIn: '5m' }
                )

                await Users.updateOne({ username: user.username }, { refreshToken: newRefreshToken });

                res.json({ newAccessToken });
            }
        )
    }
    catch(err){
        console.error("@refreshTokenHandler : "+err.name+"\n"+err.message);
        res.status(statusCodes.internalServerError).json({ msg: "Internal server error" });
    }
}