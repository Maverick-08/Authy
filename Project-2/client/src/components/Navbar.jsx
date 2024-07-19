import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import { useRecoilValue } from "recoil";
import { userAtom } from "../state/userState";
import NotificationIcon from "../assets/icons/notifications.svg";

const Navbar = () => {
  const user = useRecoilValue(userAtom);

  return (
    <div className="w-full fixed shadow-md pl-16">
      <div className="w-[90vw] py-2 flex justify-between items-center">
        <User user={user} />
        <Links user={user} />
      </div>
    </div>
  );
};

const User = ({ user }) => {
  return (
    <div className="flex items-center gap-4">
      <img src={NotificationIcon} alt="Notification" className="w-8 h-8" />
      <p
        className="text-4xl font-normal cursor-pointer"
        title={`Access Level : ${user.role}`}
      >
        {user.username ? user.username : "User"}
      </p>
    </div>
  );
};

const Links = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.pathname);
  // {pathname: '/', search: '', hash: '', state: null, key: 'default'}

  return (
    <div>
      <ul className="flex justify-around items-center gap-8">
        <li className="text-xl px-4 py-2 rounded-md text-gray-500 cursor-pointer">
          {location.pathname == "/" ? (
            <Link to="About" smooth={true} duration={500}>
              About
            </Link>
          ) : (
            <NavLink to={"/"}>About</NavLink>
          )}
        </li>

        <li className="text-xl px-4 py-2 rounded-md text-gray-500 cursor-pointer">
          {location.pathname == "/" ? (
            <Link to="Topics" smooth={true} duration={500}>
              Topics
            </Link>
          ) : (
            <NavLink to={"/"}>Topics</NavLink>
          )}
        </li>

        <li className="text-xl px-4 py-2 rounded-md text-gray-500  cursor-pointer">
          {location.pathname === "/" ? (
            <Link to="Developer" smooth={true} duration={500}>
              Developer
            </Link>
          ) : (
            <NavLink to={"/"}>Developer</NavLink>
          )}
        </li>

        {user.isAuthenticated ? (
          <>
            {user.role === "Admin" ? (
              <>
                <li className="text-xl px-4 py-2 rounded-md text-gray-500  cursor-pointer">
                  <NavLink to={"/dashboard"}>Dashboard</NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="text-xl px-4 py-2 rounded-md text-gray-500  cursor-pointer">
                  <NavLink to={"/stats"}>Statistics</NavLink>
                </li>

                <li className="text-xl px-4 py-2 rounded-md text-gray-500  cursor-pointer">
                  <NavLink to={"/profile"}>Profile</NavLink>
                </li>
              </>
            )}
            
            <li className="text-xl px-4 py-2 rounded-md text-gray-500  cursor-pointer">
            <NavLink
                to={"/signout"}
                className={"text-2xl font-medium text-[#6A43C7] cursor-pointer"}
              >
                Logout
              </NavLink>
            </li>
          </>
        ) : (
          <li className="text-xl px-4 py-2 rounded-md text-white bg-[#6A43C7] cursor-pointer">
            <NavLink to="/signin">Login</NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
