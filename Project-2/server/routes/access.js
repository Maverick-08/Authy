import { Router } from "express";
import { grantAccess, requestAccess } from "../controllers/accessController.js";

const router = Router();

router.post("/", requestAccess);
router.post("/grant", grantAccess)

export default router;