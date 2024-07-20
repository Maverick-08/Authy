import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import { useRecoilValue } from "recoil";
import { accessTokenAtom, userAtom } from "../state/userState";
import NotificationIcon from "../assets/icons/notifications.svg";
import axios from "axios";

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
  const [showNotification, setShowNotification] = useState(false);
  return (
    <div className="relative flex items-center gap-4">
      <img
        src={NotificationIcon}
        alt="Notification"
        className="w-8 h-8 cursor-pointer"
        onClick={() => setShowNotification(!showNotification)}
      />
      <Notifications user={user} display={showNotification} />
      <p
        className="text-4xl font-normal cursor-pointer"
        title={`${user.role} level access`}
      >
        {user.username ? user.username : "User"}
      </p>
    </div>
  );
};

const Notifications = ({ user, display }) => {
  const [notifications, setNotifications] = useState([]);
  const accessToken = useRecoilValue(accessTokenAtom);

  useEffect(() => {
    const fetch = async () => {
      if (user.username) {
        const response = await axios.get(
          `http://localhost:3000/notifications/${user.username}`,{
            headers:{
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            }
          }
        );
        const userNotifications = response.data.notifications ?? [];
        setNotifications(userNotifications);
      }
    };

    fetch();
    
  }, [display]);

  return (
    <div
      className={`fixed mt-48 bg-white border-2 border-purple-400 px-4 py-2 ${
        display ? "inline" : "hidden"
      } z-20 rounded-md`}
    >
      {notifications.length === 0 ? (
        <p className="text-2xl text-gray-400 border-b-2 mb-2">
          No New Notifications
        </p>
      ) : (
        notifications.map((notification, index) => (
          <div className="border-b-2 mb-2 border-gray-200 flex flex-col items-end" key={index}>
            <p className="text-xl text-gray-600">{notification.info}</p>
            <span className="text-xs text-gray-500">{notification.createdAt}</span>
          </div>
        ))
      )}
    </div>
  );
};

const Links = ({ user }) => {
  const location = useLocation();

  return (
    <div>
      <ul className="flex justify-around items-center gap-8">
        <NavItem to="/" text="About" location={location.pathname} />
        <NavItem to="/" text="Topics" location={location.pathname} />
        <NavItem to="/" text="Developer" location={location.pathname} />

        {user.isAuthenticated ? (
          <>
            {user.role === "Admin" ? (
              <NavItem to="/dashboard" text="Dashboard" />
            ) : (
              <>
                <NavItem to="/stats" text="Statistics" />
                <NavItem to="/profile" text="Profile" />
              </>
            )}
            <li className="text-xl px-4 py-2 rounded-md text-gray-500 cursor-pointer">
              <NavLink
                to="/signout"
                className="text-2xl font-medium text-[#6A43C7] cursor-pointer"
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

const NavItem = ({ to, text, location }) => (
  <li className="text-xl px-4 py-2 rounded-md text-gray-500 cursor-pointer">
    {location === "/" ? (
      <Link to={text} smooth={true} duration={500}>
        {text}
      </Link>
    ) : (
      <NavLink to={to}>{text}</NavLink>
    )}
  </li>
);

export default Navbar;
