import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../state/userAtom";
import Card from "../components/Card";
import profile from "../assets/images/profile.jpg";
import CustomButton from "../components/CustomButton";
import AlertBox from "../components/AlertBox";
import { jwtDecode } from "jwt-decode";
import { upgradeAccess } from "../utils/auth";

const Profile = () => {
  const user = useRecoilValue(userAtom);
  const [tokenExpTime, setTokenExpTime] = useState(0);
  const [alert, setAlert] = useState({ show: false, success: false, msg: "" });

  useEffect(() => {
    const calculateTimeDifference = () => {
      const decodedToken = jwtDecode(user.accessToken);
      const expTime = decodedToken.exp * 1000; // exp time in milliseconds
      const currentTime = Date.now(); // current time in milliseconds
      const timeDiff = expTime - currentTime;
      setTokenExpTime(timeDiff);
    };

    const intervalId = setInterval(calculateTimeDifference, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [user.accessToken]);

  const requestAccess = async (requestingAccess) => {
    const response = await upgradeAccess(
      user.accessToken,
      user.id,
      requestingAccess
    );

    if (response.status) {
      setAlert({
        show: true,
        success: true,
        msg: "Request has been sent to Admin",
      });
    } else {
      setAlert({ show: true, success: false, msg: response.msg });
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      {alert.show && (
        <AlertBox
          success={alert.success}
          msg={alert.msg}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}
      <Card style={"px-32 py-16"}>
        <div className="flex flex-col justify-center items-center gap-8">
          <img
            src={profile}
            alt="Profile"
            className="w-28 h-28 rounded-full shadow-lg px-4 py-4 shadow-sky-200"
          />
          <p className="text-4xl font-light">{user.username}</p>
        </div>

        <div className=" mt-8">
          <div className="mt-2">
            <p className="text-2xl font-normal text-gray-400">
              User Id :{"  "}
              <span className="text-2xl font-normal text-black">{user.id}</span>
            </p>
          </div>

          <div className="mt-2">
            <p className="text-2xl font-normal text-gray-400">
              Access Level :{" "}
              <span className="text-2xl font-normal text-black">
                {user.role} Level
              </span>
            </p>
          </div>

          <div className="mt-2">
            <p className="text-2xl font-normal text-gray-400">
              Authentication Status:{" "}
              <span className="text-2xl font-normal text-black">
                {user.isAuthenticated ? "Authenticated" : "Logged Out"}
              </span>
            </p>
          </div>

          <div className="text-2xl text-gray-400 font-normal flex gap-8 mt-4 items-center">
            Access Token: <DisplayExpTime timeDiff={tokenExpTime} />
          </div>
        </div>
        <div>
          {user.role === "User" ? (
            <div className="flex items-center gap-8 mt-8">
              <CustomButton
                title={"Request Editor Access"}
                textStyle={"text-xl text-black"}
                containerStyle={
                  "bg-purple-400 px-4 py-5 rounded-md cursor-pointer"
                }
                handleClick={() => requestAccess("Editor")}
              />
              <CustomButton
                title={"Request Admin Access"}
                textStyle={"text-xl text-black"}
                containerStyle={
                  "bg-purple-400 px-4 py-5 rounded-md cursor-pointer"
                }
                handleClick={() => requestAccess("Admin")}
              />
            </div>
          ) : user.role === "Editor" ? (
            <div>
              <CustomButton
                title={"Request Admin Access"}
                textStyle={"text-xl text-black"}
                containerStyle={
                  "bg-purple-400 px-4 py-5 rounded-md cursor-pointer"
                }
                handleClick={() => requestAccess("Admin")}
              />
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
};

const DisplayExpTime = ({ timeDiff }) => {
  const seconds = Math.floor(timeDiff / 1000);

  if (seconds <= 0) {
    return (
      <div className="px-4 py-4 bg-purple-300 border-2 border-purple-500 rounded-lg w-56">
        <p className="text-xl font-normal text-black text-center">Rotating Token</p>
      </div>
    );
  } else if (seconds < 60) {
    return (
      <div className="px-4 py-4 bg-red-200 border-2 border-red-500 rounded-lg">
        <p className="text-xl font-normal text-black w-56 text-center">
          Token Valid for <span className="font-semibold">{seconds}</span> s
        </p>
      </div>
    );
  } else if (seconds < 150) {
    return (
      <div className="px-4 py-4 bg-yellow-300 border-2 border-yellow-500 rounded-lg w-56">
        <p className="text-xl font-normal text-black text-center">
          Token Valid for <span className="font-semibold">{seconds}</span> s
        </p>
      </div>
    );
  } else {
    return (
      <div className="px-4 py-4 bg-green-300 border-2 border-green-400 rounded-lg w-56">
        <p className="text-xl font-normal text-black text-center">
          Token Valid for <span className="font-semibold">{seconds}</span> s
        </p>
      </div>
    );
  }
};

export default Profile;
