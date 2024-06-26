import { Router } from "express";
import logoutHandler from "../controllers/logoutController.js";

const router = Router();

router.get("/",logoutHandler);

export default router;