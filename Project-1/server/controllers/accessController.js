import statusCodes from "../config/statusCodes.js";
import { Users } from "../models/newUser.js";
import { Notifications } from "../models/notifications.js";


export const accessLevelHandler = async (req, res) => {
    try {
        const payload = req.body; // {userId:"",requestingAccess:"Editor/Admin"};
        const user = await Users.findOne({ id: payload.userId })

        if (!user) {
            return res.status(statusCodes.badRequest).json({ msg: "Invalid user id" })
        }

        await Users.updateOne({ id: payload.userId }, { requestingAccess: payload.requestingAccess })

        const userNotification = await Notifications.findOne({ id: payload.userId })

        if (!userNotification) {
            await Notifications.create({ id: payload.userId, notifications: [`Request for ${payload.requestingAccess} access has been sent`] })
        }
        else {
            if (userNotification.notifications.length >= 5) {
                let existingNotifications = userNotification.notifications;
                existingNotifications.pop();
                existingNotifications.unshift(`Request for ${payload.requestingAccess} access has been sent`)

                await Notifications.updateOne({ id: payload.userId, notifications: existingNotifications })
            }
            else {
                let existingNotifications = userNotification.notifications;
                existingNotifications.unshift(`Request for ${payload.requestingAccess} access has been sent`)
                await Notifications.updateOne({ id: payload.userId, notifications: existingNotifications })
            }
        }

        const adminNotifications = await Notifications.findOne({ id: "2XNYDwq19L" })

        if (!adminNotifications) {
            await Notifications.create({ id: "2XNYDwq19L", notifications: [`${user.username} has requested ${payload.requestingAccess} access`] })
        }
        else {
            let newNotifications = adminNotifications.notifications
            newNotifications.push(`${user.username} has requested ${payload.requestingAccess} access`)
            
            await Notifications.updateOne({ id: "2XNYDwq19L" }, { notifications: newNotifications })
        }

        return res.sendStatus(statusCodes.noContent);
    }
    catch (err) {
        console.log("@accessLevelhandler : \n" + err);
        return res.status(statusCodes.internalServerError)
    }

}

export const grantAccessHandler = async (req, res) => {
    try {
        const payload = req.body; // {userId: "",requestStatus: true/false,grantRole: ""}
        
        const user = Users.findOne({ id: payload.userId });

        if (!user) {
            return res.status(statusCodes.badRequest).json({ msg: "Invalid user id" })
        }

        if (payload.requestStatus) {
            await Users.updateOne({ id: payload.userId }, { role: payload.grantRole, requestingAccess: null })

            let existingNotifications = (await Notifications.findOne({ id: payload.userId })).notifications;

            existingNotifications.unshift(`${payload.grantRole} access has been granted`)

            await Notifications.updateOne({ id: payload.userId }, { notifications: existingNotifications })
        }
        else {
            await Users.updateOne({ id: payload.userId }, { requestingAccess: null })

            let existingNotifications = (await Notifications.findOne({ id: payload.userId })).notifications;

            existingNotifications.unshift(`Request for ${payload.grantRole} access has been declined`)

            await Notifications.updateOne({ id: payload.userId }, { notifications: existingNotifications })
        }

        return res.sendStatus(statusCodes.noContent)
    }
    catch (err) {
        console.log("@grantAccessHandler : \n" + err);
        return res.status(statusCodes.internalServerError).json({ msg: err.name })
    }
}

export const userAccessList = async (req, res) => {
    try {
        const usersList = await Users.find({ requestingAccess: { $ne: null } });

        return res.json({ users: usersList })
    }
    catch (err) {
        console.log("@userAccessList : \n" + err);
        return res.status(statusCodes.internalServerError)
    }
}

export const userAccessRole = async (req,res) => {
    try{
        const {userId} = req.params;

        if(!userId){
            return res.status(statusCodes.badRequest).json({msg: "User id is missing"})
        }

        const userInfo = await Users.findOne({id: userId});

        if(!userInfo){
            return res.status(statusCodes.badRequest).json({msg: "User does not exist"})
        }

        return res.json({role: userInfo.role});
    }
    catch(err){
        console.log("@userAccessRole : \n"+err);
        return res.status(statusCodes.internalServerError);
    }
}