import fs from 'fs/promises';
import bcrypt from 'bcrypt';
import path from 'path';
import Root from '../config/path.js';
import statusCodes from '../config/statusCode.js';
import jwt from 'jsonwebtoken';

const authHandler = async (req, res) => {
    try {
        const payload = req.body;

        // If username or password data is missing send bad request
        if (!payload.username || !payload.password) {
            return res.status(statusCodes.badRequest).json({ msg: "Missing username or password" })
        }

        // Check whether the user exists in our database
        const existingUsersData = JSON.parse(await fs.readFile(path.join(Root, "data", "users.json"), 'utf-8'))

        const userExists = existingUsersData.find(user => user.username === payload.username)

        // If user does not exist 
        if (!userExists) {
            return res.status(statusCodes.unauthorised).json({ msg: "User does not exists" })
        }

        // If user exists in our database match passwords
        const isPasswordMatching = await bcrypt.compare(payload.password, userExists.password)

        // If password do not match
        if (!isPasswordMatching) {
            return res.status(statusCodes.unauthorised).json({ msg: "Incorrect password" })
        }

        // If password is correct then generate tokens
        const accessToken = jwt.sign(
            {
                "userData": {
                    username: payload.username,
                    role: payload.role
                }
            },
            process.env.ACCESS_TOKEN,
            { expiresIn: "2m" }
        )

        const refreshToken = jwt.sign(
            {
                "userData": {
                    username: payload.username,
                    role: payload.role
                }
            },
            process.env.REFRESH_TOKEN,
            { expiresIn: "1d" }
        )

        // storing refresh token on client side
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: false, maxAge: 24 * 60 * 60 * 1000 })
        // secure: true for production
        // secure: false for development

        // storing refresh token in user's record
        existingUsersData.forEach((index, element, arr) => {
            if (element.username === userExists.username) {
                let updatedUserDetails = { ...userExists };
                updatedUserDetails["refreshToken"] = refreshToken;
                arr[index] = updatedUserDetails;
            }
        });

        await fs.writeFile(path.join(Root, "data", "users.json"), JSON.stringify(existingUsersData));

        return res.json({ msg: "Login successful", accessToken })
    }
    catch (err) {
        console.log("@authController : " + err.name + "\n" + err.message);
        return res.status(statusCodes.internalServerError).json({ msg: "Internal server error" })
    }
}

export default authHandler;