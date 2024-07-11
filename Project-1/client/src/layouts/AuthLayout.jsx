import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userAtom } from "../state/userAtom";
import { useAuth } from "../Hooks/useAuth";
import { alertAtom } from "../state/notificationAtom";

const AuthLayout = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const setAlert = useSetRecoilState(alertAtom);
  const { checkAuth } = useAuth();

  useEffect(() => {
    const checkToken = async () => {
      if (user.isAuthenticated) {
        console.log("Auth Check")
        const response = await checkAuth();

        if (!response.status) {
          setAlert({
            show: true,
            success: false,
            msg: "Session timed out. Login again!",
          });
          setUser({ isAuthenticated: false });
        }
      }
    };

    const intervalId = setInterval(checkToken, 1000 * 60); // Checking every minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [user]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
