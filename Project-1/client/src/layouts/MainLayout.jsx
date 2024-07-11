import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="relative">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
