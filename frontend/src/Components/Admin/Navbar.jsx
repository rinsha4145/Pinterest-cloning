import React from 'react';
import { FaTachometerAlt, FaUserCircle, FaBox, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../Utils/AxioaInstance';
import handleAsync from '../Utils/HandleAsync';
import { toast } from 'react-toastify';

const AdmNavbar = () => {
//   const { setAdmin } = useContext(DataContext);
  const navigate = useNavigate();

  const handleAdminLogout = handleAsync(async (e) => {
    e.preventDefault();
    const response = await axiosInstance.post('/admin/adminlogout');
    // setAdmin(null);
    if (response.status >= 200 && response.status < 300) {
      toast.success('Admin Logout successful', response.data);
      navigate('/login');
    } else {
      throw new Error(response.data.message || 'An error occurred');
    }
  });

  return (
    <>
      <div className="flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
        <div className="fixed flex flex-col top-0 left-0 w-64 md:w-48 lg:w-64 bg-white h-full border-r">
          {/* Logo Section */}
          <div className="flex items-center justify-center h-14 border-b">
            <div className="text-lg font-semibold">Paw Shop</div>
          </div>
          {/* Menu Section */}
          <div className="overflow-y-auto overflow-x-hidden flex-grow">
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
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
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
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                  <span className="inline-flex justify-center items-center ml-4">
                    <FaUserCircle className="h-6 w-6" />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">Users</span>
                </Link>
              </li>

              {/* Products */}
              <li>
                <Link
                  to="/products"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                  <span className="inline-flex justify-center items-center ml-4">
                    <FaBox className="h-6 w-6" />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">Products</span>
                </Link>
              </li>

              {/* Orders */}
              <li>
                <Link
                  to="orders"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                  <span className="inline-flex justify-center items-center ml-4">
                    <FaClipboardList className="h-6 w-6" />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">Orders</span>
                </Link>
              </li>

              {/* Logout */}
              <li>
                <Link
                  onClick={handleAdminLogout}
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
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
    </>
  );
};

export default AdmNavbar;
