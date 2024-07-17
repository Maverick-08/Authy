import { Router } from "express";
import {authHandler} from "../controllers/authController.js"

const router = Router();

router.post("/", authHandler)

export default router;