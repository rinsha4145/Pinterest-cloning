import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import handleAsync from '../Utils/HandleAsync';
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, setUser } from '../Redux.js/UserSlice';
import axiosInstance from '../Utils/AxioaInstance';
function Login() {
  const [datas, setDatas] = useState({email: '',password: ''});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      const userJson = userCookie.startsWith('j:') ? userCookie.slice(2) : userCookie;
      try {
        const user = JSON.parse(userJson);
        dispatch(setUser(user));

      } catch (error) {
        console.error('Invalid user cookie');
      }
    } else {
      console.log('User cookie not found');
    }
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatas({ ...datas, [name]: value });
  };

  const handleSubmit = handleAsync(async (e) => {
    e.preventDefault();
      const response = await axiosInstance.post('/login', {email: datas.email, password: datas.password});
      console.log('//',response)
      if (response.status === 200) {
        
        navigate('/'); // Redirect to home page after login
      }
  });
  return (
    <>
    <form onSubmit={handleSubmit}>
    <div className="container flex justify-center items-center h-[100%] font-sans">
  <div className="bg-white w-full max-w-md rounded-3xl shadow-md mt-1">
    <div className="px-6 py-6 text-center">
      {/* Pinterest logo */}
      <img src="https://i.pinimg.com/originals/d3/d1/75/d3d175e560ae133f1ed5cd4ec173751a.png" alt="pin logo" className="w-14 mx-auto mb-4" />
      <p className="text-3xl text-custom-gray font-semi mb-3">Welcome to Pinterest</p>
      {/* Email input */}
      <label className="flex pl-[70px] gap-1 items-center text-sm  text-base font-medium leading-relaxed">Email</label>

      <input type="email" placeholder="Email"  name="email"
                  value={datas.email} onChange={handleChange} className="w-4/6 mx-auto px-4 py-3 mb-2 text-sm border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
      {/* Password input */}
      <label className="flex gap-1 items-center text-sm pl-[70px] text-base font-medium leading-relaxed">Password</label>
      <input type="password" placeholder="Password" name="password"
                  value={datas.password} onChange={handleChange} className="w-4/6 mx-auto px-4 py-3 mb-2 text-sm border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
      <h4 className="text-[13px] ml-[70px] font-semibold mb-2 text-left">Forgot your password?</h4>
      {/* Login button */}
      <button className="w-4/6 h-[40px] mx-auto bg-red-600 text-white text-center py-3 mb-2 rounded-full  hover:bg-red-700 text-base">Log in</button>
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
        By continuing, you agree to Pinterest's <b>Terms of Service</b> and <br/>acknowledge you've read our <b>Privacy Policy. <br/> 
        Notice at collection.</b>
        </p>
        <hr className="w-[120px] mx-auto my-4 mt-2" />
        <p className="text-xs t-2">Not on Pinterest yet? <span className="font-bold">Sign up</span></p>
      </footer>
    </div>
  </div>
  
</div>
</form>
    </>
  )
}

export default Login