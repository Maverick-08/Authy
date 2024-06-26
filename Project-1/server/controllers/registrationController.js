import bcrypt from 'bcrypt';
import { validatePassword, validateUsername } from '../validations/userValidations.js'
import statusCodes from '../config/statusCodes.js';
import { Users } from '../models/newUser.js'

export const registrationHandler = async (req, res) => {
    try {
        const payload = req.body;

        if (!payload.username || !payload.password) {
            return res.status(statusCodes.badRequest).json({ msg: "Please fill all the fields" });
        }

        // check schema of payload;
        // {status: true/false, msg:""}
        const isValidUsername = validateUsername(payload.username);
        const isValisPassword = validatePassword(payload.password);

        if (!isValidUsername.status || !isValisPassword.status) {
            return res.status(statusCodes.badRequest).json(
                {
                    usernameGuidelines: isValidUsername.msg ?? null,
                    passwordGuidelines: isValisPassword.msg ?? null
                })
        }

        // check if the current username already exists in our db
        const userExists = await Users.findOne({ username: payload.username })

        if (userExists) {
            return res.status(statusCodes.badRequest).json({ msg: "Username already exists" })
        }

        // create a new user
        const hashedPassword = await bcrypt.hash(payload.password, 10);

        const newUser = await Users.create({
            username: payload.username,
            password: hashedPassword
        })

        res.json({
            id: newUser.id,
            username: newUser.username,
            role: newUser.role,
            msg: "User created successfully"
        });
    }
    catch (err) {
        console.log("@registrationController : " + err.name + "\n" + err.message);
        res.status(statusCodes.internalServerError).json({ msg: "Internal server error." })
    }
}