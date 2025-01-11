import React, { useState } from 'react';
import {FaBars, FaTachometerAlt, FaUserCircle, FaBox, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../Utils/AxioaInstance';
import handleAsync from '../Utils/HandleAsync';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../Redux/UserSlice';
const AdmNavbar = () => {
  const { user } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAdminLogout = handleAsync(async (e) => {
    e.preventDefault();
    const response = await axiosInstance.post('/admin/admlogout');
          dispatch(logoutUser(user));
    
    if (response.status >= 200 && response.status < 300) {
      toast.success('Admin Logout successful', response.data);
      navigate('/');
      setIsMenuOpen(false);

    } else {
      throw new Error(response.data.message || 'An error occurred');
    }
  });

  return (
    
   <>
      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center justify-end p-4">
        <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-800">
          <FaBars className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`flex flex-col flex-auto flex-shrink-0 antialiased  bg-gray-50 text-gray-800 overflow-y-auto overflow-x-hidden flex-grow ${isOpen ? 'block' : 'hidden'} md:block`}>
        <div className={`fixed flex flex-col top-0 left-0 md:w-0 lg:w-64 bg-white h-full border-r gap-3 transition-width duration-300 overflow-y-auto overflow-x-hidden flex-grow ${isOpen ? 'block' : 'hidden'} md:block`}>
          {/* Logo Section */}
          <div className="flex items-center gap-2 h-14 pt-10 px-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png"
              alt="Logo"
              className="w-8 h-8 cursor-pointer"
              onClick={() => navigate('/')}
            />
            <div className="text-lg font-semibold my-auto text-red-700">Pinterest</div>
          </div>

          {/* Menu Section */}
          <div className={`overflow-y-auto overflow-x-hidden flex-grow ${isOpen ? 'block' : 'hidden'} md:block`}>
            <ul className="flex flex-col py-4 space-y-1">
              {/* Menu Heading */}
              <li className="px-5">
                <div className="flex flex-row items-center h-8">
                  <div className="text-sm font-light tracking-wide text-gray-500">Menu</div>
                </div>
              </li>

              {/* Dashboard */}
              <li>
                <Link
                  to="/"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <FaTachometerAlt className="h-6 w-6" />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">Dashboard</span>
                </Link>
              </li>

              {/* Users */}
              <li>
                <Link
                  to="/users"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <FaUserCircle className="h-6 w-6" />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">Users</span>
                </Link>
              </li>

              {/* Products */}
              <li>
                <Link
                  to="/posts"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <FaBox className="h-6 w-6" />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">Posts</span>
                </Link>
              </li>

              {/* Reports */}
              <li>
                <Link
                  to="/reports"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <FaClipboardList className="h-6 w-6" />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">Reports</span>
                </Link>
              </li>

              {/* Logout */}
              <li>
                <Link
                  onClick={handleAdminLogout}
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <FaSignOutAlt className="h-6 w-6" />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md z-50 md:hidden">
          <Link
            to="/"
            className='block font-bold px-4 py-2 rounded-full '
            onClick={() => {
              setIsMenuOpen(false);
              
            }}
          >
            Dashboard
          </Link>
          <Link
            to="/users"
            className='block font-bold px-4 py-2 rounded-full '
            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            Users
          </Link>
          <Link
            to="/posts"
            className='block font-bold px-4 py-2 rounded-full '

            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            Posts
          </Link>
          <Link
            to="/reports"
            className='block font-bold px-4 py-2 rounded-full '

            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            Reports
          </Link>
          <Link
            className='block font-bold px-4 py-2 rounded-full '
            onClick={ handleAdminLogout}
          >
            Logout
          </Link>
        </div>
      )}
    </>

  );
};

export default AdmNavbar;
