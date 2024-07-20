import React, { Suspense, useEffect, useState } from "react";
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import {
  playerIdsAtom,
  playersAtomFamily,
  updatePlayerAtom,
} from "../state/playerState";
import Card from "../components/Card";

const PlayerInfoComponent = ({ user }) => {
  const playerIds = useRecoilValueLoadable(playerIdsAtom);
  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <p className="text-4xl font-normal text-gray-400">Players Statistics</p>
      <div className="pb-16">
        <Card containerStyle={"px-8 py-8 rounded-lg shadow-lg shadow-sky-400"}>
          <Suspense
            fallback={<p className="text-2xl text-gray-500">Loading...</p>}
          >
            <TableComponent playerIds={playerIds} />
          </Suspense>
        </Card>
      </div>
    </div>
  );
};

const TableComponent = ({ playerIds }) => {
  const [selectedPlayer, setSelectedPlayer] = useState("");

  if (playerIds.state === "loading") {
    return <p className="text-2xl text-gray-500">Loading ...</p>;
  } else if (playerIds.state === "hasError") {
    return <p>Error fetching data</p>;
  } else {
    return (
      <table className="table-auto">
        <thead>
          <tr>
            <th className="text-3xl font-normal px-8 py-4 border-2 border-gray-400">
              Name
            </th>
            <th className="text-3xl font-normal px-8 py-4 border-2 border-gray-400">
              Team
            </th>
            <th className="text-3xl font-normal py-4 px-8 border-2 border-gray-400">
              Age
            </th>
            <th className="text-3xl font-normal py-4 px-8 border-2 border-gray-400">
              Position
            </th>
            <th className="text-3xl font-normal py-4 px-8 border-2 border-gray-400">
              PPG
            </th>
            <th className="text-3xl font-normal py-4 px-8 border-2 border-gray-400">
              RPG
            </th>
            <th className="text-3xl font-normal py-4 px-8 border-2 border-gray-400">
              APG
            </th>
          </tr>
        </thead>
        <tbody>
          {playerIds.contents.map((playerId) => (
            <TableValues
              key={playerId}
              playerId={playerId}
              selectedPlayer={selectedPlayer}
              setSelectedPlayer={setSelectedPlayer}
            />
          ))}
        </tbody>
      </table>
    );
  }
};

const TableValues = ({ playerId, selectedPlayer, setSelectedPlayer }) => {
  const [clickCount, setClickCount] = useState(0);
  const setUpdatePlayer = useSetRecoilState(updatePlayerAtom);
  const player = useRecoilValue(playersAtomFamily(playerId));

  useEffect(() => {
    if (clickCount === 2) {
      setSelectedPlayer(playerId);
      setUpdatePlayer({
        id: playerId,
        name: player.name,
        team: player.team,
        position: player.position,
        age: player.age,
        ppg: player.ppg,
        apg: player.apg,
        rpg: player.rpg,
      });
    } else if (clickCount > 2) {
      setSelectedPlayer("");
      setClickCount(0);
    }
  }, [clickCount, playerId, setSelectedPlayer]);

  return (
    <tr
      onClick={() => setClickCount((prevCount) => prevCount + 1)}
      className={`cursor-pointer ${
        selectedPlayer === playerId ? "bg-sky-100" : "hover:bg-sky-50"
      }`}
    >
      <td className="text-2xl font-normal border-2 border-b-2 border-gray-400 text-center px-4 py-4">
        {player.name}
      </td>
      <td className="text-2xl font-normal border-r-2 border-b-2 border-gray-400 text-center px-4 py-4">
        {player.team}
      </td>
      <td className="text-2xl font-normal border-r-2 border-b-2 border-gray-400 text-center px-4 py-4">
        {player.age ?? "N.A"}
      </td>
      <td className="text-2xl font-normal border-r-2 border-b-2 border-gray-400 text-center px-4 py-4">
        {player.position}
      </td>
      <td className="text-2xl font-normal border-r-2 border-b-2 border-gray-400 text-center px-4 py-4">
        {player.ppg ?? "N.A"}
      </td>
      <td className="text-2xl font-normal border-r-2 border-b-2 border-gray-400 text-center px-4 py-4">
        {player.rpg ?? "N.A"}
      </td>
      <td className="text-2xl font-normal border-r-2 border-b-2 border-gray-400 text-center px-4 py-4">
        {player.apg ?? "N.A"}
      </td>
    </tr>
  );
};

export default PlayerInfoComponent;
