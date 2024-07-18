import { Router } from "express";
import { fetchNotifications } from "../../controllers/notificationController.js";

const router = Router();

router.get("/:username", fetchNotifications)


export default router;