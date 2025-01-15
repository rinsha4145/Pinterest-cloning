import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import handleAsync from "../Utils/HandleAsync";
import axiosInstance from "../Utils/AxioaInstance";
import Cookies from "js-cookie";
import { setUser } from "../Redux/UserSlice";

function Login({ loginOpen, setLoginOpen }) {
  const [datas, setDatas] = useState({ email: "", password: "" }); // email and password
  const [isLoggedIn, setIsLoggedIn] = useState(false); // check if user is logged in
  const [errors, setErrors] = useState({}); // error message

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!datas.email) {
      errors.email = "You missed a spot! Don't forget to add your email.";
    } else if (!/\S+@\S+\.\S+/.test(datas.email)) {
      errors.email = "Hmm...that doesn't look like an email address";
    }
    // Password (required, min 6 characters)
    if (!datas.password || datas.password.length < 6) {
      errors.password =
        "The password you entered is incorrect. Try again or Reset your password";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Check if user is logged in
  // useEffect(() => {
  //   const userCookie = Cookies.get("user");
  //   console.log(userCookie)
  //   if (userCookie) {
  //     const userJson = userCookie.startsWith("j:")
  //       ? userCookie.slice(2)
  //       : userCookie;
  //     try {
  //       const user = JSON.parse(userJson);
  //       console.log(user)
  //       dispatch(setUser(user));
  //       setLoginOpen(false);
  //       cancelDeletion(user);
  //     } catch (error) {
  //       console.error("Invalid user cookie");
  //     }
  //   } else {
  //     console.log("User cookie not found");
  //   }
  // }, [isLoggedIn]);

  //cancel the account deletion
  const cancelDeletion = async (user) => {
    console.log(user?.deletionScheduled);
    if (user?.deletionScheduled != null) {
      try {
        const response = await axiosInstance.post("/cancel-deletion");
        console.log("message", response.data.message);
      } catch (error) {
        console.error("Error canceling deletion:", error);
      }
    }
  };

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatas({ ...datas, [name]: value });
  };

  // User login
  const handleSubmit = handleAsync(async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const response = await axiosInstance.post("/login", {
        email: datas.email,
        password: datas.password,
      });
        setIsLoggedIn(true);
        console.log("first,",response.data.user)
        dispatch(setUser(response.data.user))
        cancelDeletion(response.data.user);
        navigate("/");
      
    }
  });
  return (
    <>
      <div className="bg-white p-5 rounded-3xl shadow-lg">
        {loginOpen && (
          <form>
            <div className="bg-transparent flex justify-center items-center h-[80vh] font-sans">
              <div className="w-[400px] max-w-md rounded-4xl ">
                <div className="px-6 py-6 text-center">
                  {/* Pinterest logo */}
                  <img
                    src="https://i.pinimg.com/originals/d3/d1/75/d3d175e560ae133f1ed5cd4ec173751a.png"
                    alt="pin logo"
                    className="w-14 mx-auto mb-4"
                  />
                  <p className="text-3xl text-custom-gray font-semi mb-3">
                    Welcome to Pinterest
                  </p>
                  {/* Email input */}
                  <label className="flex pl-[70px] gap-1 items-center text-sm  font-medium leading-relaxed">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={datas.email}
                    onChange={handleChange}
                    className="w-4/6 mx-auto px-4 py-3 mb-2 text-sm border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.email && (
                    <p className="ml-10 text-red-500 text-xs">{errors.email}</p>
                  )}

                  {/* Password input */}
                  <label className="flex gap-1 items-center text-sm pl-[70px]  font-medium leading-relaxed">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={datas.password}
                    onChange={handleChange}
                    className="w-4/6 mx-auto px-4 py-3 mb-2 text-sm border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.password && (
                    <p className="ml-10 text-red-500 text-xs">
                      {errors.password}
                    </p>
                  )}

                  <br />
                  <Link
                    to="/forgot-password"
                    className="text-[13px] ml-[-11px] font-semibold mb-2 text-left"
                  >
                    Forgot your password?
                  </Link>
                  {/* Login button */}
                  <button
                    type="submit"
                    className="w-4/6 h-[40px] mx-auto bg-red-600 text-white text-center py-3 mb-2 rounded-full hover:bg-red-700 text-base"
                    onClick={handleSubmit}
                  >
                    Log in
                  </button>
                  <p className="font-semibold mb-2">OR</p>
                  {/* Facebook button */}
                  <button className="w-4/6 mx-auto h-[40px] bg-blue-600 text-white py-3 mb-2 rounded-full font-bold flex items-center justify-center hover:bg-blue-700">
                    <i className="fab fa-facebook-f mr-2 text-white"></i>
                    Continue with Facebook
                  </button>
                  {/* Google button */}
                  <button className="w-4/6 mx-auto bg-gray-200 text-black py-3 rounded-full font-bold flex items-center justify-center hover:bg-gray-300">
                    <i className="fab fa-google mr-2 text-green-500"></i>
                    Continue with Google
                  </button>
                  <footer className="mt-6">
                    <p className="text-xs opacity-70">
                      By continuing, you agree to Pinterest's{" "}
                      <b>Terms of Service</b> and <br />
                      acknowledge you've read our{" "}
                      <b>
                        Privacy Policy. <br /> Notice at collection.
                      </b>
                    </p>
                    <hr className="w-[120px] mx-auto my-4 mt-2" />
                    <p className="text-xs t-2">
                      Not on Pinterest yet?{" "}
                      <span className="font-bold">Sign up</span>
                    </p>
                  </footer>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default Login;
