import fs from 'fs/promises';
import path from 'path';
import Root from '../config/path.js';
import statusCodes from '../config/statusCode';

const refreshTokenHandler = async (req,res)=>{
    try{

    }
    catch(err){
        console.log("@refreshTokenHandler : "+err.name+"\n"+err.message);
        return res.status(statusCodes.forbidden).json({})
    }
}