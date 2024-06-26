import { Router } from "express";
import { refreshTokenHandler } from "../middlewares/refreshToken.js";

const router = Router();

router.get("/", refreshTokenHandler);

export default router;