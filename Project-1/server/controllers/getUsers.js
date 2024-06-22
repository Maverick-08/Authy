import fs from 'fs/promises';
import path from 'path';
import Root from '../config/path.js';
import statusCodes from '../config/statusCode';

const getAllPlayersData = async (req,res) => {
    try{
        const playersData = JSON.parse(await fs.readFile(path.join(Root,"data","data.json"),'utf-8'));

        return res.status(statusCodes.successful).json({data:playersData});
    }
    catch(err){
        console.log("@getUser : " + err.name + "\n" + err.message);
        return res.status(statusCodes.internalServerError).json({ msg: "Internal server error" })
    }

}

export default getAllPlayersData;