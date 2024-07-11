import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  playerAtomFamily,
  playerIdsAtom,
  updatePlayerAtom,
} from "../state/playerAtom";
import AlertBox from "../components/AlertBox";
import { getData, playerInfo } from "../utils/data";
import { userAtom } from "../state/userAtom";

const PlayerStatsComponent = () => {
  const user = useRecoilValue(userAtom);
  const [playerIds, setPlayerIds] = useRecoilState(playerIdsAtom);
  const [highlightPlayer, setHighlightPlayer] = useState("");
  const [alert, setAlert] = useState({ show: false, success: false, msg: "" });

  useEffect(() => {
    const fetch = async () => {
      const response = await getData(user.accessToken);
      if (response.status) {
        setPlayerIds(response.playerIds);
      } else {
        setAlert({ show: true, success: false, msg: "Failed to fetch data" });
      }
    };

    fetch();
  }, []);

  return (
    <div className="flex flex-col items-center mt-4">
      {alert.show && (
        <AlertBox
          success={alert.success}
          msg={alert.msg}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}
      <p className="text-4xl font-normal text-gray-400">Players Statistics</p>
      <div className="my-8 border-2 border-gray-200 bg-white shadow-xl shadow-sky-100 p-8">
        <table className="table-auto border-2 border-gray-400 rounded-xl w-[80vw] h-[60vh] text-center">
          <thead className="border-2 border-gray-400">
            <tr>
              <th className="text-3xl font-normal py-2 border-2 border-gray-400">
                Name
              </th>
              <th className="text-3xl font-normal py-2 border-2 border-gray-400">
                Team
              </th>
              <th className="text-3xl font-normal py-2 px-2 border-2 border-gray-400">
                Age
              </th>
              <th className="text-3xl font-normal py-2 border-2 border-gray-400">
                Position
              </th>
              <th className="text-3xl font-normal py-2 px-2 border-2 border-gray-400">
                PPG
              </th>
              <th className="text-3xl font-normal py-2 px-2 border-2 border-gray-400">
                RPG
              </th>
              <th className="text-3xl font-normal py-2 px-2 border-2 border-gray-400">
                APG
              </th>
            </tr>
          </thead>
          <tbody>
            {playerIds.map((Id) => (
              <Details
                playerId={Id}
                key={Id}
                highlightPlayer={highlightPlayer}
                setHighlightPlayer={setHighlightPlayer}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Details = ({ playerId, highlightPlayer, setHighlightPlayer }) => {
  const player = useRecoilValue(playerAtomFamily(playerId));
  const setUpdatePlayer = useSetRecoilState(updatePlayerAtom);
  const [clickCount, setClickCount] = useState(0);

  const updateClickCount = () => {
    if (clickCount < 2) {
      setClickCount(clickCount + 1);
    } else {
      setClickCount(0);
      setUpdatePlayer((prevPlayer) => {
        if (prevPlayer.id === playerId) {
          return {};
        }
        return playerInfo(playerId);
      });
      setHighlightPlayer((prevId) => (prevId === playerId ? "" : playerId));
    }
  };

  return (
    <tr
      onClick={updateClickCount}
      className={`${
        highlightPlayer === playerId ? "bg-sky-100" : "hover:bg-sky-50"
      } cursor-pointer`}
    >
      <td className="text-xl font-normal border-r-2 border-b-2 border-gray-400">
        {player.name}
      </td>
      <td className="text-xl font-normal border-r-2 border-b-2 border-gray-400">
        {player.team}
      </td>
      <td className="text-xl font-normal border-r-2 border-b-2 border-gray-400">
        {player.age}
      </td>
      <td className="text-xl font-normal border-r-2 border-b-2 border-gray-400">
        {player.position}
      </td>
      <td className="text-xl font-normal border-r-2 border-b-2 border-gray-400">
        {player.ppg}
      </td>
      <td className="text-xl font-normal border-r-2 border-b-2 border-gray-400">
        {player.rpg}
      </td>
      <td className="text-xl font-normal border-r-2 border-b-2 border-gray-400">
        {player.apg}
      </td>
    </tr>
  );
};

export default PlayerStatsComponent;
