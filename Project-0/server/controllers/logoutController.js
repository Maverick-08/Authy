import fs from 'fs/promises';
import path from 'path';
import Root from '../config/path.js';
import statusCodes from '../config/statusCode.js';

const logoutHandler = async (req,res) => {
    const cookie = req.cookies;
    // console.log(cookie);
    // {
    //     jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJ1c2VybmFtZSI6IlZpdmVrIn0sImlhdCI6MTcxOTEwMzk1MSwiZXhwIjoxNzE5MTkwMzUxfQ.5wNg7bPMaWeGTWxNsJBlJJQOv2BPSfoE0FB8gWUxBEM'
    // }

    if(!cookie || !cookie.jwt){
        return res.status(statusCodes.badRequest).json({msg:"Rfresh token is missing"})
    }

    const refreshToken = cookie.jwt;

    const existingUsers = JSON.parse(await fs.readFile(path.join(Root,"data","users.json"),'utf-8'));

    const findUser = existingUsers.find(user => user.refreshToken === refreshToken);

    if(!findUser){
        res.clearCookie('jwt',{httpOnlt:true,secure:false,sameSite:'None',maxAge:24*60*60*1000});
        res.sendStatus(statusCodes.noContent);
    }

    const otherUsersData = existingUsers.filter(user => user.username !== findUser.username);

    delete findUser["refreshToken"];

    otherUsersData.push(findUser);

    await fs.writeFile(path.join(Root,"data","data.json"),JSON.stringify(otherUsersData));

    res.clearCookie('jwt',{httpOnlt:true,secure:false,sameSite:'None',maxAge:24*60*60*1000});

    res.sendStatus(statusCodes.noContent);
}

export default logoutHandler;