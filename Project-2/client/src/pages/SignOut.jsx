import React from "react";
import Card from "../components/Card";
import { useAuth } from "../Hooks/useAuth";
import { useRecoilState } from "recoil";
import { userAtom } from "../state/userState";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const {Logout} = useAuth();
  const [user, setUser] = useRecoilState(userAtom);
  const navigate = useNavigate();

  
  const handleLogout = async (allDevices) => {
    const response = await Logout(allDevices)
    setTimeout(()=>{setUser({isAuthenticated:false,isLoggedIn:false});
  navigate("/")},2000)
  }

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <Card containerStyle={"px-4 py-8 flex flex-col justify-center items-center gap-8"}>
        <p className="text-4xl text-sky-400 font-light">
          Hope you would have gained some insights <br /> about Authentication and
          Multiple session management !
        </p>

        <div className="flex flex-col justify-center items-center gap-4">
          <p className="text-2xl text-red-500">Logout</p>
          <div className="flex gap-8">
            <div onClick={()=>handleLogout(false)} className="bg-purple-400 px-4 py-2 text-2xl rounded-md cursor-pointer">Current Device</div>
            <div onClick={()=>handleLogout(true)} className="bg-purple-400 px-4 py-2 text-2xl rounded-md cursor-pointer">All Devices</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SignOut;
