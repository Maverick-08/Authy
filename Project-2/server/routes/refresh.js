import { Router } from "express";
import { refreshTokenHandler } from "../controllers/refreshTokenController.js";

const router = Router();

router.get("/", refreshTokenHandler)

export default router;