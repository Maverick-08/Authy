import axios from "axios"

export const fetchData = async (accessToken) => {
    const response = await axios.get("http://localhost:3000/data",{
        headers:{
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': `application/json`,
        }
    })
    
    return response.data; // {data: []}
}