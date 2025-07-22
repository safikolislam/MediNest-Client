import logo from '../../assets/MedicineLogo.png';
import { FaShoppingCart } from 'react-icons/fa';
import { Link, NavLink } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/Shop">Shop</NavLink></li>
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <img className="w-10 h-10" src={logo} alt="MediNest logo" />
          <p className="btn btn-ghost text-xl">MediNest</p>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/" className={({ isActive }) =>
              isActive ? 'border-b-2 border-green-600 ' : ''}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/Shop" className={({ isActive }) =>
              isActive ? 'border-b-2 border-green-600 ' : ''}>
              Shop
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-3">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost">Language</div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
            <li><a>English</a></li>
            <li><a>Bangla</a></li>
          </ul>
        </div>

        <button className="btn btn-ghost text-xl">
          <Link to="/store"><FaShoppingCart /></Link>
        </button>

        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.photoURL} alt="Profile" />
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <NavLink to="/UpdateProfile" className={({ isActive }) =>
                  isActive ? 'border-b-2 border-green-600 ' : ''}>
                  Update Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/Dashboard" className={({ isActive }) =>
                  isActive ? 'border-b-2 border-green-600 ' : ''}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <button onClick={logOut}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/SignUp">
            <button className="btn bg-green-600 text-white">Join Us</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;



