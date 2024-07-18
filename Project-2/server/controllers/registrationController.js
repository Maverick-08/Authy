import responseCode from "../config/responseCode.js";
import bcrypt from 'bcrypt';
import Client from "../config/dbConn.js";
import { validateFullName, validateUsername, validatePassword } from "../validations/newUserValidations.js"
import { Notifications } from "./notificationController.js";

export const registrationHandler = async (req, res) => {
    const payload = req.body;

    // Check whether you have all the required data
    if (!payload.username || !payload.fullName || !payload.password) {
        return res.status(responseCode.badRequest).json({ msg: "Empty fields are not allowed" })
    }

    try {
        // Schema check for username, fullName and password 
        let response;
        const isUsernameValid = validateUsername(payload.username);
        const isFullnameValid = validateFullName(payload.fullName);
        const isPasswordValid = validatePassword(payload.password);

        if (!isPasswordValid.status) {
            response = isPasswordValid.msg;
        }

        if (!isFullnameValid.status) {
            response = isFullnameValid.msg;
        }

        if (!isUsernameValid.status) {
            response = isUsernameValid.msg;
        }

        // If above schema checks fails send a bad request
        if (response) {
            return res.status(responseCode.badRequest).json({ msg: response })
        }

        // Now that we all the data in proper format
        // Check if username exists
        const result = await Client.query('SELECT username FROM users WHERE username = $1', [payload.username]);

        if (result.rows.length > 0) {
            // Username already exists
            return res.status(responseCode.badRequest).json({ msg: "Username is not available" })
        }
        else {
            // Username is unique : create new user
            const hashedPassword = await bcrypt.hash(payload.password, 10);

            await Client.query('INSERT INTO users(username, fullName, password) VALUES($1, $2, $3)', [payload.username, payload.fullName, hashedPassword])
        }

        const newUser = new Notifications(payload.username);
        await newUser.push("Welcome to Authy !")

        return res.sendStatus(responseCode.resourceCreated);
    }
    catch (err) {
        console.log("@registrationController : \n" + err);
        return res.sendStatus(responseCode.internalServerError)
    }
}
