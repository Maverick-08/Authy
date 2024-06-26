import Card from "./Card";
import InputBox from "./InputBox";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertBox from "./AlertBox";
import { userInfo, accessToken } from "../state/atoms/userAtom";
import { useSetRecoilState } from "recoil";
import { userActions } from "../actions/userActions.js";


export default function SignIn() {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ show: false, success: false, msg: "" });
  const Login = userActions().Login;

  // const setUserInfo = useSetRecoilState(userInfo);

  function changeUsername(e) {
    setUsername(e.target.value);
  }

  function changePassword(e) {
    setPassword(e.target.value);
  }

  function route(){
    navigate("/register");
  }

  // async function login(){
  //   let response;

  //   if(username && password){
  //       try{
          
  //         response = await axios.post("http://localhost:3000/auth",{username,password});

  //         const accessToken = response.data.accessToken;

  //         if(accessToken){
  //           setAlert({show:true,success:true,msg:"Login Successfull"})
  //           setUserInfo({username})
  //           setTimeout(()=> navigate("/"),1500);
  //         }

  //       }catch(err){
  //         console.log("@login : "+err.name+"\n"+err.message);
  //         setAlert({show:true,success:false,msg:"Authentication Failed"})
  //       }
  //   }
  //   else{
  //     setAlert({show:true,success:false,msg:"Please enter username and password."})
  //   }
  // }

  function login(){


    if(username && password){
      if(Login({username,password})){

        setAlert({show:true,success:true,msg:"Login successful"})
        setTimeout(()=>{navigate("/")},1500);
      }
      else{
        setAlert({show:true,success:false,msg:"Invalid credentials"})
      }
    }
    else{
      setAlert({show:true,success:false,msg:"Enter credentials"})
    }
    
  }

  return (
    <div>
      {alert.show && (
        <AlertBox
          success={alert.success}
          msg={alert.msg}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}
      <div className="h-[100vh] bg-sky-100 flex items-center justify-between px-24">
        <div>
          <h1 className="text-textPrimary text-[4rem] font-semibold ">
            Authentication
          </h1>
          <p className="text-textSecondary text-2xl">
            The security threats are growing exponentially with the <br />
            advancement of AI, adopt the modern practices of authentication{" "}
            <br />
            to keep them at bay!
          </p>
        </div>
        <div>
          <Card>
            <div className="h-full flex flex-col justify-between">
              <div className="px-8 py-4 flex flex-col gap-14">
                <InputBox
                  placeholder={"Enter Username"}
                  type={"text"}
                  style={
                    "w-full h-12 border-b-2 border-gray-300 text-xl text-primaryBlue font-medium focus:outline-none focus:border-gray-400 text-center"
                  }
                  value={username}
                  onChange={changeUsername}
                />
                <InputBox
                  placeholder={"Enter Password"}
                  type={"password"}
                  style={
                    "w-full h-12 border-b-2 border-gray-300 text-xl text-primaryBlue font-medium focus:outline-none focus:border-gray-400 text-center"
                  }
                  value={password}
                  onChange={changePassword}
                />
              </div>
              <div className="px-8 mt-8 mb-2">
                <button
                  onClick={login}
                  className="w-full h-10 rounded-xl text-center text-xl font-medium border-2 border-primaryBlue text-sky-600 hover:bg-primaryBlue hover:text-white"
                >
                  Sign In
                </button>
                <p className="text-gray-500 text-xl my-4">
                  Don't have an account?{" "}
                  <span
                    onClick={route}
                    className="text-primaryBlue text-xl font-medium cursor-pointer"
                  >
                    Register Here
                  </span>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
