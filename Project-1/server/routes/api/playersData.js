import { Router } from "express";
import { addPlayer, getAllPlayersData, getPlayerData, updatePlayer } from "../../controllers/playersController.js";

const router = Router();

router.get("/:_id", getPlayerData)

router.route("/")
    .get(getAllPlayersData)
    .post(addPlayer)
    .put(updatePlayer)



export default router;