import React from "react";
import { useNavigate } from "react-router-dom";

const PromptLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="w-[40%] h-[40%] shadow-lg rounded-lg flex flex-col justify-center items-center gap-8 py-8 border-2 border-gray-400">
        <p className="text-3xl font-regular text-gray-500 text-center">
          Please login to access this page!
        </p>
        <button
          onClick={() => navigate("/signin")}
          className="px-8 py-4 text-2xl bg-[#6A43C7] text-white rounded-md font-semibold cursor-pointer"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default PromptLogin;
