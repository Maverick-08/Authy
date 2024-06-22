import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

const app = express();

config();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("working")
})

app.listen(process.env.PORT,()=>{console.log("Server is running at port 3000");})