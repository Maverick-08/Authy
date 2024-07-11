import axios from "axios";

export const getData = async (accessToken) => {
  try {

    let playersData = JSON.parse(localStorage.getItem("playersInfo"))

    if (!playersData) {
      const response = (await axios.get("http://localhost:3000/data", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true
      })).data;

      playersData = response.data
      localStorage.setItem("playersInfo", JSON.stringify(playersData))
    }

    const playerIds = playersData.map(player => player.id);

    return { status: true, playerIds };
  }
  catch (err) {
    console.log("@getData : \n" + err);
    return { status: false };
  }
}

export const playerInfo = (Id) => {
  const playersData = JSON.parse(localStorage.getItem("playersInfo"));

  return playersData.find(player => Id === player.id)
}

export const addNewPlayer = async (accessToken,payload) => {
  try {

    const response = await axios.post("http://localhost:3000/data",payload,{
      headers:{
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })

    return {status:true}

  } catch (err) {
    console.log("@addNewPlayer : \n" + err);

    const errMsg = err.response.data.msg
    return { status: false, msg: errMsg };
  }
}