import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId({length:10})

export const handleLogin = async (username, password) => {
    const response = await axios.post("http://localhost:3000/auth",
        { username, password },
        { withCredentials: true }
    );

    return response.data;
}

export const handleLogout = async (accessToken) => {

    await axios.get("http://localhost:3000/logout",{
        headers:{
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': `application/json`
        },
        withCredentials: true
    });

    return ;
}

export const registerNewUser = async (username, password) => {
    const payload = { username, password, id: uid.rnd()};

    const response = await axios.post("http://localhost:3000/register", payload);

    return response.data;
}

export const getNewAccessToken = async () => {

    const response = await axios.get("http://localhost:3000/refresh",{
        withCredentials: true
    })

    return response.data; // {newAccessToken: "Token"}
}

export const isTokenValid = (token) => {
    const decodedToken = jwtDecode(token);
    return decodedToken.exp > (Date.now() / 1000);
}

export const upgradeAccess = async (accessToken, userId, requestingAccess) => {
    try{
        const payload = {userId, requestingAccess};

        await axios.post("http://localhost:3000/access",payload,{
            headers:{
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })

        return {status:true}
    }
    catch(err){
        console.log("@upgradeAccess : \n"+err);

        const errMsg = err.response.data.msg;
        return {status:false, msg:errMsg};
    }
}

export const grantAccess = async (accessToken, userId, grantRole, requestStatus) => {
    try{
        const payload = {userId,grantRole, requestStatus};

        await axios.post("http://localhost:3000/access/grant",payload,{
            headers:{
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })

        return true;
    }
    catch(err){
        console.log("@grantAccess : \n"+err);
        return false;
    }
}