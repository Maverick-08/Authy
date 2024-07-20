import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { RecoilRoot, useRecoilState } from "recoil";
import { userAtom, accessTokenAtom } from "../state/userState";
import { useAuth } from "../Hooks/useAuth";

const AuthLayout = () => {
  return (
    <RecoilRoot>
      <TokenVerifier />
      <Outlet />
    </RecoilRoot>
  );
};

const TokenVerifier = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
  const { isTokenValid, rotateToken, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {

    const authCheck = async () => {
      
      if(!user.isAuthenticated) return;

      const response = await isLoggedIn();

      if(response.isActive){
          if(user.activeSessions !== response.activeSessions){
            setUser({...user,activeSessions:response.activeSessions});
          }

          if(user.role !== response.role){
            setUser({...user,role:response.role})
          }
          
          if(!isTokenValid()){
            const response = await rotateToken();

            if(response.status){
              console.log("Token Rotated")
              await new Promise(r => setTimeout(r,2000))
              setAccessToken(response.newAccessToken)
            }
            else{
              setAccessToken("");
              setUser({ username: "", role: "", fullName: "", isAuthenticated: false });
              localStorage.clear();
              navigate("/")
            }
          }
      }
      else{
        setUser({})
        localStorage.clear();
        navigate("/");
      }
    }

    const intervalId = setInterval(authCheck, 1000 * 10);

    return () => clearInterval(intervalId);
  }, [user,accessToken]);

  return <></>;
};

export default AuthLayout;
