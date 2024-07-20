import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilStateLoadable, useRecoilValue, useSetRecoilState } from "recoil";
import Card from "../components/Card";
import MessageBox from "../components/MessageBox";
import { alertAtom } from "../state/notification";
import { playerIdsAtom, updatePlayerAtom } from "../state/playerState";
import { useData } from "../Hooks/useData";

const PlayerEditComponent = ({ user }) => {
  const player = useRecoilValue(updatePlayerAtom);
  const setPlayer = useSetRecoilState(updatePlayerAtom);
  const { addPlayerData, updatePlayerData, deletePlayerData } = useData();
  const [playerIds, setPlayerIds] = useRecoilStateLoadable(playerIdsAtom)
  const [alert, setAlert] = useRecoilState(alertAtom);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [position, setPosition] = useState("");
  const [team, setTeam] = useState("");
  const [ppg, setppg] = useState("");
  const [apg, setapg] = useState("");
  const [rpg, setrpg] = useState("");


  useEffect(() => {
    setName(player.name);
    setTeam(player.team);
    setAge(player.age ?? "");
    setPosition(player.position ?? "");
    setppg(player.ppg ?? "");
    setapg(player.apg ?? "");
    setrpg(player.rpg ?? "");
  }, [player]);

  const AddPlayer = async () => {
    if (user.role === "User") {
      setAlert({
        show: true,
        success: false,
        msg: "You do not have Editor level access",
      });
    } 
    else {
      const payload = {name, team, age, position, ppg, apg, rpg};
      const response = await addPlayerData(payload);

      if (response.status) {
        setAlert({
          show: true,
          success: true,
          msg: "Player added successfully!",
        });
      } else {
        setAlert({
          show: true,
          success: false,
          msg: response.msg,
        });
      }
    }
  };

  const DeletePlayer = async () => {
    const response = await deletePlayerData(player.name)
    
    if(response.status){
      setAlert({
        show: true,
        success: true,
        msg: "Player deleted successfully",
      });

      if(playerIds.state === 'hasValue'){
        const updatedIds = playerIds.contents.filter(Id => Id !== player.id)
        setPlayerIds(updatedIds)
      }
      
    }
    else{
      setAlert({
        show: true,
        success: false,
        msg: response.msg,
      });
    }
  }

  const UpdatePlayer = async () => {
    const payload = {name, team, age, position, ppg, apg, rpg};
    const response = await updatePlayerData(payload);

    if(response.status){
      setAlert({
        show: true,
        success: true,
        msg: "Player updated successfully !",
      });

      if(playerIds.state === "hasValue"){
        let updatedIds = playerIds.contents.filter(Id => Id !== player.id);
        setPlayerIds(updatedIds)
      }
    }
    else{
      setAlert({
        show: true,
        success: false,
        msg: response.msg,
      });
    }
  }

  const CancelUpdate = () => {
    setPlayer({
      id: "",
      name: "",
      age: "",
      team: "",
      position: "",
      apg: "",
      ppg: "",
      rpg: "",
    });
  };

  return (
    <div className="w-full pt-32 pb-16 flex justify-center items-center flex-col gap-8">
      {alert.show && (
        <MessageBox
          success={alert.success}
          msg={alert.msg}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}
      <p className="text-4xl font-normal text-gray-400">Edit Player Data </p>
      <Card
        containerStyle={`flex flex-col gap-8 items-center px-8 py-8 rounded-lg shadow-lg shadow-sky-400 ${
          user.role === "User" ? "cursor-not-allowed" : ""
        }`}
      >
        <div className="flex gap-8">
          <div className="flex items-center flex-col gap-2 text-xl text-gray-400">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={name}
              id="name"
              className="outline-none text-center border-2 border-gray-400 rounded-md w-44 text-black px-2 py-1"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex items-center flex-col gap-2 text-xl text-gray-400">
            <label htmlFor="team">Team</label>
            <input
              type="text"
              value={team}
              id="team"
              className="outline-none text-center border-2 border-gray-400 rounded-md w-44 text-black px-2 py-1"
              onChange={(e) => setTeam(e.target.value)}
            />
          </div>

          <div className="flex items-center flex-col gap-2 text-xl text-gray-400">
            <label htmlFor="position">Position</label>
            <input
              type="text"
              value={position}
              id="position"
              className="outline-none text-center border-2 border-gray-400 rounded-md w-44 text-black px-2 py-1"
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>

          <div className="flex items-center flex-col gap-2 text-xl text-gray-400">
            <label htmlFor="age">Age</label>
            <input
              type="text"
              value={age}
              id="age"
              className="outline-none text-center text-black px-2 py-1 border-2 border-gray-400 rounded-md w-24"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div className="flex items-center flex-col gap-2 text-xl text-gray-400">
            <label htmlFor="ppg">PPG</label>
            <input
              type="text"
              value={ppg}
              id="ppg"
              className="outline-none text-center text-black px-2 py-1 border-2 border-gray-400 rounded-md w-24"
              onChange={(e) => setppg(e.target.value)}
            />
          </div>

          <div className="flex items-center flex-col gap-2 text-xl text-gray-400">
            <label htmlFor="rpg">RPG</label>
            <input
              type="text"
              value={rpg}
              id="rpg"
              className="outline-none text-center text-black px-2 py-1 border-2 border-gray-400 rounded-md w-24"
              onChange={(e) => setrpg(e.target.value)}
            />
          </div>

          <div className="flex items-center flex-col gap-2 text-xl text-gray-400">
            <label htmlFor="apg">APG</label>
            <input
              type="text"
              value={apg}
              id="apg"
              className="outline-none text-center text-black px-2 py-1 border-2 border-gray-400 rounded-md w-24"
              onChange={(e) => setapg(e.target.value)}
            />
          </div>
        </div>
        <div>
          {player.id === "" ? (
            <div
              onClick={AddPlayer}
              className="bg-[#6A43C7] px-4 py-2 rounded-md cursor-pointer "
            >
              <p className="text-xl text-white">Add Player</p>
            </div>
          ) : (
            <div className="flex gap-8">
              <div
                onClick={CancelUpdate}
                className="bg-[#6A43C7] px-4 py-2 rounded-md cursor-pointer "
              >
                <p className="text-xl text-white">Cancel</p>
              </div>
              <div onClick={UpdatePlayer} className="bg-[#6A43C7] px-4 py-2 rounded-md cursor-pointer ">
                <p className="text-xl text-white">Update</p>
              </div>
              <div onClick={DeletePlayer} className="bg-[#6A43C7] px-4 py-2 rounded-md cursor-pointer ">
                <p className="text-xl text-white">Delete</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PlayerEditComponent;
