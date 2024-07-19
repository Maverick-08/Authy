import axios from 'axios';

export const handleLogin = async (username, password) => {
    const payload = { username, password }
    const response = await axios.post("http://localhost:3000/auth", payload,{
        withCredentials: true
    })
    return response.data;
}