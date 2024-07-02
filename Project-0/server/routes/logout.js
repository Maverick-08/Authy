import { Router } from "express";
import { logoutHandler } from "../controllers/logoutContoller.js";

const router = Router();

router.get("/",logoutHandler);

export default router;