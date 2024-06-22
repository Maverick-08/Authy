import { Router } from "express";

const router = Router();

router.route("/")
    .post(registrationHandler)


export default router;