import React, { useState } from "react";
import Card from "../components/Card";
import { NavLink, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { themeAtom } from "../state/theme";
import MessageBox from "../components/MessageBox";
import { useAuth } from "../Hooks/useAuth";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [theme, setTheme] = useRecoilState(themeAtom);
  const [alert, setAlert] = useState({show:false, success:false, msg:""});
  const navigate = useNavigate();
  const { Login } = useAuth();

  const toggle = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  };

  const submit = async () => {
    if (username === "") {
      setAlert({ show: true, success: false, msg: "Please enter username" });
    } 
    else if (password === "") {
      setAlert({ show: true, success: false, msg: "Please enter password" });
    } 
    else {
      const response = await Login(username, password);

      if (response.status) {
        setAlert({ show: true, success: true, msg: "Logged In" });
        setTimeout(() => navigate("/"), 1500);
      } else {
        setAlert({ show: true, success: false, msg: response.msg });
      }
    }
  };

  return (
    <div className="w-full h-[100vh] flex items-center justify-around bg-sky-50 dark:bg-black">
      {alert.show && (
        <MessageBox
          success={alert.success}
          msg={alert.msg}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}
      <div className="flex flex-col gap-14">
        <div className="flex flex-col gap-8">
          <p className="text-8xl font-semibold text-sky-600 hover:text-sky-500 dark:text-sky-400 cursor-pointer">
            Sign In
          </p>
          <p className="text-2xl font-normal text-gray-700 dark:text-sky-200">
            The security threats are growing exponentially with the <br />
            advancement of AI, adopt the modern practices of authentication{" "}
            <br />
            to keep them at bay!
          </p>
        </div>
        <div
          className="w-[15vw] text-center bg-sky-300 px-8 py-4 
          text-white hover:text-gray-200 text-2xl font-medium rounded-lg cursor-pointer"
          onClick={toggle}
        >
          Toggle Theme
        </div>
      </div>
      <div>
        <Card
          containerStyle={
            "px-8 py-8 rounded-md dark:shadow-lg dark:shadow-sky-400 "
          }
        >
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <label htmlFor="username" className="text-2xl font-light">
                  Enter Username
                </label>
                <input
                  type="text"
                  className="outline-none rounded-md border-2 border-gray-400 px-4 py-2 text-xl"
                  id="username"
                  value={username}
                  autoComplete="on"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="password" className="text-2xl font-light">
                  Enter Password
                </label>
                <input
                  type="password"
                  id="password"
                  autoComplete="on"
                  className="outline-none rounded-md border-2 border-gray-400 px-4 py-2 text-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div
                onClick={submit}
                className="bg-sky-300 text-white text-2xl font-medium text-center rounded-md py-2 cursor-pointer hover:text-gray-200"
              >
                {" "}
                Sign In
              </div>
              <p className="text-xl">
                Don't have an account?{" "}
                <NavLink to={"/signup"}>
                  <span className="font-medium text-sky-400 underline">
                    Sign Up
                  </span>
                </NavLink>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
