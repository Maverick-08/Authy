import { Router } from "express";
import authHandler from "../controllers/authController.js";

const router = Router();

router.route("/")
    .post(authHandler)


export default router;