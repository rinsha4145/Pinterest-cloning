import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../Redux/UserSlice';
import axiosInstance from "../Utils/AxioaInstance";
import handleAsync from "../Utils/HandleAsync";
import OutsideClickHandler from 'react-outside-click-handler';
import {useClickHandler} from '../Context/ClickHandlerContext'
import {clearSavedFolders} from '../Redux/SavedSlice'

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("Home");
  const { user } = useSelector((state) => state.user);
  const { showLogin, showSignup,setShowLogin, setShowSignup } = useClickHandler()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const saved = useSelector((state) => state.saved.saved);

  
  
  const handleLogout = handleAsync( async (e,enqueueSnackbar) => {
    e.preventDefault();
      const  response=await axiosInstance.post('/logout',{},{withCredentials:true});
      dispatch(logoutUser(user));
      dispatch(clearSavedFolders(saved))
      if (response.status >= 200 && response.status < 300) {
        navigate("/")
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
     {/* Left Section */}
     <div className="left flex items-center space-x-4 w-full sm:w-1/5 md:w-1/4 lg:w-1/5">
       <Link to="" className="logo w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-200">
         <i className="fab fa-pinterest text-red-600 text-2xl"></i>
       </Link>
       <div className="hidden lg:flex md:space-x-1 space-x-4">
          <Link
            to="/"
            className={`home font-bold flex items-center justify-center px-4 py-2 rounded-full ${
              activeTab === "Home" ? "bg-black text-white" : ""
            }`}
            onClick={() => setActiveTab("Home")}
          >
            Home
          </Link>
          <Link
            to="/explore"
            className={`home font-bold flex items-center justify-center px-4 py-2 rounded-full ${
              activeTab === "Explore" ? "bg-black text-white" : ""
            }`}
            onClick={() => setActiveTab("Explore")}
          >
            Explore
          </Link>
          <Link
            to="/create"
            className={`home font-bold flex items-center justify-center px-4 py-2 rounded-full ${
              activeTab === "Create" ? "bg-black text-white" : ""
            }`}
            onClick={() => setActiveTab("Create")}
          >
            Create
          </Link>
        </div>
        <div className="lg:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <i className="fas fa-bars text-gray-600"></i>
            </button>
          </div>
          </div>
 
     {/* Search Section */}
     <div className="search flex items-center bg-gray-200 hover:bg-gray-300 rounded-full px-4 h-12 w-full sm:w-[300px] md:w-[400px] lg:w-[800px]">
       <i className="fas fa-search text-gray-500 w-12 flex justify-center items-center"></i>
       <input
         type="search"
         placeholder="Search for"
         className="w-full bg-transparent border-none outline-none text-base text-gray-700 placeholder-gray-500 pl-[-15px]"
       />
     </div>
 
     {/* Right Section */}
     <div className="right flex items-center space-x-4 w-full sm:w-1/5 md:w-1/4 lg:w-1/5 justify-end">
       <Link to="" className="items w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-200">
         <i className="fas fa-bell text-gray-500 text-2xl"></i>
       </Link>
       <Link to="" className="items w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-200">
         <i className="far fa-comment-dots text-gray-500 text-2xl"></i>
       </Link>
       <Link to="/profilepage" className="avatar w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-200">
         <div className="img w-8 h-8 rounded-full overflow-hidden relative">
           <div className="flex items-center justify-center">
             {user.profileImage ? (
               <img
                 src={user.profileImage}
                 alt="User Profile"
                 className="w-12 h-12 rounded-full object-cover"
               />
             ) : (
               <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center pb-3 justify-center text-black text-lg">
                 {user.firstname ? user.firstname[0].toUpperCase() : ''}
               </div>
             )}
           </div>
         </div>
       </Link>
       <OutsideClickHandler onOutsideClick={() => setIsDropdownOpen(false)}>
         <div className="relative inline-block text-left">
           {/* Trigger Button */}
           <button
             onClick={toggleDropdown}
             className="flex items-center gap-3 px-1 py-1 text-gray-800 rounded-full shadow-sm hover:bg-gray-200"
           >
             <i className="fas fa-chevron-down text-sm text-gray-500"></i>
           </button>
           {/* Dropdown Menu */}
           {isDropdownOpen && (
             <div className="absolute overflow-y-auto right-0 mt-2 w-[250px] h-[600px] bg-white rounded-lg shadow-lg ring-1 ring-gray-200 z-50">
               <div className="p-4 ">
                 <p className="text-xs">Currently in</p>
                 <div className="flex items-center justify-between mt-2 bg-gray-100 px-3 py-2 rounded-md">
                   <div className="w-12 h-12 pr-6 pt-4 rounded-full flex items-center pb-3 justify-center text-black text-2xl">
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
                 <p className="px-4 text-xs">Your accounts</p>
                 <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                   Add account
                 </button>
                 <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                   Convert to business
                 </button>
               </div>
 
               <div className="py-3">
                 <p className="px-4 text-xs">More options</p>
                 <button className="block w-full text-left px-4 py-4 text-sm hover:bg-gray-100" onClick={() => navigate('/settings')}>
                   Settings
                 </button>
                 <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Home feed tuner</button>
                 <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Install the Windows app</button>
                 <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Reports and Violations Centre</button>
                 <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Your privacy rights</button>
                 <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Help Centre</button>
                 <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Terms of Service</button>
                 <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Privacy Policy</button>
                 <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Be a beta tester</button>
                 <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100" onClick={handleLogout}>
                   Log out
                 </button>
               </div>
             </div>
           )}
         </div>
       </OutsideClickHandler>
     </div>
   </div>
   {isMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-white shadow-md z-80">
          <Link
            to="/"
            className={`home font-bold flex items-center justify-center px-4 py-2 rounded-full ${
              activeTab === "Home" ? "bg-black text-white" : ""
            }`}
            onClick={() =>{setIsMenuOpen(false); setActiveTab("Home")}}
          >
            Home
          </Link>
          <Link
            to="/explore"
            className={`home font-bold flex items-center justify-center px-4 py-2 rounded-full ${
              activeTab === "Explore" ? "bg-black text-white" : ""
            }`}
            onClick={() =>{setIsMenuOpen(false); setActiveTab("Explore")}}
          >
            Explore
          </Link>
          <Link
            to="/create"
            className={`home font-bold flex items-center justify-center px-4 py-2 rounded-full ${
              activeTab === "Create" ? "bg-black text-white" : ""
            }`}
            onClick={() =>{setIsMenuOpen(false);setActiveTab("Create")}}
          >
            Create
          </Link>
        </div>
      )}
 </>
 
    ):(
      <>
      <nav className={` flex flex-wrap justify-between items-center px-6 py-4 z-50 fixed top-0 left-0 right-0 bg-white ${showLogin || showSignup ? " bg-black bg-opacity-50 pointer-events-none" : ""}`}>
        {/* Left Section - Logo */} 
        <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png"
            alt="Logo"
            className="w-8 h-8  cursor-pointer"
            onClick={()=>navigate('/')}
          />
            
            <span className="text-xl font-bold text-red-600 cursor-pointer" onClick={()=>navigate('/')}>Pinterest</span>
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
          <Link to="/explore" className="hover:text-black ">
            Today
          </Link>
          <Link to="#watch" className="hover:text-black">
            Watch
          </Link>
          <Link to="#explore" className="hover:text-black">
            Explore
          </Link>
        </div>
        </div>
  
        {/* Right Section - Links and Buttons */}
        <div className="hidden md:flex md:space-x-5 items-center font-sm font-sans font-semibold">
          <Link to="https://help.pinterest.com/en/guide/all-about-pinterest" className="hover:text-black text-gray-800">
            About
          </Link>
          <Link to="https://business.pinterest.com/en-in/" className="hover:text-black text-gray-800">
            Business
          </Link>
          <Link to="https://newsroom.pinterest.com/?utm_campaign=pinterest_homepage_blogicon_all_evergreen&utm_medium=organic-pinterest&utm_source=organicpins_pinsite_homepageicon" className="hover:text-black text-gray-800">
            Blog
          </Link>
          
          <button className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700"  onClick={() => setShowLogin(true)}>
            Log in
          </button>
         
          <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300" onClick={() => setShowSignup(true)}  >
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
