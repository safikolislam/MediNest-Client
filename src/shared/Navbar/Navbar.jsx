import logo from '../../assets/MedicineLogo.png';
import { FaShoppingCart } from 'react-icons/fa';
import { Link, NavLink } from 'react-router';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { cart } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("You have been logged out!");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <>
    
      <div className="navbar fixed top-0 left-0 w-full 
        bg-gradient-to-r from-green-600/20 via-emerald-500/20 to-green-300/20 
        backdrop-blur-xl backdrop-saturate-150 shadow-lg 
        border-b border-white/20 text-white text-xl font-bold px-5 md:px-8 py-4 z-50 rounded-b-2xl">

     
        <div className="flex w-full items-center justify-between lg:hidden">
          <NavLink to="/" className="flex items-center gap-2">
            <img className="w-10 h-10" src={logo} alt="MediNest logo" />
            <span className="btn btn-ghost text-xl normal-case">MediNest</span>
          </NavLink>

          <button onClick={() => setMenuOpen(!menuOpen)} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

      
        <div className="hidden lg:flex w-full items-center justify-between">
        
          <div className="flex items-center gap-2 w-1/3">
            <NavLink to="/" className="flex items-center gap-2">
              <img className="w-10 h-10" src={logo} alt="MediNest logo" />
              <span className="text-xl normal-case">MediNest</span>
            </NavLink>
          </div>

          <div className="navbar-center">
            <ul className="flex gap-6 text-lg font-medium">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md transition-colors duration-300 ${
                      isActive
                        ? "bg-green-600 text-white shadow-md"
                        : "hover:text-green-700 hover:bg-green-100/40"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Shop"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md transition-colors duration-300 ${
                      isActive
                        ? "bg-green-600 text-white shadow-md"
                        : "hover:text-green-700 hover:bg-green-100/40"
                    }`
                  }
                >
                  Shop
                </NavLink>
              </li>
            </ul>
          </div>

        
          <div className="flex items-center gap-5 w-1/3 justify-end">
      
            <Link
              to="/store"
              className="relative flex items-center justify-center w-11 h-11 rounded-full 
                bg-green-600 hover:bg-green-700 transition duration-200 shadow-md"
            >
              <FaShoppingCart className="text-white text-lg" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow">
                  {cart.length}
                </span>
              )}
            </Link>

     
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar hover:scale-105 transition-transform duration-200"
                >
                  <div className="w-11 h-11 rounded-full ring ring-green-500 ring-offset-2 shadow-md">
                    <img src={user.photoURL} alt="Profile" />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-3 shadow-lg menu menu-sm dropdown-content 
                    bg-white rounded-xl w-56 border border-gray-100"
                >
                  <li>
                    <NavLink
                      to="/UpdateProfile"
                      className={({ isActive }) =>
                        `px-3 py-2 rounded-lg transition-colors text-black duration-200 ${
                          isActive
                            ? "bg-green-50 text-green-700 font-semibold"
                            : "hover:bg-green-100 hover:text-green-600"
                        }`
                      }
                    >
                      Update Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/Dashboard"
                      className={({ isActive }) =>
                        `px-3 py-2 rounded-lg transition-colors text-black duration-200 ${
                          isActive
                            ? "bg-green-50 text-green-700 font-semibold"
                            : "hover:bg-green-100 hover:text-green-600"
                        }`
                      }
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 rounded-lg text-black 
                        hover:bg-red-100 hover:text-red-600 transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/SignUp">
                <button className="px-6 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 
                  text-white shadow-md hover:shadow-lg transition-all duration-300">
                  Join Us
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>


      <div
        className={`fixed top-0 left-0 h-full w-full bg-white z-50 transform transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <NavLink to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
            <img className="w-10 h-10" src={logo} alt="MediNest logo" />
            <span className="text-xl font-semibold">MediNest</span>
          </NavLink>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-2xl font-bold p-2 rounded hover:bg-gray-200"
          >
            ✕
          </button>
        </div>

        <ul className="flex flex-col gap-6 p-6 text-xl font-semibold">
          <li>
            <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/Shop" onClick={() => setMenuOpen(false)}>Shop</NavLink>
          </li>
          {user ? (
            <>
              <li>
                <NavLink to="/Dashboard" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
              </li>
              <li>
                <NavLink to="/UpdateProfile" onClick={() => setMenuOpen(false)}>Update Profile</NavLink>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <NavLink
                to="/SignUp"
                onClick={() => setMenuOpen(false)}
                className="bg-green-600 text-white py-2 px-4 rounded-lg text-center block"
              >
                Join Us
              </NavLink>
            </li>
          )}
          <li>
            <NavLink 
              to="/store" 
              onClick={() => setMenuOpen(false)} 
              className="flex items-center gap-2"
            >
              <FaShoppingCart />
              {cart.length > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                  {cart.length}
                </span>
              )}
              Cart
            </NavLink>
          </li>
        </ul>
      </div>

   
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;












