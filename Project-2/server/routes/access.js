import { Router } from "express";
import { accessList, grantAccess, requestAccess } from "../controllers/accessController.js";

const router = Router();

router.post("/", requestAccess);
router.post("/grant", grantAccess)
router.get("/", accessList)

export default router;