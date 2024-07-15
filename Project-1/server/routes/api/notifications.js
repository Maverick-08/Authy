import { Router } from 'express'
import { Notifications } from '../../models/notifications.js';
import statusCodes from '../../config/statusCodes.js';

const router = Router();

const fetchNotifications = async (req, res) => {
    try {
        const userId = req.params.id;

        const userNotifications = await Notifications.findOne({ id: userId })

        if (!userNotifications) {
            return res.sendStatus(statusCodes.noContent);
        }
        else {
            return res.json({ notifications: userNotifications.notifications })
        }
    }
    catch (err) {
        console.log("@fetchNotifications : \n" + err);
        return res.sendStatus(statusCodes.internalServerError);
    }
}

router.get("/:id",fetchNotifications);

export default router;