import axios from "axios"

export const fetchData = async (accessToken) => {
    const response = await axios.get("http://localhost:3000/data", {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': `application/json`,
        }
    })

    return response.data; // {data: []}
}

export const addData = async (accessToken, payload) => {
    const response = await axios.post("http://localhost:3000/data", payload,
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': `application/json`,
            }
        })
    return ;
}

export const updateData = async (accessToken, payload) => {
    const response = await axios.put("http://localhost:3000/data", payload,
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': `application/json`,
            }
        })
    return;
}

export const deleteData = async (accessToken, player) => {

    const response = await axios.delete(`http://localhost:3000/data/${player}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });
    return;
}

