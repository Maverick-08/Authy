import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import PlayerEditComponent from "../components/PlayerEditComponent";
import PlayerStatsComponent from "../components/PlayerStatsComponent";
import { useRecoilValue } from "recoil";
import { userAtom } from "../state/userAtom";

const Stats = () => {
  const user = useRecoilValue(userAtom)
  return (
    <div>
      {user.isAuthenticated ? (
        <MainComponent token={user.accessToken}/>
      ) : (
        <Navigate to={"/prompt"} />
      )}
    </div>
  );
};

const MainComponent = () => {

  return (
    <div className="relative">
      <PlayerEditComponent />
      <PlayerStatsComponent />
    </div>
  );
};

export default Stats;
