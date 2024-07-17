import express from 'express';
import { accessLevelHandler, grantAccessHandler, userAccessList, userAccessRole } from '../controllers/accessController.js';

const router = express.Router();

router.post("/", accessLevelHandler);
router.post("/grant", grantAccessHandler);
router.get("/list", userAccessList);
router.get("/role/:userId", userAccessRole)


export default router;