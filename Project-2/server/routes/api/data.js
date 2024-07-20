import { Router } from "express";
import { addNewPlayer, deletePlayerData, getPlayersData, updatePlayerData } from "../../controllers/dataController.js";

const router = Router();

router.get("/", getPlayersData) // For accessing data
router.post("/", addNewPlayer) // For adding new data
router.put("/", updatePlayerData)  // For updating new data
router.delete("/:player", deletePlayerData) // For deleting data

export default router;