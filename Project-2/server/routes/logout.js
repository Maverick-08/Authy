import { Router } from "express";
import { logoutHandler } from "../controllers/logoutContoller.js";

const router = Router();

router.post("/", logoutHandler)

export default router;
