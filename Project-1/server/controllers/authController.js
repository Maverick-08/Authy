import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Users } from '../models/newUser.js';
import statusCodes from '../config/statusCodes.js';
import { validatePassword, validateUsername } from '../validations/userValidations.js';

export const authHandler = async (req, res) => {
    try {
        const payload = req.body;

        if (!payload.username || !payload.password) {
            return res.status(statusCodes.badRequest).json({ msg: "Please fill all the fields" })
        }

        // validate schema
        const isValidPassword = validatePassword(payload.password);
        const isValidUsername = validateUsername(payload.username);
        
        if (!isValidUsername.status) {
            return res.status(statusCodes.unauthorised).json({ msg: isValidUsername.msg});
        }

        if (!isValidPassword.status) {
            return res.status(statusCodes.unauthorised).json({ msg: isValidPassword.msg});
        }

        const user = await Users.findOne({ username: payload.username });
        if (!user) {
            return res.status(statusCodes.unauthorised).json({ msg: "Invalid username or password" });
        }

        const matchPassword = await bcrypt.compare(payload.password, user.password);
        if (!matchPassword) {
            return res.status(statusCodes.unauthorised).json({ msg: "Invalid username or password" });
        }

        // if username and password matches create access and refresh tokens
        const accessToken = jwt.sign(
            {
                "userData": {
                    username: user.username,
                    role: user.role
                }
            },
            process.env.ACCESS_TOKEN,
            { expiresIn: '5m' }
        )

        const refreshToken = jwt.sign(
            {
                "userData": {
                    username: user.username,
                    role: user.role
                }
            },
            process.env.REFRESH_TOKEN,
            { expiresIn: '1d' }
        )

        // store refresh token in user record
        await Users.updateOne({
            username: user.username
        },
            { refreshToken }
        )

        // storing refresh token on client side
        // res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: false, maxAge: 24 * 60 * 60 * 1000 })
        // // secure: true for production
        // // secure: false for development

        res.json({ refreshToken, accessToken, role:user.role});
    }
    catch (err) {
        console.log("@authController : " + err.name + "\n" + err.message);
        res.status(statusCodes.internalServerError).json({ msg: "Internal server error" })
    }
}