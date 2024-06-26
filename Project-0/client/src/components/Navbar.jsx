import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userInfo } from "../state/atoms/userAtom";
import AlertBox from "./AlertBox";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = useRecoilValue(userInfo);
  const [alert, setAlert] = useState({ show: false, success: false, msg: "" });

  function route() {
    if (!user.role) {
      setAlert({show:true,success:false,msg:"Please sign in first"})
    }
  }

  function route(path){
    navigate(`/${path}`)
  }

  function logout(){

  }

  return (
    <>
      {alert.show && (
        <AlertBox
          onClose={() => setAlert({ ...alert, show: false })}
          success={alert.success}
          msg={alert.msg}
        />
      )}
      <div className="fixed w-full h-20 border-b-2 border-gray-200 shadow-md">
        <div className="flex h-full">
          <div className="w-4/5 flex justify-around items-center">
            <p>Home</p>
            {user === "User" ? <p onClick={()=>route("auth")}>Sign In</p> : null}
            {<p onClick={logout}>Logout</p>}
            <p onClick={route} className="cursor-pointer">
              Stats
            </p>
          </div>
          <div className="w-1/5 flex justify-center items-center">
            <p className="text-2xl">{user ? user : "User"}</p>
          </div>
        </div>
      </div>
    </>
  );
}
