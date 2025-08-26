import { useState } from 'react';
import { GrLogout } from 'react-icons/gr';
import { AiOutlineBars } from 'react-icons/ai';
import AdminMenu from './Menu/AdminMenu';
import { Link } from 'react-router';
import SellerMenu from './Menu/SellerMenu';
import logo from '../assets/MedicineLogo.png';
import UserMenu from './Menu/UserMenu';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';


const Sidebar = () => {
  const { logOut } = useAuth(); 
  const [isActive, setIsActive] = useState(false);
 
  const [role,isRoleLoading] = useRole()
  console.log(role,isRoleLoading);
  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <>  
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
            <Link to='/'>
              <img           
                src={logo}
                alt='logo'
                width='100'
                height='100'
              />
            </Link>
          </div>
        </div>
        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>
      
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full'
        } md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-lime-100 mx-auto'>
              <Link to="/">
                <img                
                  src={logo}
                  alt='logo'
                  width='100'
                  height='100'
                />
              </Link>
            </div>
          </div>     
          <div className='flex flex-col justify-between flex-1 mt-6'>
            <nav>        
             {role=== 'admin' && <AdminMenu></AdminMenu>}
              {role === "seller"  && <SellerMenu />}
              { role ==="user"  && <UserMenu /> }
            </nav>
          </div>
        </div>
        <div>
          <hr />
          <button
            onClick={logOut}
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform'
          >
            <GrLogout className='w-5 h-5' />
            <span className="ml-2">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;


