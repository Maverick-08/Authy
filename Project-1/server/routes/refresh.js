import { Router } from "express";
import { refreshTokenHandler } from "../controllers/refreshTokenController.js";

const router = Router();

router.post("/", refreshTokenHandler);

export default router;