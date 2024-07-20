import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { accessTokenAtom } from "../state/userState";
import axios from "axios";

const Dashboard = () => {
  const [usersList, setUsersList] = useState([]);
  const [state, setState] = useState(true);
  const accessToken = useRecoilValue(accessTokenAtom);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:3000/access", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      setUsersList(response.data.data ?? []);
    };

    fetch();
  }, [state]);

  return (
    <div className="w-full pt-32 flex flex-col justify-center items-center">
      <p className="text-4xl font-semibold mb-8 text-purple-500">Admin Dashboard</p>
      <div>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border-2 text-gray-400 font-light text-3xl">Username</th>
              <th className="px-4 py-2 border-2  text-gray-400 font-light text-3xl">Created At</th>
              <th className="px-4 py-2 border-2  text-gray-400 font-light text-3xl">Current Role</th>
              <th className="px-4 py-2 border-2 text-gray-400 font-light text-3xl">Requesting Role</th>
              <th className="px-4 py-2 border-2 text-gray-400 font-light text-3xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersList.map((user) => (
              <Display key={user.username} user={user} setState={setState} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Display = ({ user, setState }) => {
  const accessToken = useRecoilValue(accessTokenAtom);

  const handleAction = async (action) => {
    try {
      await axios.post(
        `http://localhost:3000/access/grant`,
        { username: user.username, grantAccess:action},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setState((prev) => !prev); 
    } catch (error) {
      console.error(`Handle Acrion : \n`, error);
    }
  };

  return (
    <tr>
      <td className="px-4 py-2 border text-center">{user.username}</td>
      <td className="px-4 py-2 border">{user.createdAt}</td>
      <td className="px-4 py-2 border text-center">{user.role}</td>
      <td className="px-4 py-2 border text-center">{user.requestingAccess}</td>
      <td className="px-4 py-2 border">
        <div className="flex gap-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => handleAction(true)}
          >
            Grant
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => handleAction(false)}
          >
            Decline
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Dashboard;
