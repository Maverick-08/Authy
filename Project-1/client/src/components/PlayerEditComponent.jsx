import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import {
  atomFamily,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import {
  highlightPlayerAtom,
  playerAtomFamily,
  playerIdsAtom,
  updatePlayerAtom,
} from "../state/playerAtom";
import AlertBox from "../components/AlertBox";
import shortId from "short-unique-id";
import { addNewPlayer, updatePlayerDetails } from "../utils/data";
import { userAtom } from "../state/userAtom";
import PlayerDetails from "./PlayerDetails";

const uid = new shortId({ length: 10 });

const PlayerEditComponent = () => {
  const [updatePlayerData, setUpdatePlayerData] =
    useRecoilState(updatePlayerAtom);
  const setPlayerIds = useSetRecoilState(playerIdsAtom);
  const setHighlightPlayer = useSetRecoilState(highlightPlayerAtom);
  let setSelectedAtom;
  if (updatePlayerData.id) {
    setSelectedAtom = useSetRecoilState(playerAtomFamily(updatePlayerData.id));
  }

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
    setHighlightPlayer("");
    setName("");
    setAge("");
    setTeam("");
    setPosition("");
    setapg("");
    setppg("");
    setrpg("");
  }

  async function addPlayer() {
    if (user.role === "User") {
      setAlert({
        show: true,
        success: false,
        msg: "You do not have editior access",
      });
      return;
    }
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
        setPlayerIds((prev) => [...prev, newId]);
        const existingPlayersData = JSON.parse(
          localStorage.getItem("playersInfo")
        );
        localStorage.setItem(
          "playersInfo",
          JSON.stringify([...existingPlayersData, payload])
        );
      } else {
        setAlert({ show: true, success: false, msg: response.msg });
      }
    }
  }
  async function updatePlayerInfo() {
    const prevValue = updatePlayerData;
    const updatedValue = {
      id: updatePlayerData.id,
      name,
      team,
      position,
      age: parseInt(age),
      ppg: parseFloat(ppg),
      apg: parseFloat(apg),
      rpg: parseFloat(rpg),
    };
    if (
      prevValue.name == updatedValue.name &&
      prevValue.position == updatedValue.position &&
      prevValue.team == updatedValue.team &&
      prevValue.age == updatedValue.age &&
      prevValue.ppg == updatedValue.ppg &&
      prevValue.apg == updatedValue.apg &&
      prevValue.rpg == updatedValue.rpg
    ) {
      setAlert({
        show: true,
        success: false,
        msg: "Change values for updation",
      });
    } else {
      const response = await updatePlayerDetails(
        user.accessToken,
        updatedValue
      );
      if (response.status) {
        setSelectedAtom({ ...updatedValue });
        setAlert({
          show: true,
          success: true,
          msg: "Player updated successfully",
        });
      } else {
        setAlert({ show: true, success: false, msg: response.msg });
      }
    }
  }
  return (
    <div className={`w-full h-[55vh] flex items-center flex-col pt-20`}>
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
      <div
        className={`border-2 border-gray-200 pd-16 shadow-lg shadow-sky-200 my-8 ${
          user.role === "User" ? "cursor-not-allowed" : ""
        }`}
      >
        <div className="flex flex-col items-center gap-8 my-8 px-2">
          <div className="flex gap-4">
            <PlayerDetails
              value={name}
              id={"name"}
              onTextChange={setName}
              title={"Player Name : "}
            />
            <PlayerDetails
              value={team}
              id={"team"}
              onTextChange={setTeam}
              title={"Team Name : "}
            />
            <PlayerDetails value={age} onTextChange={setAge} title={"Age : "} />
            <PlayerDetails
              value={position}
              id={"position"}
              onTextChange={setPosition}
              title={"Position : "}
            />
            <PlayerDetails
              value={ppg}
              id={"ppg"}
              onTextChange={setppg}
              title={"PPG : "}
            />
            <PlayerDetails
              value={rpg}
              id={"rpg"}
              onTextChange={setrpg}
              title={"RPG : "}
            />
            <PlayerDetails
              value={apg}
              id={"apg"}
              onTextChange={setapg}
              title={"APG : "}
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
                handleClick={updatePlayerInfo}
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
                `bg-[#6A43C7] px-4 py-2 rounded-md ${
                  user.role === "User" ? "cursor-not-allowed" : "cursor-pointer"
                }`
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
