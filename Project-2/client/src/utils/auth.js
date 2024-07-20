import axios from 'axios';

export const handleLogin = async (username, password) => {
    const payload = { username, password }
    const response = await axios.post("http://localhost:3000/auth", payload,{
        withCredentials: true
    })
    return response.data;
}

export const handleLogout = async (payload, accessToken) => {
    const response = await axios.post("http://localhost:3000/logout",payload,{
        headers:{
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': `application/json`
        },
        withCredentials: true
    })

    return;
}

export const loggedIn = async(username) => {
    const response = await axios.get(`http://localhost:3000/active/${username}`)

    return response.data;
}

export const newAccessToken = async () => {
    const response = await axios.get("http://localhost:3000/refresh",{
        withCredentials: true,
    })

    return response.data;
}

export const requestAccess = async (accessToken, payload) => {
    const response = await axios.post("http://localhost:3000/access",payload,{
        headers:{
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': `application/json`
        }
    })

    return ;
}