import React, { useState } from "react";
import Navbar from "../components/Navbar";
import AlertBox from "../components/AlertBox";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

const SignOut = () => {
  const [alert, setAlert] = useState({ show: false, success: false, msg: "" });
  const navigate = useNavigate();
  const { Logout } = useAuth();

  const route = async () => {
    const response = await Logout();

    if (response.status) {
      setAlert({ show: true, success: true, msg: "Logging Out" });
      setTimeout(() => navigate("/"), 2000);
    } else {
      setAlert({ show: true, success: false, msg: "Error Logging Out" });
    }
  };
  return (
    <div>
      <Navbar />
      {alert.show && (
        <AlertBox
          success={alert.success}
          msg={alert.msg}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}
      <div className="w-full h-96 flex flex-col justify-center items-center ">
        <p className="text-4xl">
          Hope you learnt something new about Authentication !{" "}
          <span className="font-medium text-sky-400">Happy Learning !</span>
        </p>{" "}
        <br />
        <p
          className="bg-sky-400 text-white text-4xl px-8 py-5 mt-8 rounded-lg cursor-pointer"
          onClick={route}
        >
          Sign Out
        </p>
      </div>
    </div>
  );
};

export default SignOut;
