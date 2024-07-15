import statusCodes from "../config/statusCodes.js";
import { Users } from "../models/newUser.js";

export const logoutHandler = async (req, res) => {
    try {
        // Retrieve cookies from the request
        const cookie = req.cookies;

        // Check if JWT cookie exists
        if (!cookie || !cookie.jwt) {
            return res.status(statusCodes.badRequest).json({ msg: "Refresh token is missing" });
        }

        const refreshToken = cookie.jwt;

        // Find user by refreshToken in database
        const user = await Users.findOne({ refreshToken });

        // If user not found, clear cookie and return success
        if (!user) {
            // res.clearCookie('jwt', { httpOnly: true, secure: false, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

            res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
            return res.sendStatus(statusCodes.noContent);
        }

        // Remove refresh token from user document in database
        await Users.updateOne({ username: user.username }, { refreshToken: "" });

        // Clear cookie from client side
        // res.clearCookie('jwt', { httpOnly: true,maxAge: 24 * 60 * 60 * 1000 });

        res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

        // Return success status
        return res.sendStatus(statusCodes.noContent);
    } catch (err) {
        // Log and handle errors
        console.error("@logoutHandler : " + err.name + "\n" + err.message);
        return res.status(statusCodes.internalServerError).json({ msg: "Internal server error" });
    }
};
