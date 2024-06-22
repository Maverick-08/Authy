import { Router } from "express";
import getAllPlayersData from "../../controllers/getUsers.js";

const router = Router();

router.route("/")
    .get(getAllPlayersData)

export default router;