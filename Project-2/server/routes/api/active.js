import { Router } from "express";
import { activeHandler } from "../../controllers/activeController.js";

const router = Router();

router.get("/:username", activeHandler)

export default router;