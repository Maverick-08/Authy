import React, { Suspense } from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { playerIdsAtom, playersAtomFamily } from "../state/playerState";
import Card from "../components/Card";

const PlayerInfoComponent = ({ user }) => {
  const playerIds = useRecoilValueLoadable(playerIdsAtom);
  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <p className="text-4xl font-normal text-gray-400">Players Statistics</p>
      <div>
        <Card containerStyle={"px-8 py-8 rounded-lg shadow-lg shadow-sky-400"}>
          <Suspense>
            <TableComponent playerIds={playerIds} />
          </Suspense>
        </Card>
      </div>
    </div>
  );
};

const TableComponent = ({ playerIds }) => {
  
  if (playerIds.state === "loading") {
    return (
      <>
        <p className="text-2xl text-gray-500">Loading ...</p>
      </>
    );
  } else if (playerIds.state === "hasError") {
    return (
      <>
        <p>Error fetching data</p>
      </>
    );
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
            <TableValues key={playerId} playerId={playerId} />
          ))}
        </tbody>
      </table>
    );
  }
};

const TableValues = ({ playerId }) => {
  const [clickCount, setClickCount] = useState(0)
  const player = useRecoilValue(playersAtomFamily(playerId));

  const updateClickCount = () => {
    if(clickCount < 2){
        setClickCount(clickCount+1)
    }
    else if(clickCount == 2){
        
    }
  }
 
  return (
    <tr className="hover:bg-sky-50 cursor-pointer">
      <td className="text-2xl font-normal border-2 border-b-2 border-gray-400 text-center px-4 py-4">
        {player.name}
      </td>
      <td className="text-2xl font-normal border-r-2 border-b-2 border-gray-400 text-center px-4 py-4">
        {player.team}
      </td>
      <td className="text-2xl font-normal border-r-2 border-b-2 border-gray-400 text-center px-4 py-4">
        {player.age}
      </td>
      <td className="text-2xl font-normal border-r-2 border-b-2 border-gray-400 text-center px-4 py-4">
        {player.position}
      </td>
      <td className="text-2xl font-normal border-r-2 border-b-2 border-gray-400 text-center px-4 py-4">
        {player.ppg}
      </td>
      <td className="text-2xl font-normal border-r-2 border-b-2 border-gray-400 text-center px-4 py-4">
        {player.rpg}
      </td>
      <td className="text-2xl font-normal border-r-2 border-b-2 border-gray-400 text-center px-4 py-4">
        {player.apg}
      </td>
    </tr>
  );
};

export default PlayerInfoComponent;
