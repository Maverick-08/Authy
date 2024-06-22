import { Router } from "express";
import getAllPlayersData from "../../controllers/getUsers";

const router = Router();

router.route("/")
    .get(getAllPlayersData)