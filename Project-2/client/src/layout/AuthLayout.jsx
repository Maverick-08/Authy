import React from "react";
import { Outlet } from "react-router-dom";
import { RecoilRoot } from "recoil";

const AuthLayout = () => {
  return (
    <RecoilRoot>
      <Outlet />
    </RecoilRoot>
  );
};

export default AuthLayout;
