import statusCodes from "../config/statusCodes.js";
import { Users } from "../models/newUser.js";

export const logoutHandler = async (req, res) => {
    try {
        const cookie = req.cookies;

        if (!cookie || !cookie.jwt) {
            res.status(statusCodes.badRequest).json({ msg: "Refresh token is missing" })
        }

        const refreshToken = cookie.jwt;

        const user = await Users.findOne({ refreshToken });

        if (!user) {
            res.clearCookie('jwt', { httpOnly: true, secure: false, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
            return res.sendStatus(statusCodes.noContent);
        }

        // delete refreshtoken from database
        await Users.updateOne({ username: user.username }, { refreshToken: "" });

        // delete cookie from client side
        res.clearCookie('jwt', { httpOnly: true, secure: false, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })

        return res.sendStatus(statusCodes.noContent);
    }
    catch (err) {
        console.log("@logoutHandler : " + err.name + "\n" + err.message);
        return res.status(statusCodes.internalServerError).json({ msg: "Internal server error" })
    }
}