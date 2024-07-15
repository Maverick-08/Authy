import express from 'express';
import { accessLevelHandler, grantAccessHandler, userAccessList } from '../controllers/accessController.js';

const router = express.Router();

router.post("/", accessLevelHandler);
router.post("/grant", grantAccessHandler);
router.get("/list", userAccessList);


export default router;