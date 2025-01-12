import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../Utils/AxioaInstance";
import { useNavigate } from "react-router-dom";
import handleAsync from "../Utils/HandleAsync";
import { useClickHandler } from "../Context/ClickHandlerContext";

function Signup({ SignupOpen, setSignupOpen, setLoginOpen }) {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    birthdate: "",
  });

  const navigate = useNavigate();

  //form validation
  const validateForm = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = "You missed a spot! Don't forget to add your email.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Hmm...that doesn't look like an email address";
    }
    if (!formData.password || formData.password.length < 6) {
      errors.password = "Your password is too short! You need 6+ characters.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //registration
  const handleSubmit = handleAsync(async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const response = await axiosInstance.post("/signup", formData);
      if (response.status === 200 && response.status < 300) {
        setFormData({ email: "", password: "", birthdate: "" });
        navigate("/");
        setSignupOpen(false);
        setLoginOpen(true);
      } else {
        throw new Error(
          `Error: ${response.data.message || "An error occurred"}`
        );
      }
    }
  });
  return (
    <>
      <div className="bg-white p-5 rounded-3xl shadow-lg">
        {SignupOpen && (
          <form onSubmit={handleSubmit} className="z-50">
            <div className="bg-white flex justify-center items-center h-[80vh] font-sans">
              <div className=" w-[400px] max-w-md rounded-3xl ">
                <div className="px-6 py-10 text-center">
                  <img
                    src="https://i.pinimg.com/originals/d3/d1/75/d3d175e560ae133f1ed5cd4ec173751a.png"
                    alt="pin logo"
                    className="w-10 mx-auto mb-3"
                  />
                  <p className="text-xl  mb-1 text-custom-gray font-semi">
                    Welcome to Pinterest
                  </p>
                  <p className="text-sm mb-2 text-custom-gray ">
                    Find new ideas to try
                  </p>
                  <div>
                    <label className="flex pl-[70px] gap-1 items-center text-sm font-medium leading-relaxed">
                      Email
                    </label>
                    <input
                      type="text"
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-4/6 mx-auto px-4 py-3 mb-2 text-sm border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.email && (
                      <p className="ml-10 text-red-500 text-xs">
                        {errors.email}
                      </p>
                    )}
                    <label className="flex gap-1 items-center text-sm pl-[70px] text-base font-medium leading-relaxed">
                      Password
                    </label>

                    <input
                      type="password"
                      placeholder="Create a password "
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-4/6 mx-auto px-4 py-3 mb-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.password && (
                      <p className="ml-10 text-red-500 text-xs">
                        {errors.password}
                      </p>
                    )}

                    <label className="flex gap-1 items-center text-sm pl-[70px] text-base font-medium leading-relaxed">
                      Birthdate
                      <FontAwesomeIcon
                        icon={faInfoCircle}
                        style={{ color: "grey" }}
                        title="To help keep Pinterest safe, we
                  now require your birthdate.
                  Your birthdate also helps us
                  provide more personalized 
                  recommendations and
                  relevant ads. We won't share 
                  this information without your 
                  permission and it won't be 
                  visible on your profile."
                      />
                    </label>
                    <input
                      type="date"
                      onChange={handleChange}
                      name="birthdate"
                      value={formData.birthdate}
                      className="w-4/6 mx-auto px-4 py-3 mb-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.birthdate && (
                      <p className="mr-16 text-red-500 text-xs">
                        {errors.birthdate}
                      </p>
                    )}

                    {/* Continue button */}
                    <button className="w-4/6 h-[40px] mx-auto bg-red-600 text-white text-center py-3 mb-2 rounded-full font-bold hover:bg-red-700 text-base ">
                      Continue
                    </button>
                    <p className="font-bold mb-2">OR</p>
                    {/* Google button */}
                    <button className="w-4/6 mx-auto bg-gray-200 text-black py-3 rounded-full font-bold flex items-center justify-center hover:bg-gray-300">
                      <i className="fab fa-google mr-2 text-green-500"></i>
                      Continue with Google
                    </button>
                  </div>
                  <footer className="mt-3">
                    <p className="text-xs opacity-70">
                      By continuing, you agree to Pinterest's <br />
                      <b className="text-black">Terms of Service</b> and
                      acknowledge you've read
                      <br /> our <b>Privacy Policy. Notice at collection.</b>
                    </p>
                    <hr className="w-1/2 mx-auto my-3 opacity-40" />
                    <p className="text-xs">
                      Already a member?
                      <span className="font-bold"> Log in</span>
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

export default Signup;
