import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-scroll';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.pathname)
    // {pathname: '/', search: '', hash: '', state: null, key: 'default'}

    function route(path){
        navigate(`/${path}`)
    }
  return (
    <div className='w-full h-16 shadow-md'>
      <div>User</div>
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

            <li className="text-xl px-4 py-2 rounded-md text-gray-500  cursor-pointer">
              <NavLink to="/stats">Statistics</NavLink>
            </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
