import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { useRecoilState, useRecoilValue } from "recoil";
import { accessTokenAtom, userAtom } from "../state/userState";
import ProfileImage from "../assets/images/profile.jpg";
import { jwtDecode } from "jwt-decode";
import { alertAtom } from "../state/notification";
import MessageBox from "../components/MessageBox";
import { useAuth } from "../Hooks/useAuth";

const Profile = () => {
  const user = useRecoilValue(userAtom);
  const [alert, setAlert] = useRecoilState(alertAtom);

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      {alert.show && (
        <MessageBox
          success={alert.success}
          msg={alert.msg}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}
      <Card containerStyle={"px-8 py-8 rounded-lg flex flex-col gap-8"}>
        <div className="flex flex-col justify-center items-center gap-4 mx-4">
          <img
            src={ProfileImage}
            alt="Profile"
            className="w-24 h-24 px-2 py-2 rounded-full shadow-md shadow-purple-500"
          />
          <p className="text-4xl ">{user.fullName}</p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-2xl text-gray-500">
            Username : <span className="text-black">{user.username}</span>
          </p>
          <p className="text-2xl text-gray-500">
            Role : <span className="text-black">{user.role}</span>
          </p>
          <p className="text-2xl text-gray-500">
            Created At : <span className="text-black">{user.createdAt}</span>
          </p>
          <p className="text-2xl text-gray-500">
            Logged In :{" "}
            <span className="text-black">
              {user.createdAt ? "Online" : "Offline"}
            </span>
          </p>
          <p className="text-2xl text-gray-500">
            Active Sessions :{" "}
            <span className="text-black">{user.activeSessions}</span>
          </p>
        </div>
        <AccessTokenComponent />
        <div className="flex justify-center items-center">
          <ButtonComponent user={user} setAlert={setAlert} />
        </div>
      </Card>
    </div>
  );
};

const ButtonComponent = ({ user, setAlert }) => {
  const { Request } = useAuth();

  const requestAccess = async (role) => {
    const response = await Request({
      username: user.username,
      requestedRole: role,
    });

    if (response.status) {
      setAlert({ show: true, success: true, msg: `Request for ${role} has been sent` });
    }
    else{
      setAlert({ show: true, success: false, msg: `Failed to sent request` });
    }
  };

  if (user.role === "User") {
    return (
      <div className="flex gap-8">
        <div onClick={()=>requestAccess("Editor")} className="bg-purple-500 text-white text-2xl px-4 py-2 rounded-lg cursor-pointer">
          Request Editor Access
        </div>
        <div onClick={()=>requestAccess("Admin")} className="bg-purple-500 text-white text-2xl px-4 py-2 rounded-lg cursor-pointer">
          Request Admin Access
        </div>
      </div>
    );
  } else if (user.role === "Editor") {
    return (
      <div onClick={()=>requestAccess("Admin")} className="bg-purple-500 text-white text-2xl px-4 py-2 rounded-lg cursor-pointer">
        Request Admin Access
      </div>
    );
  }
};

const AccessTokenComponent = () => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const timeDiff = () => {
      const tokenExpiryTime = jwtDecode(accessToken).exp * 1000; // exp time in millisec
      const currentTime = Date.now(); // current time in millisec
      const diff = (tokenExpiryTime - currentTime) / 1000;
      setTimeLeft(Math.floor(diff));
    };

    timeDiff();

    const intervalId = setInterval(timeDiff, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [accessToken]);

  return (
    <div className="flex items-center gap-4">
      <p className="text-2xl text-gray-500">Access Token Validity : </p>
      <RenderTimeLeft time={timeLeft} />
    </div>
  );
};

const RenderTimeLeft = ({ time }) => {
  if (time < 0) {
    return (
      <span className="rounded-md bg-purple-300 border-2 border-purple-500 text-xl text-black flex justify-center items-center px-4 py-2">
        Roating Token
      </span>
    );
  } else if (time < 60) {
    return (
      <span className="rounded-md bg-red-400 border-2 border-red-500 text-xl text-black flex justify-center items-center px-4 py-2">
        {time} s
      </span>
    );
  } else if (time < 120) {
    return (
      <span className="rounded-md bg-yellow-300 border-2 border-yellow-500 text-xl text-black flex justify-center items-center px-4 py-2">
        {time} s
      </span>
    );
  } else {
    return (
      <div className="w-32 h-12  rounded-md bg-green-300 border-2 border-green-400 text-xl text-black flex justify-center items-center px-4 py-2">
        {time} s
      </div>
    );
  }
};

export default Profile;
