import { Router } from "express";

const router = Router();

router.route("/")
    .get("/",(req,res)=> res.json({msg:"Register route"}))
    .post("/")


export default router;