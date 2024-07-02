import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../context/atoms/userAtom";
import useAuth from "../Hooks/useAuth";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const user = useRecoilValue(userAtom);
  console.log(user);

  return (
    <div className="w-full h-20 shadow-lg flex justify-between items-center">
      <div className="w-5/6">
        <nav className="p-4">
          <ul className="flex justify-around">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-2xl text-white font-medium bg-sky-400 px-2 py-1 rounded-md"
                    : "text-gray-400 text-2xl font-medium"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "text-2xl text-white font-medium bg-sky-400 px-2 py-1 rounded-md"
                    : "text-gray-400 text-2xl font-medium"
                }
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/developer"
                className={({ isActive }) =>
                  isActive
                    ? "text-2xl text-white font-medium bg-sky-400 px-2 py-1 rounded-md"
                    : "text-gray-400 text-2xl font-medium"
                }
              >
                Developer
              </NavLink>
            </li>
            {user.role === "Admin" ? (
              <li>
                <NavLink
                  to="/developer"
                  className={({ isActive }) =>
                    isActive
                      ? "text-2xl text-white font-medium bg-sky-400 px-2 py-1 rounded-md"
                      : "text-gray-400 text-2xl font-medium"
                  }
                >
                  Access
                </NavLink>
              </li>
            ) : null}
            <li>
              <NavLink
                to="/stats"
                className={({ isActive }) =>
                  isActive
                    ? "text-2xl text-white font-medium bg-sky-400 px-2 py-1 rounded-md"
                    : "text-gray-400 text-2xl font-medium"
                }
              >
                Statistics
              </NavLink>
            </li>
            {user.username === "" ? (
              <li>
                <NavLink
                  to="/signin"
                  className={({ isActive }) =>
                    isActive
                      ? "text-2xl text-white font-medium bg-sky-400 px-2 py-1 rounded-md"
                      : "text-gray-400 text-2xl font-medium"
                  }
                >
                  Login
                </NavLink>
              </li>
            ) : (
              <li>
                <NavLink
                  to="/signout"
                  className={({ isActive }) =>
                    isActive
                      ? "text-2xl text-white font-medium bg-sky-400 px-2 py-1 rounded-md"
                      : "text-gray-400 text-2xl font-medium"
                  }
                >
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
      <div className="w-1/6">
        <p className="text-4xl font-medium text-center">
          {user.username == "" ? "User" : user.username}
        </p>
      </div>
    </div>
  );
};

export default Navbar;
