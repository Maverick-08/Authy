import fs from 'fs/promises';
import path from 'path';
import Root from '../config/path.js';
import jwt from 'jsonwebtoken';
import statusCodes from '../config/statusCode.js';

const refreshTokenHandler = async (req, res) => {
    const cookies = req.cookies;
    // console.log(cookies);
    // {
    //     jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJ1c2VybmFtZSI6IlZpdmVrIn0sImlhdCI6MTcxOTA2MjYyNSwiZXhwIjoxNzE5MTQ5MDI1fQ.8O0ZmDl0_KziHXaZwEpYfih_hkmygs0U6vHOeHspCZw'
    // }

    if (!cookies || !cookies.jwt) {
        return res.status(statusCodes.unauthorised).json({ msg: "Refresh token is missing" });
    }

    const refreshToken = cookies.jwt;

    try {
        const existingUsersData = JSON.parse(await fs.readFile(path.join(Root, "data", "users.json"), 'utf-8'));

        const userExists = existingUsersData.find(user => user.refreshToken === refreshToken);

        if (!userExists) {
            return res.sendStatus(statusCodes.forbidden);
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
            if (err || decoded.userData.username !== userExists.username) {
                return res.sendStatus(statusCodes.forbidden);
            }

            const accessToken = jwt.sign({
                userData: {
                    username: userExists.username,
                    role: userExists.role
                }
            }, process.env.ACCESS_TOKEN, { expiresIn: "5m" });

            return res.json({ accessToken });
        });
    } catch (err) {
        console.log("@refreshTokenHandler:", err.name, err.message);
        return res.status(statusCodes.internalServerError).json({ msg: "Internal server error" });
    }
}

export default refreshTokenHandler;
