import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../Redux/UserSlice';
import axiosInstance from "../Utils/AxioaInstance";
import handleAsync from "../Utils/HandleAsync";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleLogout = handleAsync( async (e) => {
    e.preventDefault();
      const  response=await axiosInstance.post('/logout',{},{withCredentials:true});
      dispatch(logoutUser(user));

      if (response.status >= 200 && response.status < 300) {
        alert('Logout successful', response.data);
        navigate("/login")
      } else {
        throw new Error(response.data.message || 'An error occurred');
      }
      setIsDropdownOpen(false);
      navigate('/');
    
  });
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
    { user ? (
   <>
   
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
   <div className="pinterest flex items-center justify-between bg-white px-4 py-3">
   <div className="left flex items-center space-x-4 w-1/5">
   <Link to="" className="logo w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-200">
     <i className="fab fa-pinterest text-red-600 text-2xl"></i>
   </Link>
   <Link to="/home" className="home font-bold active:bg-black active:text-white  flex items-center justify-center px-4 py-2 rounded-full">
   Home
   </Link>
   <Link to="" className="home font-bold active:bg-black active:text-white flex items-center justify-center px-4 py-2 rounded-full">
   Explore
   </Link>
   <Link to="" className="home font-bold active:bg-black active:text-white flex items-center justify-center px-4 py-2 rounded-full">
   Create
   </Link>
 </div>

 
 <div className="search flex items-center bg-gray-300 hover:bg-gray-400 rounded-full px-4 ml-10 h-12">
   <i className="fas fa-search text-gray-500 w-12 flex justify-center items-center"></i>
   <input
     type="search"
     placeholder="search"
     className="w-[800px] bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-500 pr-4"
   />
 </div>

 
 <div className="right flex items-center space-x-4 w-1/5 justify-end">
   <Link to="" className="items w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-200">
     <i className="fas fa-bell text-gray-500 text-2xl"></i>
   </Link>
   <Link to="" className="items w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-200">
     <i className="far fa-comment-dots text-gray-500 text-2xl"></i>
   </Link>
   <Link to="" className="avatar w-12 h-12 rounded-full flex items-center justify-center">
     <div className="img w-8 h-8 rounded-full overflow-hidden relative">
     <div className="flex items-center justify-center">
      {user.profileImage ? (
        <img
          src={user.profileImage}
          alt="User Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
      ) : (
        <div
          className="w-12 h-12 rounded-full bg-gray-200 flex items-center pb-3 justify-center text-blck  text-lg"
        >
          {user.firstname ? user.firstname[0].toUpperCase() : ''}
        </div>
      )}
    </div>
     </div>
   </Link>
   <div className="relative inline-block text-left">
      {/* Trigger Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-full shadow-sm hover:bg-gray-200"
      >
        <i className="fas fa-chevron-down text-gray-500"></i>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-63 bg-white rounded-lg shadow-lg ring-1 ring-gray-200 z-50">
          <div className="p-4 ">
            <p className="text-xs ">Currently in</p>
            <div className="flex items-center justify-between mt-2 bg-gray-100 px-3 py-2 rounded-md">
              
              <div
          className="w-12 h-12 pr-6 pt-4 rounded-full  flex items-center pb-3 justify-center text-blck text-2xl"
        >
          {user.firstname ? user.firstname[0].toUpperCase() : ''}
        </div>
        <div>
                <p className="font-medium text-gray-800">{user.firstname}</p>
                <p className="text-sm text-gray-500">Personal</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <i className="fas fa-check text-base text-black"></i>
            </div>
          </div>

          <div className="py-2">
            <p className="px-4 text-xs ">Your accounts</p>
            <button className="block w-full text-left px-4 py-2 text-sm  hover:bg-gray-100">
              Add account
            </button>
            <button className="block w-full text-left px-4 py-2 text-sm  hover:bg-gray-100">
              Convert to business
            </button>
          </div>

          <div className="py-3 ">
            <p className="px-4 text-xs  ">More options</p>
            <button className="block w-full text-left px-4 py-4 text-sm  hover:bg-gray-100">
              Settings
            </button>
            <button className="block w-full text-left px-4 py-2 text-sm  hover:bg-gray-100">
              Home feed tuner
            </button>
            <button className="block w-full text-left px-4 py-2 text-sm  hover:bg-gray-100">
              Install the Windows app
            </button>
            <button className="block w-full text-left px-4 py-2 text-sm  hover:bg-gray-100">
              Reports and Violations Centre
            </button>
            <button className="block w-full text-left px-4 py-2 text-sm  hover:bg-gray-100">
              Your privacy rights
            </button>
            <button className="block w-full text-left px-4 py-2 text-sm  hover:bg-gray-100">
              Help Centre
            </button>
            <button className="block w-full text-left px-4 py-2 text-sm  hover:bg-gray-100">
              Terms of Service
            </button>
            <button className="block w-full text-left px-4 py-2 text-sm  hover:bg-gray-100">
              Privacy Policy
            </button>
            <button className="block w-full text-left px-4 py-2 text-sm  hover:bg-gray-100">
              Be a beta tester
            </button>
            <button className="block w-full text-left px-4 py-2 text-sm  hover:bg-gray-100" onClick={handleLogout}>
             Log out
            </button>
          </div>
        </div>
      )}
    </div>
 </div>
</div>
   </>
    ):(
      <>
      <nav className="flex flex-wrap justify-between items-center px-6 py-4 bg-white fixed top-0 left-0 right-0 z-10 bg-white">
        {/* Left Section - Logo */} 
        <div className="flex items-center space-x-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png"
            alt="Logo"
            className="w-8 h-8"
          />
          <span className="text-xl font-bold text-red-600">Pinterest</span>
        </div>
  
        {/* Hamburger Menu for Smaller Screens */}
        <div className="block md:hidden">
          <button className="focus:outline-none">
            {/* Use a Hamburger icon (or a menu SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
  
        {/* Middle Section - Links */}
        <div className="hidden mr[750px] md:flex md:space-x-6 font-sm font-sans font-semibold ">
          <Link to="#today" className="hover:text-black">
            Today
          </Link>
          <Link to="#watch" className="hover:text-black">
            Watch
          </Link>
          <Link to="#explore" className="hover:text-black">
            Explore
          </Link>
        </div>
  
        {/* Right Section - Links and Buttons */}
        <div className="hidden md:flex md:space-x-5 items-center font-sm font-sans font-semibold">
          <Link to="#about" className="hover:text-black text-gray-800">
            About
          </Link>
          <Link to="#business" className="hover:text-black text-gray-800">
            Business
          </Link>
          <Link to="#blog" className="hover:text-black text-gray-800">
            Blog
          </Link>
          <button className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700"  onClick={()=>navigate('/login')}>
            Log in
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300" onClick={()=>navigate('/signup')}>
            Sign up
          </button>
        </div>
      </nav>
      </>
    
    )}
    </>
  );
};

export default Navbar;
