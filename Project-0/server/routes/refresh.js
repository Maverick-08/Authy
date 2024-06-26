import { Router } from "express";
import refreshTokenHandler from "../controllers/refreshToken.js";

const router = Router();

router.get("/",refreshTokenHandler)

export default router;