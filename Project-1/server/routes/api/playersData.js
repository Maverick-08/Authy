import { Router } from "express";
import { getAllPlayersData, getPlayerData } from "../../controllers/playersController.js";

const router = Router();

router.route("/")
    .get("/", getAllPlayersData)
    .get("/*", getPlayerData)


    export default router;