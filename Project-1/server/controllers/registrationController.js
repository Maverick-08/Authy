import bcrypt from 'bcrypt';
import fs from 'fs/promises';
import path from 'path';
import Root from '../config/path.js';
import statusCodes from '../config/statusCode.js';
import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import { validatePassword, validateUsername } from '../validations/registrationSchemas.js';

const registrationHandler = async (req, res) => {
    try {
        const payload = req.body;

        // During registration we will be receiving username, password and a confirm password. If any of the field is missing send a bad request
        if (!payload || !payload.username || !payload.password || !payload.confirmPassword) {
            return res.status(statusCodes.badRequest).json({ msg: "Missing username or password" })
        }

        // check whether the username and password are in correct format
        const isUsernameValid = validateUsername(payload.username);
        const isPasswordValid = validatePassword(payload.password);

        if (!isUsernameValid.status || !isPasswordValid.status) {
            let response = {};
            if (isUsernameValid.msg) {
                response.usernameGuidelines = isUsernameValid.msg;
            }
            if (isPasswordValid.msg) {
                response.passwordGuidelines = isPasswordValid.msg;
            }

            return res.status(statusCodes.badRequest).json({ guidelines: response })
        }

        // If we have received all the data in a correct format check whether the username is present in our database or not.

        const existingUsersData = JSON.parse(await fs.readFile(path.join(Root, "data", "data.json"), 'utf-8'))

        const doesUserExists = existingUsersData.find(user => user.username === payload.username)

        // If a username is already present - ask to send a new username
        if (doesUserExists) {
            return res.status(statusCodes.acceptedButNotProcessed).json({ msg: "This username is taken !" })
        }

        // If username does not exist - it's a new user which has to be added in the database

        // Before adding in the database hash the password for extra security
        // hash(password, saltRounds)
        const hashedPassword = await bcrypt.hash(payload.confirmPassword, 10);

        // create new user object
        // uuid() returns a unique string everytime it is called
        // format() from 'date-fns' let's us play with date time objects
        const newUser = {
            id: uuid(),
            username: payload.username,
            password: payload.password,
            createdAt: format(new Date(), "dd/MM/yyy HH:mm:ss")
        }

        // create a new users data which contains existing users data and the new user data
        const newUsersData = [...existingUsersData, newUser]

        // add the data into the database
        await fs.writeFile(path.join(Root, "data", "data.json"), JSON.stringify(newUsersData));

        res.status(statusCodes.resourceCreated).json({ msg: "New user created !" })
    }
    catch (err) {
        console.log("@RegistrationContoller : " + err.name + "\n" + err.message);
        res.status(statusCodes.internalServerError).json({ msg: "Internal server error" })
    }
}

export default registrationHandler;