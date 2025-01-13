import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../Utils/AxioaInstance";
import handleAsync from "../Utils/HandleAsync";
import Search from "./Search";
import Login from "./Login";
import Signup from "./Signup";
import { logoutUser } from "../Redux/UserSlice";
import { clearSavedFolders } from "../Redux/SavedSlice";
import OutsideClickHandler from "react-outside-click-handler";


const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const saved = useSelector((state) => state.save.save);

  const [activeTab, setActiveTab] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [SignupOpen, setSignupOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //make the activetab based on the route
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === "/") {
      setActiveTab("Home");
    } else if (currentPath.startsWith("/Food")) {
      setActiveTab("Food");
    } else if (currentPath.startsWith("/explore")) {
      setActiveTab("Explore");
    } else if (currentPath.startsWith("/create")) {
      setActiveTab("Create");
    } else {
      setActiveTab(""); 
    }
  }, [location]);
  
  //user logout
  const handleLogout = handleAsync(async (e) => {
    e.preventDefault();
    const response = await axiosInstance.post(
      "/logout",
      {},
      { withCredentials: true }
    );
    dispatch(logoutUser(user));
    dispatch(clearSavedFolders(saved));
    if (response.status >= 200 && response.status < 300) {
      navigate("/");
    } else {
      throw new Error(response.data.message || "An error occurred");
    }
    setIsDropdownOpen(false);
    navigate("/");
  });

  //dropdown of menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      {user ? (
        <>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          />
          <div className="pinterest flex items-center justify-between bg-white px-4 py-3 lg:px-8 lg:py-4">
            {/* Left Section */}
            <div className="left flex items-center space-x-4 w-full sm:w-1/3 md:w-1/4 lg:w-1/5">
              <Link
                to=""
                className="logo w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
              >
                <i className="fab fa-pinterest text-red-600 text-xl sm:text-2xl"></i>
              </Link>
              <div className="hidden lg:flex md:space-x-2 space-x-4">
                <Link
                  to="/"
                  className={`home font-bold flex items-center justify-center px-3 py-2 rounded-full ${
                    activeTab === "Home" ? "bg-black text-white" : ""
                  }`}
                 
                >
                  Home
                </Link>
                <Link
                  to="/explore"
                  className={`home font-bold flex items-center justify-center px-3 py-2 rounded-full ${
                    activeTab === "Explore" ? "bg-black text-white" : ""
                  }`}
                 
                >
                  Explore
                </Link>
                <Link
                  to="/create"
                  className={`home font-bold flex items-center justify-center px-3 py-2 rounded-full ${
                    activeTab === "Create" ? "bg-black text-white" : ""
                  }`}
                 
                >
                  Create
                </Link>
              </div>
              <div className="lg:hidden flex items-center">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  <i className="fas fa-bars text-gray-600 text-xl"></i>
                </button>
              </div>
            </div>

            {/* Search Section */}
            <div className="search flex items-center bg-gray-200 hover:bg-gray-300 rounded-full px-4 h-10 sm:h-12 w-full sm:w-[300px] md:w-[400px] lg:w-[600px] xl:w-[800px]">
              <i className="fas fa-search text-gray-500 w-8 sm:w-12 "></i>
              <Search />
            </div>

            {/* Right Section */}
            <div className="right flex items-center space-x-3 sm:space-x-4 w-full sm:w-1/3 md:w-1/4 lg:w-1/5 justify-end">
              <Link
                to=""
                className="items w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center hover:bg-gray-200"
              >
                <i className="fas fa-bell text-gray-500 text-xl sm:text-2xl"></i>
              </Link>
              <Link
                to=""
                className="items w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center hover:bg-gray-200"
              >
                <i className="far fa-comment-dots text-gray-500 text-xl sm:text-2xl"></i>
              </Link>
              <Link
                to="/profilepage"
                className="avatar w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center hover:bg-gray-200"
              >
                <div className="img w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden relative">
                  {user.profileimage ? (
                    <img
                      src={user.profileimage}
                      alt="User Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="bg-gray-200 flex items-center justify-center w-full h-full text-lg text-black">
                      {user.firstname ? user.firstname[0].toUpperCase() : ""}
                    </div>
                  )}
                </div>
              </Link>
              <OutsideClickHandler onOutsideClick={() => setIsDropdownOpen(false)}>
                <div className="relative inline-block text-left">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center gap-2 px-2 py-1 text-gray-800 rounded-full hover:bg-gray-200"
                  >
                    <i className="fas fa-chevron-down text-sm"></i>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg ring-1 ring-gray-200 z-50">
                      <div className="p-4">
                        <p className="text-xs">Currently in</p>
                        <div className="flex items-center justify-between mt-2 bg-gray-100 px-3 py-2 rounded-md">
                          <div className="w-12 h-12 pr-6 pt-4 rounded-full flex items-center pb-3 justify-center text-black text-2xl">
                            {user.firstname
                              ? user.firstname[0].toUpperCase()
                              : ""}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">
                              {user.firstname}
                            </p>
                            <p className="text-sm text-gray-500">Personal</p>
                            <p className="text-sm text-gray-500">
                              {user.email}
                            </p>
                          </div>
                          <i className="fas fa-check text-base text-black"></i>
                        </div>
                      </div>

                      <div className="py-2">
                        <p className="px-4 text-xs">Your accounts</p>
                        <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                          Add account
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => navigate("/settings/account-settings")}
                        >
                          Change Passoword
                        </button>
                      </div>

                      <div className="py-3">
                        <p className="px-4 text-xs">More options</p>
                        <button
                          className="block w-full text-left px-4 py-4 text-sm hover:bg-gray-100"
                          onClick={() => navigate("/settings")}
                        >
                          Settings
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100" onClick={()=>navigate('/close-account')}>
                          Delete Account
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                          Install the Windows app
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                          Reports and Violations Centre
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                          Your privacy rights
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                          Help Centre
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                          Terms of Service
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                          Privacy Policy
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                          Be a beta tester
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={handleLogout}
                        >
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
            <div className="lg:hidden absolute top-16 left-0 w-full bg-white shadow-md z-50">
              <Link
                to="/"
                className={`block font-bold px-4 py-2 rounded-full ${
                  activeTab === "Home" ? "bg-black text-white" : ""
                }`}
                onClick={() => {
                  setIsMenuOpen(false);
                  setActiveTab("Home");
                }}
              >
                Home
              </Link>
              <Link
                to="/explore"
                className={`block font-bold px-4 py-2 rounded-full ${
                  activeTab === "Explore" ? "bg-black text-white" : ""
                }`}
                onClick={() => {
                  setIsMenuOpen(false);
                  setActiveTab("Explore");
                }}
              >
                Explore
              </Link>
              <Link
                to="/create"
                className={`block font-bold px-4 py-2 rounded-full ${
                  activeTab === "Create" ? "bg-black text-white" : ""
                }`}
                onClick={() => {
                  setIsMenuOpen(false);
                  setActiveTab("Create");
                }}
              >
                Create
              </Link>
            </div>
          )}
        </>
      ) : (
        <>
          <nav
            className={`flex flex-wrap justify-between items-center px-6 py-4 z-50 fixed top-0 left-0 right-0 bg-white transition-all duration-300 ${
              loginOpen || SignupOpen
                ? "bg-black bg-opacity-50 pointer-events-none"
                : ""
            }`}
          >
            {/* Left Section - Logo */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png"
                  alt="Logo"
                  className="w-8 h-8 cursor-pointer"
                  onClick={() => navigate("/")}
                />
                <span
                  className="text-xl font-bold text-red-600 cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  Pinterest
                </span>
              </div>
            </div>

            {/* Hamburger Menu for Smaller Screens */}
            <div className="md:hidden">
              <button
                className="focus:outline-none"
                onClick={() => setIsMenuOpen((prev) => !prev)}
              >
                {isMenuOpen ? (
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
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
                )}
              </button>
            </div>
            <OutsideClickHandler onOutsideClick={() => setIsMenuOpen(false)}>
              <div
                className={`${
                  isMenuOpen ? "flex" : "hidden"
                } flex-col md:flex md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-6 font-medium font-sans font-semibold text-center`}
              >
                <Link to="/explore" className="hover:text-black">
                  Today
                </Link>
                <Link to="#watch" className="hover:text-black">
                  Watch
                </Link>
                <Link to="#explore" className="hover:text-black">
                  Explore
                </Link>

                {/* Right Section - Links and Buttons */}

                <Link
                  to="https://help.pinterest.com/en/guide/all-about-pinterest"
                  className="hover:text-black text-gray-800"
                >
                  About
                </Link>
                <Link
                  to="https://business.pinterest.com/en-in/"
                  className="hover:text-black text-gray-800"
                >
                  Business
                </Link>
                <Link
                  to="https://newsroom.pinterest.com/?utm_campaign=pinterest_homepage_blogicon_all_evergreen&utm_medium=organic-pinterest&utm_source=organicpins_pinsite_homepageicon"
                  className="hover:text-black text-gray-800"
                >
                  Blog
                </Link>

                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700"
                  onClick={() => setLoginOpen(true)}
                >
                  Log in
                </button>

                <button
                  className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300"
                  onClick={() => setSignupOpen(true)}
                >
                  Sign up
                </button>
              </div>
            </OutsideClickHandler>
          </nav>
        </>
      )}
      {loginOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <OutsideClickHandler onOutsideClick={() => setLoginOpen(false)}>
            <Login loginOpen={loginOpen} setLoginOpen={setLoginOpen} />
          </OutsideClickHandler>
        </div>
      )}
      {SignupOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <OutsideClickHandler onOutsideClick={() => setSignupOpen(false)}>
            <Signup
              SignupOpen={SignupOpen}
              setSignupOpen={setSignupOpen}
              setLoginOpen={setLoginOpen}
            />
          </OutsideClickHandler>
        </div>
      )}
    </>
  );
};

export default Navbar;
