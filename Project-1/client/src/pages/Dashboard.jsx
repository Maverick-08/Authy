import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../state/userAtom";
import axios from "axios";
import CustomButton from "../components/CustomButton";
import AlertBox from "../components/AlertBox";

const Access = () => {
  const [userList, setUserList] = useState([]);
  const [alert, setAlert] = useState({ show: false, success: false, msg: "" });
  const [state, setState] = useState(true);
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3000/access/list", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "Content-Type": `application/json`,
        },
        withCredentials: true,
      });

      setUserList(response.data.users ?? []);
    };

    fetchData();
  }, [state]);

  async function grantAccess(userId, requestStatus, grantRole) {
    const payload = { userId, requestStatus, grantRole };
    try{
      const response = await axios.post(
        "http://localhost:3000/access/grant",
        payload,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setAlert({show:true, success:true, msg:"Access granted !"})
      setState((prev) => !prev);
    }
    catch(err){
      console.log(err);
      setAlert({show:true, success:false, msg:"Failed to grant access !"})
    }
  }

  return (
    <div className="w-full h-full pt-32 flex flex-col justify-center items-center gap-16">
      {alert.show && (
        <AlertBox
          success={alert.success}
          msg={alert.msg}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}
      <p className="text-4xl text-purple-400">Admin Dashboard</p>
      <div>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="text-2xl font-medium px-8 py-4 border-2 border-gray-400">
                User ID
              </th>
              <th className="text-2xl font-medium px-8 py-4 border-2 border-gray-400">
                Username
              </th>
              <th className="text-2xl font-medium px-8 py-4 border-2 border-gray-400">
                Created At
              </th>
              <th className="text-2xl font-medium px-8 py-4 border-2 border-gray-400">
                Current Role
              </th>
              <th className="text-2xl font-medium px-8 py-4 border-2 border-gray-400">
                Requesting Role
              </th>
              <th className="text-2xl font-medium px-8 py-4 border-2 border-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <UserDetails
                key={user.id}
                user={user}
                grantAccess={grantAccess}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const UserDetails = ({ user, grantAccess }) => {
  const [date, time] = user.createdAt.split("T");

  return (
    <tr>
      <td className="text-xl font-light px-4 py-4 border-2 border-gray-400 text-center">
        {user.id}
      </td>
      <td className="text-xl font-light px-4 py-2 border-2 border-gray-400 text-center">
        {user.username}
      </td>
      <td className="text-xl font-light px-4 py-2 border-2 border-gray-400">
        {date + " - " + time.slice(0, 8)}
      </td>
      <td className="text-xl font-light px-4 py-2 border-2 border-gray-400 text-center">
        {user.role}
      </td>
      <td className="text-xl font-light px-4 py-2 border-2 border-gray-400 text-center">
        {user.requestingAccess}
      </td>
      <td className="text-xl font-light px-4 py-2 border-2 border-gray-400">
        {
          <div className="flex justify-center items-center gap-4">
            <CustomButton
              title={"Grant"}
              textStyle={"font-medium text-white"}
              containerStyle={
                "bg-purple-400 px-4 py-2 rounded-md cursor-pointer"
              }
              handleClick={() =>
                grantAccess(user.id, true, user.requestingAccess)
              }
            />
            <CustomButton
              title={"Decline"}
              textStyle={"font-medium text-white"}
              containerStyle={
                "bg-purple-400 px-4 py-2 rounded-md cursor-pointer"
              }
              handleClick={() =>
                grantAccess(user.id, false, user.requestingAccess)
              }
            />
          </div>
        }
      </td>
    </tr>
  );
};

export default Access;
