import { Router } from "express";
import registrationHandler from "../controllers/registrationController.js";

const router = Router();

router.route("/")
    .post(registrationHandler)


export default router;