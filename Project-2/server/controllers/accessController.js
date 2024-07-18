import Client from "../config/dbConn.js";
import responseCode from "../config/responseCode.js";
import { Notifications } from "./notificationController.js";

export const requestAccess = async (req, res) => {
    try {
        const { username, requestedRole } = req.body;

        // Check if user exists;
        const result = await Client.query('SELECT * FROM users WHERE username = $1', [username]);

        // If user does not exist
        if (result.rows.length === 0) {
            return res.status(responseCode.badRequest).json({ msg: "User does not exist" })
        }

        // If it exist
        await Client.query('UPDATE users SET requestingaccess = $1 WHERE username = $2', [requestedRole, username])

        const userNotification = new Notifications(username);
        await userNotification.push(`Request for ${requestedRole} access has been sent`);

        return res.sendStatus(responseCode.noContent);
    }
    catch (err) {
        console.log("@requestAccess : \n" + err);
        return res.status(responseCode.internalServerError);
    }
}

export const grantAccess = async (req, res) => {
    try {
        const { username, grantAccess } = req.body;

        // Check if user exists;
        const result = await Client.query('SELECT * FROM users WHERE username = $1', [username]);

        // If user does not exist
        if (result.rows.length === 0) {
            return res.status(responseCode.badRequest).json({ msg: "User does not exist" })
        }

        const userInfo = result.rows[0];

        if (grantAccess) {

            await Client.query('UPDATE users SET role = $1, requestingaccess = $2 WHERE username = $3', [userInfo.requestingaccess, null, username])

            const userNotification = new Notifications(username);
            await userNotification.push(`Request for ${userInfo.requestingaccess} access has been granted`);
        } else {
            await Client.query('UPDATE users SET requestingaccess = $1 WHERE username = $2', [null, username])

            const userNotification = new Notifications(username);
            await userNotification.push(`Request for ${userInfo.requestingaccess} access has been declined`);
        }

        return res.sendStatus(responseCode.noContent);
    }
    catch (err) {
        console.log("@grantAccess : \n" + err);
        return res.sendStatus(responseCode.internalServerError)
    }
}