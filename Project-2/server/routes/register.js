import { Router } from "express";
import {registrationHandler} from '../controllers/registrationController.js'

const router = Router();

router.post("/",registrationHandler)

export default router;