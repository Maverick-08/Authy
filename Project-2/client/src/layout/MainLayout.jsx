import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = ({children}) => {
  return (
    <div className="relative">
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;
