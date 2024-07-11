import axios from "axios";
import { jwtDecode } from 'jwt-decode'

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
    const payload = { username, password };

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