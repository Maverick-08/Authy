import { Router } from "express";
import { registrationHandler } from "../controllers/registrationController";

const router = Router();

router.route("/")
    .get("/",(req,res)=> res.json({msg:"Register route"}))
    .post("/",registrationHandler)


export default router;