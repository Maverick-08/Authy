import express from 'express';
import { accessLevelHandler, grantAccessHandler } from '../controllers/accessController.js';

const router = express.Router();

router.post("/",accessLevelHandler)
router.post("/grant",grantAccessHandler)


export default router;