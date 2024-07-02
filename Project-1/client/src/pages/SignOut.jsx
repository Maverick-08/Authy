import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const SignOut = () => {
    const [click, setClick] = useState(false)
    const navigate = useNavigate();
    const {logout} = useAuth();

    const route = () => {
        logout();
        setClick(true);
        setTimeout(()=> navigate("/"),1500)
    }
  return (
    <div>
      <Navbar />
      <div className="w-full h-96 flex flex-col justify-center items-center ">
        <p className="text-4xl">
          Hope you learnt something new about Authentication !{" "}
          <span className="font-medium text-sky-400">Happy Learning !</span>
        </p>{" "}
        <br />
        <p className="bg-sky-400 text-white text-4xl px-8 py-5 mt-8 rounded-lg cursor-pointer" onClick={route}>
          Sign Out
        </p>
        {click && (<p className="text-red-600 text-xl mt-2">Logging Out</p>)}
      </div>
    </div>
  );
};

export default SignOut;
