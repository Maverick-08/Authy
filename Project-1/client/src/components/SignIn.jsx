import Card from "./Card";
import InputBox from "./InputBox";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertBox from "./AlertBox";
import { useSetRecoilState } from "recoil";
import { user } from "../state/atoms/userAtom";

export default function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ show: false, success: false, msg: "" });
  const setUser = useSetRecoilState(user)

  function changeUsername(e) {
    setUsername(e.target.value);
  }

  function changePassword(e) {
    setPassword(e.target.value);
  }

  function route() {
    navigate("/register");
  }

  async function login() {
    if (password !== "" && username !== "") {
      const payload = { username, password };
      try {
        const response = await axios.post("http://localhost:3000/auth", payload);
        setUser({username,accessToken:response.data.accessToken})
        setPassword("");
        setUsername("");
        setAlert({ show: true, success: true, msg: "Login successful!" });
        setTimeout(()=>navigate("/"),2000);
      } catch (error) {
        setAlert({ show: true, success: false, msg: "Login failed. Please try again." });
      }
    } else {
      setAlert({ show: true, success: false, msg: "Empty fields are not allowed" });
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