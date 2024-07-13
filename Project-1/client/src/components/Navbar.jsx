import React from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../state/userAtom";
import { Link } from "react-scroll";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

const Navbar = () => {
  const user = useRecoilValue(userAtom);
  const { Logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);
  // {pathname: '/stats', search: '', hash: '', state: null, key: 'jidvbbg7'}

  async function logoutUser() {
    await Logout();
    navigate("/");
  }

  return (
    <div className="fixed w-full h-16 shadow-md flex justify-center items-center z-10">
      <div className="w-full flex justify-between items-center px-16">
        <div className="mx-32">
          {user.isAuthenticated ? (
            <p
              title={user.role}
              className="text-4xl font-normal font-mono px-2 cursor-pointer"
            >
              {user.username}
            </p>
          ) : (
            <p
              title={user.role}
              className="text-4xl font-normal font-mono px-2 cursor-pointer"
            >
              User
            </p>
          )}
        </div>
        <div className="">
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

            <li className="text-xl px-4 py-2 rounded-md text-gray-500  cursor-pointer">
              <NavLink to="/stats">Statistics</NavLink>
            </li>

            {user.isAuthenticated ? (
              <li className="text-xl px-4 py-2 rounded-md text-gray-500 cursor-pointer">
                {user.role === "Admin" ? (
                  <NavLink to="/dashboard">Dashboard</NavLink>
                ) : (
                  <NavLink to={"/profile"}>Profile</NavLink>
                )}
              </li>
            ) : null}

            {user.isAuthenticated ? (
              <li className="text-xl px-4 py-2 font-medium text-[#6A43C7] cursor-pointer">
                <span onClick={logoutUser}>Logout</span>
              </li>
            ) : (
              <li className="text-xl px-4 py-2 rounded-md text-white bg-[#6A43C7] cursor-pointer">
                <NavLink to="/signin">Login</NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

{
  /* <div className="w-5/6">
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
            {(user.isAuthenticated && user.role === "Admin") ? (
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
            {user.isAuthenticated ? (
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
            ) : (
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
            )}
          </ul>
        </nav>
      </div>
      <div className="w-1/6">
        <p className="text-4xl font-medium text-center">
          {user.isAuthenticated ? user.username : "User"}
        </p>
      </div> */
}
