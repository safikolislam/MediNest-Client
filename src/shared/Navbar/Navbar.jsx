import logo from '../../assets/MedicineLogo.png';
import { FaShoppingCart } from 'react-icons/fa';
import { Link, NavLink } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { cart } = useAuth();

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
    <div className="navbar fixed top-0 left-0 w-full
                bg-green-100/30 
                bg-gradient-to-r from-green-400/30 via-green-100/30 to-emerald-500/30
                backdrop-blur-xl 
                shadow-2xl 
                rounded-b-2xl 
                border border-white/20
                text-white 
                text-xl font-bold tracking-wider 
                drop-shadow-lg
                px-8 py-5 
                z-50">
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
            className="menu menu-sm dropdown-content text-black rounded-box z-10 mt-3 w-52 p-2 shadow">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/Shop">Shop</NavLink></li>
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <NavLink to="/"><img className="w-10 h-10" src={logo} alt="MediNest logo" /></NavLink>
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
            <li className="text-black"><a>English</a></li>
            <li className="text-black"><a>Bangla</a></li>
          </ul>
        </div>

        <Link to="/store" className="btn btn-ghost text-xl relative">
          <FaShoppingCart />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
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
              <div className="w-10 rounded-full ring ring-green-500 ring-offset-2">
                <img src={user.photoURL} alt="Profile" />
              </div>
            </div>
            <ul 
              tabIndex={0} 
              className="mt-3 z-[1] p-3 shadow-lg menu menu-sm dropdown-content bg-white rounded-xl w-56 border border-gray-100"
            >
              <li>
                <NavLink 
                  to="/UpdateProfile" 
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg transition-colors text-black duration-200 ${
                      isActive 
                        ? 'bg-green-50 text-green-700 font-semibold' 
                        : 'hover:bg-green-100 hover:text-green-600'
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
                        ? 'bg-green-50 text-green-700 font-semibold' 
                        : 'hover:bg-green-100 hover:text-green-600'
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <button 
                  onClick={handleLogout} 
                  className="w-full text-left px-3 py-2 rounded-lg text-black hover:bg-red-100 hover:text-red-600 transition-colors duration-200"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/SignUp">
            <button className="btn bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl shadow-md transition duration-200">
              Join Us
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;




