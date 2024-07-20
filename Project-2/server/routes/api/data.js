import { Router } from "express";
import { addNewPlayer, deletePlayerData, getPlayersData, updateHistory, updatePlayerData } from "../../controllers/dataController.js";

const router = Router();

router.get("/", getPlayersData) // For accessing data
router.post("/", addNewPlayer) // For adding new data
router.put("/", updatePlayerData)  // For updating new data
router.delete("/:player", deletePlayerData) // For deleting data
router.get("/history", updateHistory)

export default router;