import React, { useEffect, useState } from "react";
import handleAsync from "../Utils/HandleAsync";
import Cookies from 'js-cookie'
import { useDispatch } from "react-redux";
import axiosInstance from "../Utils/AxioaInstance";
import { useNavigate } from "react-router-dom";
import {  setUser } from '../Redux/UserSlice';

const AdmLogin = () => {
    const [datas, setDatas] = useState({email: '',password: ''}); // email and password
    const [isLoggedIn, setIsLoggedIn] = useState(false); // check if user is logged in
      
    const [errors, setErrors] = useState({}); // error message
  const dispatch = useDispatch();
  const navigate = useNavigate();

    
       // Validate form
        const validateForm = () => {
          const errors = {};
          if (!datas.email ) {
            errors.email="You missed a spot! Don't forget to add your email.";
          }else if(!/\S+@\S+\.\S+/.test(datas.email)){
            errors.email="Hmm...that doesn't look like an email address";
          }
          // Password (required, min 6 characters)
          if (!datas.password || datas.password.length < 6) {
            errors.password="The password you entered is incorrect. Try again or Reset your password";
          }
          setErrors(errors);
          return Object.keys(errors).length === 0;
        }
      
        // Check if user is logged in
        useEffect(() => {
          const adminCookie = Cookies.get("admin");
          if (adminCookie) {
            const adminJson = adminCookie.startsWith("j:") ? adminCookie.slice(2) : adminCookie;
              try {
                const admin = JSON.parse(adminJson);
                dispatch(setUser(admin))
              } catch (error) {
              }
          } else {
            console.log('User cookie not found');
          }
        }, [isLoggedIn]);

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatas({ ...datas, [name]: value });
  };

    // User login
  const handleSubmit = handleAsync(async (e) => {
    e.preventDefault();
    if(validateForm()){
      const response = await axiosInstance.post('/admin/admlogin', {email: datas.email, password: datas.password});
      if (response.status === 200) {
        setIsLoggedIn(true);
        navigate('/'); 
        
      }
    }
  });
  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* Background Container */}
      <div
        style={{
          backgroundImage:
            "url('https://www.artavenue.com/cdn/shop/files/d4050a_8603d6c1dce748eda96429c1043c93f0_mv2_66ea8f12-0290-4c2d-954e-6da2297ff980.jpg?v=1723625285&width=1200')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.3,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      ></div>

      {/* Wrapper */}
      <div className="flex flex-wrap lg:flex-nowrap w-full max-w-5xl rounded-lg overflow-hidden z-50">
        {/* Left Section */}
        <div className="w-full flex lg:w-1/2 flex flex-col items-center justify-center p-6 bg-transparent">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png"
            alt="Logo"
            className="w-20 h-20 cursor-pointer"
          />
          <h1 className="text-7xl text-red-700 font-bold">Pinterest</h1>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px bg-gray-700"></div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
          <h2 className="text-2xl text-white font-semibold mb-2">Welcome</h2>
          <p className="text-sm  mb-6">
            Please login to Admin Dashboard.
          </p>

          {/* Login Form */}
          <form className="w-full max-w-sm space-y-4">
            {/* Username */}
            <div>
              <label htmlFor="email" className="sr-only">
                Username
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={datas.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
                {errors.email && <p className="ml-10 text-red-500 text-xs">{errors.email}</p>}

            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                name="password"
                value={datas.password}
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm  border border-gray-300 rounded-md  focus:ring-orange-500 focus:border-orange-500"
              />
            {errors.password && <p className="ml-10 text-red-500 text-xs">{errors.password}</p>}

            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-white-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              onClick={handleSubmit}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdmLogin;
