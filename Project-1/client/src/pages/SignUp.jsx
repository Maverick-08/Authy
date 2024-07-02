import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import InputBox from "../components/InputBox";
import ToggleTheme from "../components/ToggleTheme";
import CustomButton from "../components/CustomButton";
import AlertBox from "../components/AlertBox";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [correctPassword, setCorrectPassword] = useState("");
  const [alert, setAlert] = useState({ show: false, success: "", msg: "" });

  const { register } = useAuth();

  const route = () => {
    navigate("/signin");
  };

  const submit = async () => {
    if (!username || !password) {
      setAlert({ show: true, success: false, msg: "Fill all credentials" });
    } 

    if(password !== correctPassword){
      setAlert({ show: true, success: false, msg: "Passwords do not match" });
    }
    else {
      const response = await register(username, correctPassword); 

      if (response.status) {
        setAlert({ show: true, success: true, msg: "Registration Successfull" });
        setTimeout(() => navigate("/signin"), 1500);
      } 
      else {
        setAlert({ show: true, success: false, msg: response.msg });
      }
    }
  };

  return (
    <div>
      {alert.show && (
        <AlertBox
          success={alert.success}
          msg={alert.msg}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}
      <div className="h-[100vh] w-full bg-sky-100 dark:bg-black flex justify-between items-center px-32">
        <div className="flex flex-col gap-14">
          <div className="flex flex-col gap-8">
            <p className="text-8xl font-semibold text-sky-600 hover:text-sky-500 dark:text-sky-400 cursor-pointer">
              Register
            </p>
            <p className="dark:text-sky-200 text-2xl font-normal">
              The security threats are growing exponentially with the <br />
              advancement of AI, adopt the modern practices of authentication{" "}
              <br />
              to keep them at bay!
            </p>
          </div>
          <div className="w-64">
            <ToggleTheme />
          </div>
        </div>
        <div>
          <Card style={"pl-4 py-6 gap-8"}>
            <InputBox
              title="Enter Username"
              type="text"
              placeholder="Your Username"
              value={username}
              handleTextChange={setUsername}
              titleStyle="text-2xl font-medium"
              inputStyle="border-2 border-gray-300 focus:border-gray-300 rounded-lg mt-4 px-2 py-2 text-xl font-regular"
            />
            <InputBox
              title="Enter Password"
              type="password"
              placeholder="Your Password"
              value={password}
              handleTextChange={setPassword}
              titleStyle="text-2xl font-medium"
              inputStyle="border-2 border-gray-300 focus:border-gray-300 rounded-lg mt-4 px-2 py-2 text-xl font-regular mr-16"
            />
            <InputBox
              title="Re-Enter Password"
              type="password"
              placeholder="Renter Password"
              value={correctPassword}
              handleTextChange={setCorrectPassword}
              titleStyle="text-2xl font-medium"
              inputStyle="border-2 border-gray-300 focus:border-gray-300 rounded-lg mt-4 px-2 py-2 text-xl font-regular mr-24"
            />
            <CustomButton
              title={"Sign Up"}
              textStyle={`text-black bg-sky-400 px-16 py-2 rounded-lg`}
              containerStyle={"flex justify-center item-center cursor-pointer"}
              handleClick={submit}
            />
            <p className="text-xl font-regular">
              Have an account ?{" "}
              <span
                className="text-xl font-medium text-sky-500 cursor-pointer"
                onClick={route}
              >
                Sign In
              </span>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
