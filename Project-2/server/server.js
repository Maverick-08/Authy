import express from 'express'
import Client from './config/dbConn.js';

const app = express();

app.get("/",async (req,res)=>{
   const result = await Client.query(`SELECT * FROM users`)
   res.json({res:result.rows})
})

app.listen(3000,()=>{console.log("Server is running at port 3000");})