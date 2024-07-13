import express from 'express';
import { accessLevelHandler, grantAccessHandler } from '../controllers/accessController.js';

const router = express.Router();

router.get("/", accessLevelHandler)
router.get("/grant", grantAccessHandler)

export default router;