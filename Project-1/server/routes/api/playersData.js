import { Router } from "express";
import { getAllPlayersData } from "../../controllers/playersController.js";

const router = Router();

router.route("/")
    .get("/", getAllPlayersData)
    .post("/")


    export default router;