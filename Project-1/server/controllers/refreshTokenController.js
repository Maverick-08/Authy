import jwt from 'jsonwebtoken';
import statusCodes from '../config/statusCodes.js';
import { Users } from '../models/newUser.js';

export const refreshTokenHandler = async (req, res) => {
    const cookie = req.body;

    if (!cookie ) {
        return res.sendStatus(statusCodes.forbidden);
    }

    try {
        const refreshToken = cookie.refreshToken;

        // Match current cookie with the one stored in user record
        const user = await Users.findOne({ refreshToken });

        if (!user) {
            return res.sendStatus(statusCodes.forbidden);
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
                    { expiresIn: '1d' }
                )

                await Users.updateOne({ username: user.username }, { refreshToken: newRefreshToken });
                
                // res.cookie('jwt', newRefreshToken, { httpOnly: true, sameSite: 'None', secure: false, maxAge: 24 * 60 * 60 * 1000 })

                res.json({ newAccessToken , newRefreshToken});
            }
        )
    }
    catch(err){
        console.error("@refreshTokenHandler : "+err.name+"\n"+err.message);
        res.status(statusCodes.internalServerError).json({ msg: "Internal server error" });
    }
}