import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { playerIdsAtom, updatePlayerAtom } from "../state/playerAtom";
import AlertBox from "../components/AlertBox";
import shortId from "short-unique-id";
import { addNewPlayer } from "../utils/data";
import { userAtom } from "../state/userAtom";

const uid = new shortId({ length: 10 });

const PlayerEditComponent = () => {
  const [updatePlayerData, setUpdatePlayerData] =
    useRecoilState(updatePlayerAtom);
  const setPlayerIds = useSetRecoilState(playerIdsAtom)
  const user = useRecoilValue(userAtom);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [position, setPosition] = useState("");
  const [team, setTeam] = useState("");
  const [ppg, setppg] = useState("");
  const [apg, setapg] = useState("");
  const [rpg, setrpg] = useState("");
  const [alert, setAlert] = useState({ show: false, success: false, msg: "" });

  useEffect(() => {
    if (updatePlayerData.id) {
      console.log(updatePlayerData);
      setName(updatePlayerData.name);
      setAge(updatePlayerData.age);
      setTeam(updatePlayerData.team);
      setPosition(updatePlayerData.position);
      setapg(updatePlayerData.apg);
      setppg(updatePlayerData.ppg);
      setrpg(updatePlayerData.rpg);
    }
  }, [updatePlayerData]);

  function cancelUpdate() {
    setUpdatePlayerData({});
    setName("");
    setAge("");
    setTeam("");
    setPosition("");
    setapg("");
    setppg("");
    setrpg("");
  }

  async function addPlayer() {
    if (
      name === "" ||
      age === "" ||
      position === "" ||
      team === "" ||
      apg === "" ||
      ppg === "" ||
      rpg === ""
    ) {
      setAlert({
        show: true,
        success: false,
        msg: "Empty fields are not allowed",
      });
    } else {
      // send request
      const newId = uid.rnd();
      const payload = {
        id: newId,
        name,
        team,
        age,
        position,
        ppg,
        rpg,
        apg,
      };
      const response = await addNewPlayer(user.accessToken, payload);

      if (response.status) {
        setAlert({
          show: true,
          success: true,
          msg: "New player added successfully",
        });
        setPlayerIds(prev => [...prev,newId])
        const existingPlayersData = JSON.parse(localStorage.getItem("playersInfo"))
        localStorage.setItem("playersInfo",JSON.stringify([...existingPlayersData,payload]))
      } else {
        setAlert({ show: true, success: false, msg: response.msg });
      }
    }
  }

  return (
    <div className="w-full h-[55vh] flex items-center flex-col pt-20">
      {alert.show && (
        <AlertBox
          success={alert.success}
          msg={alert.msg}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}
      <p className="text-4xl font-normal text-gray-400 mt-4">
        Edit Player Data
      </p>
      <div className="border-2 border-gray-200 pd-16 shadow-lg shadow-sky-200 my-8">
        <div className="flex flex-col items-center gap-8 my-8">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Enter Name"
              className="text-center py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Team"
              className="text-center"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Age"
              className="text-center"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <input
              type="text"
              placeholder="Position"
              className="text-center"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
            <input
              type="text"
              placeholder="PPG"
              className="text-center"
              value={ppg}
              onChange={(e) => setppg(e.target.value)}
            />
            <input
              type="text"
              placeholder="RPG"
              className="text-center"
              value={rpg}
              onChange={(e) => setrpg(e.target.value)}
            />
            <input
              type="text"
              placeholder="APG"
              className="text-center"
              value={apg}
              onChange={(e) => setapg(e.target.value)}
            />
          </div>
          {updatePlayerData.id ? (
            <div className="flex justify-center items-center gap-16 my-4">
              <CustomButton
                title={"Update Player"}
                textStyle={"text-white "}
                containerStyle={
                  "bg-[#6A43C7] px-4 py-2 rounded-md cursor-pointer "
                }
              />
              <CustomButton
                title={"Cancel Update"}
                textStyle={"text-white "}
                containerStyle={
                  "bg-[#6A43C7] px-4 py-2 rounded-md cursor-pointer "
                }
                handleClick={cancelUpdate}
              />
              <CustomButton
                title={"Delete Player"}
                textStyle={"text-white "}
                containerStyle={
                  "bg-[#6A43C7] px-4 py-2 rounded-md cursor-pointer "
                }
              />
            </div>
          ) : (
            <CustomButton
              title={"Add Player"}
              textStyle={"text-white "}
              containerStyle={
                "bg-[#6A43C7] px-4 py-2 rounded-md cursor-pointer "
              }
              handleClick={addPlayer}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerEditComponent;
